
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const REDIS_URL= process.env.REDIS_URL;

if(!PORT){
    throw new Error ("PORT is require in .env file ");
}

if(!MONGO_URI){
    throw new Error ("MONGO_URI is require in .env file ");
}
if(!REDIS_URL){
    throw new Error ("REDIS_URL is require in .env file ");
}


module.exports={
    PORT,
    MONGO_URI,
    REDIS_URL,
}