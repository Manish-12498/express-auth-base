const path = require("path");
require("dotenv").config();
const config = require("./src/config/config");
const { connectToRedis } = require("./src/config/config.REDIS");
const connectDB = require("./src/config/config.DB");

const app = require("./src/app");

const port = config.PORT || 3000;
(async () => {
    connectToRedis();
    connectDB();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
();