const adminmodel = require("../model/adminmodel");
const guidemodel = require('../model/guidemodel')
const usermodel = require("../model/usermodel");
const { sendOtp, verifyOtp } = require('../email.js')
const jwtTokenGenerator = require('../assets/jwtTokenGenerator.js')
const { hashpassword, bcryptverify } = require('../assets/hashing')
const cloudinary = require('cloudinary').v2
const admincontroller = (req, res) => {
  res.send("admin controller")
}
const sendOtpFunction = async (req, res) => {
  try {
    const { email, userType } = req.body
    if (!email || !userType)
      return res.status(400).json({ message: "InSufficient Data Provided" })
    const userExists = await adminmodel.findOne({ email: email })
    if (!userExists)
      return res.status(404).json({ message: "User Not Found" })
    await sendOtp(email)
    return res.status(200).json({ message: "Otp Sent SuccessFully" })
  }
  catch (err) {
    console.log('err in sendotp function in adminController', err)
    return res.status(500).json({ message: "Server Error" })

  }
}

const verifyOtpFunction = async (req, res) => {
  try {
    const { email, userType, otp, deviceId } = req.body
    if (!email || !userType || !deviceId)
      return res.status(400).json({ message: "InSufficient Data Provided" })
    const userExists = await adminmodel.findOne({ email: email })
    if (!userExists)
      return res.status(404).json({ message: "User Not Found" })
    await verifyOtp(req.body.otp)//if error or wrong otp control passes to catch block automatically
    const { error, data } = await jwtTokenGenerator({ email, userType, deviceId })
    if (error)
      return res.status(500).json({ message: "Jwt Signing Error" })
    console.log('jwt token is', data)
    return res.status(200).cookie('AuthCookie', data, { maxAge: 1814400000 }).json({ success: true, user: userExists, message: 'user authenticated' })
  }
  catch (err) {
    console.log('err in verifyotp function in adminController', err)
    return res.status(500).json({ message: "Server Error" })

  }
}
const logincontroller = async (req, res) => {
  try {//for login with otp if valid email and password otp will be sent to email given
    const { email: useremail, password } = req.body
    console.log(useremail, password)
    if (!useremail || !password)
      return res.status(400).json({ success: false, message: "insufficient inputs" })
    const adminPresent = await adminmodel.findOne({ email: useremail })
    if (!adminPresent)
      return res.status(404).json({ success: false, message: "admin not found" })
    const isPasswordCorrect = await bcryptverify(password, adminPresent.password)
    console.log(isPasswordCorrect)
    if (!isPasswordCorrect)
      return res.status(401).json({ success: false, message: "invalid credientials" })
    //send mail with otp for added security and identifying true admin
    return res.status(200).json({ success: true, message: 'Login Successfull Go For Otp' })
  }
  catch (err) {
    console.log('error in adminlogin function ', err)
    res.status(500).send('oops internal server error')
  }
}
/*for admin registration */
const registercontroller = async (req, res) => {
  console.log('---------------------------------')
  console.log('initial data received in registercontroller is', req.body)
  let uploadedphoto = null
  let admin = null //variable to store admin document created using adminmode.create()
  try {
    const [A, B, C, D, E, F] = await Promise.all(
      [usermodel.findOne({ email: req.body.email }),
      usermodel.findOne({ mobile: req.body.mobile }),
      guidemodel.findOne({ mobile: req.body.mobile }),
      guidemodel.findOne({ email: req.body.email }),
      adminmodel.findOne({ mobile: req.body.mobile }),
      adminmodel.findOne({ email: req.body.email })
      ]
    )
    if (A || B || C || D || E || F)
      return res.status(403).json({ failure: true, message: "this email or mobile already exists" })
    uploadedphoto = await cloudinary.uploader.upload(req.body.photo)
    req.body.photo = uploadedphoto.secure_url;
    req.body.photoid = uploadedphoto.public_id
    const hashedpassword = await hashpassword(req.body.password)
    req.body.password = hashedpassword
    admin = await adminmodel.create(req.body)
    console.log('admin saved to database :admindata is', admin)

    return res.status(200).json({ success: true, message: 'admin created successfully,cookie also set' })
  }
  catch (err) {
    if (uploadedphoto)//if pic uploaded to cloudinary but error occurred delete it
    {
      const deletedpic = await cloudinary.uploader.destroy(req.body.photoid, (err, response) => {
        if (err) {
          console.log('admin uploadedpic deletion error', err)
        }
        else
          console.log('uploaded admin pic deleted response is', response)
      })
    }
    if (admin)//if admin created and error occured delete admin
    {
      const admindeleted = await adminmodel.findOneAndDelete({ email: admin.email })
      console.log('admin deleted successfully')
    }
    console.log("err from admincontroller is ", err)
    console.log('----------------------------------')
    res.status(500).json({ failure: true, message: "oops server issue happened" })
  }
}
const updatecontroller = async (req, res) => {
  let obj = null;
  try {
    const adminExists = adminmodel.findOne({ adhaar: req.body.adhaar })
    const mobileExists = adminmodel.findOne({ mobile: req.body.mobile })
    const [existingadmin, existingmobile] = await Promise.all([adminExists, mobileExists])
    if (existingadmin || existingmobile)
      return res.status(403).json({ failure: true, message: "this email or mobile already exists" })
    const photo = req.files.photo.tempFilePath;
    //  console.log('photo is ', req.files.photo)
    const admindocument = await adminmodel.create(req.body);
    const admin = await adminmodel.findById(admindocument._id).select('-_id -__v -password -tripid')
    res.status(200).json({ failure: false, admin: admin })

  }
  catch (err) {
    if (obj) {
      console.log("deleted asset")
      const delresponse = await cloudinary.uploader.destroy(req.body.photoid);
      console.log(delresponse)
    }
    console.log("err is ", err)
    res.status(500).json({ failure: true, message: "oops server issue happened" })
  }
}
module.exports = {
  admincontroller,
  updatecontroller,
  registercontroller,
  logincontroller,
  sendOtpFunction,
  verifyOtpFunction
}