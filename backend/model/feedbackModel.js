const mongoose = require('mongoose')
const schema = mongoose.Schema({
    feedBack: {
        type: String,
        Required: true
    },
    username: {
        type: String,
        Required: true
    },
    email: {
        type: String,
        Required: true
    }
})
module.exports = mongoose.model("feedBackDb", schema)