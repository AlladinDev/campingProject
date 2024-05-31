const Joi = require('joi');
const schema=require('./joischema')
const validator = (req, res, next) => {
    console.log('data received is',req.body)
    req.body.photo = req.files?.photo.tempFilePath;
    const { error } = schema.validate({ ...req.body});
    if (error) {
        console.log("joi validation err", error)
        return res.status(400).json({ message: "invalid input" })
    }
    next()

}
module.exports = validator