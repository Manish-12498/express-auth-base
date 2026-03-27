
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const REDIS_URL= process.env.REDIS_URL;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_EMAIL= process.env.SMTP_EMAIL;
if(!PORT){
    throw new Error ("PORT is require in .env file ");
}

if(!MONGO_URI){
    throw new Error ("MONGO_URI is require in .env file ");
}
if(!REDIS_URL){
    throw new Error ("REDIS_URL is require in .env file ");
}
if(!SMTP_EMAIL){
    throw new Error ("SMTP_EMAIL is require in .env file ");
}
if(!SMTP_PASSWORD){
    throw new Error ("SMTP_PASSWORD is require in .env file ");
}

module.exports={
    PORT,
    MONGO_URI,
    REDIS_URL,
    SMTP_EMAIL,
    SMTP_PASSWORD
}