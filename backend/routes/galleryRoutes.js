const { addPhoto,getPhotos}= require('../controller/galleryController');
const express=require('express')
const router = express.Router();
router.post('/addphoto',addPhoto)
router.get('/getallphotos',getPhotos)
module.exports=router