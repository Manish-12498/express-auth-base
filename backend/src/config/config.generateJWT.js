const {JWT_SEC_ACCESS,JWT_SEC_REFRESH} = require("./config");
const {getRedisClient} = require("./config.REDIS");
const jwt = require("jsonwebtoken");
const generateToken = async (id,res)=>{
    const redis = getRedisClient();
    const accessToken = jwt.sign({id},JWT_SEC_ACCESS,{expiresIn:"1m"});
    const refreshToken = jwt.sign({id},JWT_SEC_REFRESH,{expiresIn:"7d"});
    const refreshTokenKey = `refresh_token:${id}`;
    await redis.setEx(refreshTokenKey,7*24*60*60,refreshToken);
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:1*60*1000,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,       
    });

    return { accessToken, refreshToken };         

}
module.exports =generateToken;