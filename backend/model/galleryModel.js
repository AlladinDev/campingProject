const mongoose = require('mongoose')
const { v4: uid } = require('uuid');
const schema = mongoose.Schema({
    photo: {
        type: String,
        Required: true
    },
    photoId:{
        type: String,
        Required: true
    }
})
module.exports = mongoose.model('gallerydb', schema)