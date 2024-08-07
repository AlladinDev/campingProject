const jwt = require('jsonwebtoken')
const usermodel = require('../model/usermodel')
const guidemodel = require('../model/guidemodel')
const adminmodel = require('../model/adminmodel')
const checkAuthStatus = async (req, res) => {
  try {
    const id = req.body.userID
    const token = req.cookies.AuthCookie
    if (!token)
      return res.status(403).json({ success: false, message: "token not present" })
    let jwtValue = null//variable to store value encoded in jwt token
    let flag=false
    jwt.verify(token, 'SecretKey', (err, value) => {
      if (err)
      {
        flag=true
        console.log(err)
        return res.status(403).json({ success: false, message: "token invalid" })
        
      }
      if (value.deviceId != id)
      {
        flag=true
        return res.status(403).json({ success: false, message: "user not valid" })
      }
      jwtValue = value;//store jwt value in variable jwtValue
    })
    if(flag)
    return 
    //now fetch user data using email stored in jwt token
    let user = null//variable to store user data from db

    switch (jwtValue.userType) {
      case "admin":
        user = await adminmodel.findOne({ email: jwtValue.email }, {  password: 0, __v: 0 })
        break;
      case "user":
        user = await usermodel.findOne({ email: jwtValue.email }, {  password: 0, __v: 0 }).populate('trips')
        break;
      case "guide":
        user = await guidemodel.findOne({ email: jwtValue.email }, {  password: 0, __v: 0 }).populate('trips')
        break;
      default:
        user = null
    }
    if (user == null)
      return res.status(400).send('token contains no userType field')
    return res.status(200).json({ success: true, message: "user is valid", username: jwtValue.username, userType: jwtValue.userType, user })
  }

  catch (err) {
    console.log('err in authchecker', err)
    return res.status(500).send('err in backend')
  }
}
module.exports = checkAuthStatus