const schema = require('./joischema')
const joi = require('joi')
const guidevalidator = (req, res, next) => {
    schema.keys({
    
        qualification: joi.string().max(130).required()
    
    })
    req.body.photo = req.files.photo.tempFilePath//take photo path from photo file and insert it into req body
    const { err, value } = schema.validate(req.body)
    if (err)
        return res.status(400).json({ success: false, message: "invalid  or insufficient input" })
    console.log('validation passed in guidevalidatorfunction')
    next()
}

module.exports = guidevalidator