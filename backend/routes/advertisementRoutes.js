const express= require('express');
const router = express.Router();
const {getAdvertisement,addAdvertisement,deleteAdvertisement} =require('../controller/advertisementController')
router.post('/addadvertisement',addAdvertisement)
router.delete('/deleteadvertisement',deleteAdvertisement)
router.get('/getadvertisement',getAdvertisement)
module.exports = router