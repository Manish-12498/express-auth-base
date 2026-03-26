const TryCatch = require("../middlewares/tryCatch");
const sanitize= require("mongo-sanitize");
const registerSchema = require("../config/config.zod");
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
    return res.status(200).json({
        username,
        email,
        password
    });

});

module.exports ={
    register,
    
}