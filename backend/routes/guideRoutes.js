const express = require('express');
const router = express.Router();
const guidevalidator = require('../assets/guidevalidator')
const { guideRegistration,guideLogin,guideTokengenerator, getAllGuides } = require('../controller/guidecontroller')
router.get('/getallguides',getAllGuides)
router.post('/register', guidevalidator, guideRegistration)
router.post('/login', guideLogin)
router.post('/tokengeneration',guideTokengenerator)
module.exports= router