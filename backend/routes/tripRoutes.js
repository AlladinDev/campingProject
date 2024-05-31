const express = require('express');
const router = express.Router();
const trekValidator = require('../assets/trekValidation')
const {getAllTrips,addTrip,deleteTrip, checkOutTrip}=require('../controller/trekController')
router.get('/getalltrips', getAllTrips)
router.post('/addtrip', trekValidator,addTrip)
router.post('/checkoutTrip', checkOutTrip)
router.delete('/deletetrip',deleteTrip)
module.exports = router