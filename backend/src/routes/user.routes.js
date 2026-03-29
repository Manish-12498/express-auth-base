const express= require("express");
const router = express.Router();
const {
    register,
    verifyUser ,
    loginUser,
    verifyOTP

} = require("../controller/user.controller")

router.post("/register",register);
router.get("/verify/:token",verifyUser);
router.post("/login",loginUser);
router.post("/verify",verifyOTP);

module.exports = router;