const mongoose = require('mongoose')
const { v4: uid } = require('uuid');
const guidedb=require('./guidemodel')
const schema = mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    tripDuration: {
        type: String,
        required: true,
      
    },
    price: {
        type: String,
        required: true,
    },

    date: {
        type:String,
        required: true

    },
    guideAllotted: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'guidedatabase'
    },
    photo: {
        type: String,
        required: true

    },
    pickUpPlace: {
        type: String,
        required: true
    },
    photoId: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    tripServices:{
        type: String,
        required: true
    }

})
module.exports = mongoose.model('tripdatabase', schema)
/* destination: '',
    photos: "",
    guideAllotted: '',
    date: '',
    pickupPlace: '',
    price: '',
    description: '',
    tripServices: '',
    trekDuration: '',
    */