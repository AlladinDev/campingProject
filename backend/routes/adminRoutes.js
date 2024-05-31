const express = require('express');
const router = express.Router();
const registerValidator=require('../assets/uservalidation')//validates input data
const {logincontroller,registercontroller, tokengenerator}= require('../controller/adminController')
router.post('/register', registerValidator,registercontroller)
router.post('/login',logincontroller)
router.post('/tokengeneration',tokengenerator)
module.exports= router