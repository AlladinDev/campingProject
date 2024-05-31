const joi=require('joi')
module.exports = joi.object({
    username: joi.string().min(3).max(20).required(),
    mobile: joi.string().pattern(/^[0-9]{10}$/).required(),
    email: joi.string().email().required(),
    age: joi.number().integer().min(15).max(70).required(),
    address: joi.string().min(3).max(123).required(),
    photo: joi.string().max(87).required(),
    password:joi.string().min(8).required(),
    gender:joi.string().required(),
    userType:joi.string().min(3).max(20).required(),

});