const mongoose = require('mongoose')
const schema = mongoose.Schema({
    advertisement: {
        type: String,
        Required: true
    }
})
module.exports = mongoose.model("advertisementDb",schema)