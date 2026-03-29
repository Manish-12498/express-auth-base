const express= require("express");
const router = express.Router();
const {
    register,
    verifyUser 

} = require("../controller/user.controller")

router.get("/register",register);
router.post("/verify/:token",verifyUser);

module.exports = router;