const { v4: uid } = require('uuid');
const tripmodel=require('./tripmodel')
const mongoose = require('mongoose')
const schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    mobile: {
        type: String,
        required: true,

    },

    age: {
        type: Number,
        required: true

    },
    address: {
        type: String,
        required: true

    },
    photo: {
        type: String,
        required: true

    },
    photoid:{
        type:String,
        required:true,
        default:null
    },
    gender: {
        type: String,
        required: true
    },
    tripId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tripdatabase',
        default: null
    }],
    password: {
        type: String,
        required: true
    },
    userType:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Userdatabase', schema)