const { getRedisClient } = require("../config/config.REDIS");
const TryCatch = require("../middlewares/tryCatch");
const sanitize= require("mongo-sanitize");
const {registerSchema,loginSchema} = require("../config/config.zod");
const userModel = require ("../model/user.model");
const bcrypt = require("bcrypt");
const crypto= require ("crypto");
const sendMail = require("../config/config.emailSend");
const {getVerifyEmailHtml,getOtpHtml} = require("../config/config.email.hmtl.templet");
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 15;


const register = TryCatch(async(req,res)=>{
    const sanitizeBody = sanitize(req.body);
    const validation = registerSchema.safeParse(sanitizeBody);
    if(!validation.success){
        const ZodError = validation.error.flatten().fieldErrors; 
        return res.status(400).json({
            message:ZodError
        });
    }
    const {username,email,password}= validation.data;

    //adding rate limit 
    const redis = getRedisClient();

    const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;
    const attempts = await redis.incr(rateLimitKey);
    if (attempts === 1) {
        // First attempt — set expiry window
        await redis.expire(rateLimitKey, RATE_LIMIT_WINDOW);
    }

    if (attempts > RATE_LIMIT_MAX) {
        const ttl = await redis.ttl(rateLimitKey);
        return res.status(429).json({
            message: `Too many attempts. Try again in ${ttl} seconds.`,
        });
    }

    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(400).json({
            message:"User already exist"
        });
    }

    const hashPassword = await bcrypt.hash(password,12);
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyKey = `verify:${verifyToken}`;

    const dataStore = JSON.stringify({
        username,
        email,
        password:hashPassword
    });

    // going to store in radis for 5 min  

    await redis.set(verifyKey,dataStore,{EX:300});

    const subject = "verify your email for Account Creation";
    const html=getVerifyEmailHtml({email,token:verifyToken});
    await sendMail(email,subject,html);

    
    // const user = await userModel.create({});
    return res.status(200).json({
        message:"Email is send to your registered email"
    });

});

const verifyUser = TryCatch(async (req,res)=>{
    const {token} = req.params;
    if(!token){
        return res.status(400).json({
            message:"Verification token required"
        });
    }
    const verifyKey = `verify:${token}`;
    const redis = getRedisClient();
    const userDataJSON = await redis.get(verifyKey);
    if(!userDataJSON){
        return res.status(400).json({
            message:"verification link is expired"
        });
    }
    const userData = JSON.parse(userDataJSON);
    
    
    const existingUser = await userModel.findOne({email:userData.email});
    if(existingUser){
        return res.status(400).json({
            message:"User already exist"
        });
    }

    const newUser = await userModel.create({
        username:userData.username,
        email:userData.email,
        password:userData.password
    });

    return res.status(201).json({
        message:"Email verified Successfully! Your account has been created"
    });
});

const loginUser = TryCatch( async (req,res)=>{
    const sanitizeBody = sanitize(req.body);
    const validation = loginSchema.safeParse(sanitizeBody);
    if(!validation.success){
        const ZodError = validation.error.flatten().fieldErrors; 
        return res.status(400).json({
            message:ZodError
        });
    }
    const {email,password}= validation.data;

    //adding rate limit 
    const redis = getRedisClient();

    const rateLimitKey = `login-rate-limit:${req.ip}:${email}`;
    const attempts = await redis.incr(rateLimitKey);
    if (attempts === 1) {
        // First attempt — set expiry window
        await redis.expire(rateLimitKey, RATE_LIMIT_WINDOW);
    }

    if (attempts > RATE_LIMIT_MAX) {
        const ttl = await redis.ttl(rateLimitKey);
        return res.status(429).json({
            message: `Too many attempts. Try again in ${ttl} seconds.`,
        });
    }
    const User = await userModel.findOne({email}).select("+password");
    if(!User){
        return res.status(400).json({
            message:"Invalid credintail"
        });
    }
    const compairPassword = await bcrypt.compare(password,User.password);
    if(!compairPassword){
        return res.status(400).json({
            message:"Invalid credintail"
        });
    }

    const otp = Math.floor(100000+Math.random()*900000).toString();
    const otpKey = `otp:${email}`;

    await redis.set(otpKey,otp,{EX:300,})

    const subject = "OTP for verification ";
    const html = getOtpHtml({email,otp});
    await sendMail(email,subject ,html);

    await redis.del(rateLimitKey);    
    res.json({
        message:"OTP send to email. Vaild for 5 min"
    });
    

});

module.exports ={
    register,
    verifyUser ,
    loginUser,
}