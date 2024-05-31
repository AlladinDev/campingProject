const adminmodel = require("../model/adminmodel");
const sendMail = require('../email.js')
const { hashpassword, bcryptverify } = require('../assets/hashing')
const cloudinary = require('cloudinary').v2
const jwt = require('jsonwebtoken');
let otp = null//global otp variable
let time = null//time otp will be valid in this time only
const admincontroller = (req, res) => {
  res.send("admin controller")
}
const tokengenerator = async (req, res) => {//function for keeping admin logged in by using jwt token invoked from otp form
  //first check if otp verification successfully or not
  try {
    const presentTime = new Date().getSeconds()
    const { otp: receivedOtp, email, username, userType } = req.body
    console.log('request data is', req.headers.deviceid, email, receivedOtp)
    const deviceId = req.headers.deviceid
    if (!receivedOtp)
      return res.status(400).json({ success: false, message: "enter otp sent to registered email" })
    if (presentTime - time > 15000) {
      console.log("timeout", presentTime - time)
      return res.status(401).json({ success: false, message: "otp timeout" })
    }
    console.log('otp comparison ', receivedOtp == otp)
    if (receivedOtp != otp)//if wrong otp send error message
      return res.status(401).json({ success: false, message: "unauthorised admin" })
    //now generate jwt token with emailID and deviceid and send it back
    jwt.sign({ email, deviceId, userType, username }, "secretkey", (err, token) => {
      if (err) {
        return res.status(500).json({ success: false, message: "failure while generating auth token" })
      }
      else {
        console.log('token is', token)
        return res.status(200).cookie('AuthCookie', token, { maxAge: 1814400000 }).json({ success: true, message: 'admin authenticated' })
      }
    })
  }
  catch (err) {
    console.log('err in ')
    res.status(500).json({ success: false, message: "oops something went wrong in token generator" })
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
    const mailResponse = await sendMail(useremail)
    time = new Date().getSeconds()
    console.log(time)
    console.log('male respoonse is', mailResponse)
    otp = mailResponse
    return res.status(200).json({ success: true, message: 'otp sent successfully', userType: adminPresent.userType, username: adminPresent.username })
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

    //check if admin is already registered
    const [existingadmin, existingmobile] = await Promise.all(
      [adminmodel.findOne({ email: req.body.email }),
      adminmodel.findOne({ mobile: req.body.mobile })]
    )
    if (existingadmin || existingmobile)
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
  tokengenerator,


}