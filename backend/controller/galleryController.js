const photoModel = require('../model/galleryModel')
const cloudinary = require('cloudinary').v2
const addPhoto = async (req,res) => {
    let result = ''
    let uploadedPhoto = ''
    try {
      console.log(req.files)

        if (!req.files.photo)
            return res.status(400).json({ message: 'Photo Required' })
        uploadedPhoto = await cloudinary.uploader.upload(req.files.photo.tempFilePath)
        req.body.photo = uploadedPhoto.secure_url
        req.body.photoId = uploadedPhoto.public_id
        result = await photoModel.create(req.body)
        const { _id, __v, photoId, ...necessaryData } = result.toObject()
        return res.status(200).json({ photo: necessaryData })
    }
    catch (err) {
        if (uploadedPhoto) {
            const deletedAsset = await cloudinary.uploader.destroy(uploadedPhoto.public_id)
            console.log('uploaded photo deleted as some error occurred')
        }
        if (result) {
            await photoModel.findOneAndDelete({ _id: result._id })
            console.log('uploaded photo document deleted as some error occurred')
        }
        console.log('err in gallery add function', err)
        return res.status(500).json({ message: "Server Error" })
    }
}
const getPhotos = async (req,res) => {
    try {
        const result = await photoModel.find({},{_id:0,__v:0,photoId:0})
        return res.status(200).json({ photos: result })
    }
    catch (err) {
        console.log('err in gallery getphotos function', err)
        return res.status(500).json({ message: "Server Error" })
    }
}
module.exports = {
    addPhoto,
    getPhotos
}