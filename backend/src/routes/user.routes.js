const express= require("express");
const router = express.Router();
const {
    register,
    verifyUser ,
    loginUser

} = require("../controller/user.controller")

router.get("/register",register);
router.post("/verify/:token",verifyUser);
router.post("/login",loginUser);

module.exports = router;