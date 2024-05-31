const mongoose = require('mongoose')
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