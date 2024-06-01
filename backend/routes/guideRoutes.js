const express = require('express');
const router = express.Router();
const guidevalidator = require('../assets/guidevalidator')
const { guideRegistration,guideLogin,verifyOtpFunction, getGuideData,getAllGuides,sendOtpFunction } = require('../controller/guidecontroller');
router.get('/getallguides',getAllGuides)
router.post('/register', guidevalidator, guideRegistration)
router.post('/login', guideLogin)
router.post('/sendotp', sendOtpFunction)
router.get('/getguidedata', getGuideData)
router.post('/verifyotp',verifyOtpFunction)
module.exports= router