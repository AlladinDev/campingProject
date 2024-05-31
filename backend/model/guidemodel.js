const mongoose = require('mongoose')
const schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    password: {
        type: String,
        required: true
    },
    photoid: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },
    tripId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tripmodel',
        default: null
    }],
    userType:{
        type: String,
        required: true
    }

})
module.exports = mongoose.model('guidedatabase', schema)