const express = require('express');
const router = express.Router();
const registerValidator=require('../assets/uservalidation')//validates input data
const {logincontroller,registercontroller,sendOtpFunction,verifyOtpFunction}= require('../controller/adminController')
router.post('/register', registerValidator,registercontroller)
router.post('/login',logincontroller)
router.post('/sendotp',sendOtpFunction)
router.post('/verifyotp',verifyOtpFunction)
module.exports= router