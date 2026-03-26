const { REDIS_URL } = require("./config")
const redis = require("redis");

const connectTORedis = async () => {
    if (!REDIS_URL) {
        console.log("Missing redis url");
        process.exit(1);
    }
    const redisClient = redis.createClient({ url: REDIS_URL });
    redisClient.connect().then(() => {
        console.log("Redis connected Successfully");
    }).catch(console.error);
}

module.exports = connectTORedis;