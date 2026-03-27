const { REDIS_URL } = require("./config");
const redis = require("redis");

let redisClient = null;

const connectToRedis = async () => {
    if (!REDIS_URL) {
        console.error("Missing REDIS_URL — cannot start without Redis");
        process.exit(1);
    }

    redisClient = redis.createClient({ url: REDIS_URL });

    
    redisClient.on("error", (err) => {
        console.error("Redis client error:", err);
    });

    
    await redisClient.connect();
    console.log("Redis connected successfully");
};


const getRedisClient = () => {
    if (!redisClient) {
        throw new Error("Redis client not initialised — call connectToRedis() first");
    }
    return redisClient;
};

module.exports = { connectToRedis, getRedisClient };