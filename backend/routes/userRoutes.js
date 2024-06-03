const express = require('express');
const router = express.Router();
const registerValidator = require('../assets/uservalidation')
const { registercontroller,
    updatecontroller, allUsersController,
    userlogincontroller,addTripController,
    sendOtpFunction,verifyOtpFunction
} = require('../controller/usercontroller');
const stripeCheckOutSession =require('../controller/stripeCheckOut')
//registerValidator is our custom function for validation so it can be used anywhere
router.get('/getallusers', allUsersController)
router.post('/register', registerValidator, registercontroller)
router.put('/update', updatecontroller)
router.post('/login', userlogincontroller)
router.post('/sendotp',sendOtpFunction)
router.post('/verifyotp',verifyOtpFunction)
router.post('/addtrip',addTripController)
router.post('/check-out-session',stripeCheckOutSession)
module.exports = router