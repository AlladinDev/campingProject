const mongoose = require('mongoose')
const { v4: uid } = require('uuid');
const schema = mongoose.Schema({
    advertisement: {

        type: String,
        Required: true
    }
})
module.exports = mongoose.model("advertisementDb",schema)