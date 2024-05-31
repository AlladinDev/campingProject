const express = require('express');
const router = express.Router();
const registerValidator = require('../assets/uservalidation')
const { registercontroller,
    updatecontroller, allUsersController,
    userlogincontroller, tokengenerator,addTripController
} = require('../controller/usercontroller');
//registerValidator is our custom function for validation so it can be used anywhere
router.get('/getallusers', allUsersController)
router.post('/register', registerValidator, registercontroller)
router.put('/update', updatecontroller)
router.post('/login', userlogincontroller)
router.post('/tokengeneration', tokengenerator)
router.post('/addtrip',addTripController)
module.exports = router