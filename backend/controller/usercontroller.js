const usermodel = require("../model/usermodel");
const sendMail = require('../email.js')
const { hashpassword, bcryptverify } = require('../assets/hashing')
const cloudinary = require('cloudinary').v2
const jwt = require('jsonwebtoken');
let otp = null//global otp variable
let time = null//time otp will be valid in this time only
const allUsersController = async (req, res) => {
  try {
    const users = await usermodel.find({}, { _id: 0, __v: 0, password: 0, photoid: 0 })
    return res.status(200).json({ users: users })
  }
  catch (err) {
    console.log('err in get allusers usercontroller', err)
    return res.status(500).send('oops server error')
  }
}
const tokengenerator = async (req, res) => {//function for keeping user logged in by using jwt token invoked from otp form
  //first check if otp verification successfully or not
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
    return res.status(401).json({ success: false, message: "unauthorised user" })
  //now generate jwt token with emailID and deviceid and send it back
  jwt.sign({ email, deviceId, userType, username }, "secretkey", (err, token) => {
    if (err) {
      return res.status(500).json({ success: false, message: "failure while generating auth token" })
    }
    else {
      console.log('token is', token)
      return res.status(200).cookie('AuthCookie', token, { maxAge: 1814400000 }).json({ success: true, message: 'user authenticated' })
    }
  })
}
const userlogincontroller = async (req, res) => {
  try {//for login with otp if valid email and password otp will be sent to email given
    const { email: useremail, password } = req.body
    console.log(useremail, password)
    if (!useremail || !password)
      return res.status(400).json({ success: false, message: "insufficient inputs" })
    const userPresent = await usermodel.findOne({ email: useremail })
    if (!userPresent)
      return res.status(404).json({ success: false, message: "user not found" })
    const isPasswordCorrect = await bcryptverify(password, userPresent.password)
    console.log(isPasswordCorrect)
    if (!isPasswordCorrect)
      return res.status(401).json({ success: false, message: "invalid credientials" })
    //send mail with otp for added security and identifying true user
    const mailResponse = await sendMail(useremail)
    time = new Date().getSeconds()
    console.log(time)
    console.log('male respoonse is', mailResponse)
    otp = mailResponse
    return res.status(200).json({ success: true, message: 'otp sent successfully', userType: userPresent.userType, username: userPresent.username })
  }
  catch (err) {
    console.log('error in userlogin function ', err)
    res.status(500).send('oops internal server error')
  }
}
/*for user registration */
const registercontroller = async (req, res) => {
  console.log('---------------------------------')
  console.log('initial data received in registercontroller is', req.body)
  let uploadedphoto = null
  let user = null //variable to store user document created using usermode.create()
  try {

    //check if user is already registered
    const [existinguser, existingmobile] = await Promise.all(
      [usermodel.findOne({ email: req.body.email }),
      usermodel.findOne({ mobile: req.body.mobile })]
    )
    if (existinguser || existingmobile)
      return res.status(403).json({ failure: true, message: "this email or mobile already exists" })
    uploadedphoto = await cloudinary.uploader.upload(req.body.photo)
    req.body.photo = uploadedphoto.secure_url;
    req.body.photoid = uploadedphoto.public_id
    const hashedpassword = await hashpassword(req.body.password)
    req.body.password = hashedpassword
    user = await usermodel.create(req.body)
    console.log('user saved to database :userdata is', user)

    return res.status(200).json({ success: true, message: 'user created successfully,cookie also set' })
  }
  catch (err) {
    if (uploadedphoto)//if pic uploaded to cloudinary but error occurred delete it
    {
      const deletedpic = await cloudinary.uploader.destroy(req.body.photoid, (err, response) => {
        if (err) {
          console.log('user uploadedpic deletion error', err)
        }
        else
          console.log('uploaded user pic deleted response is', response)
      })
    }
    if (user)//if user created and error occured delete user
    {
      const userdeleted = await usermodel.findOneAndDelete({ email: user.email })
      console.log('user deleted successfully')
    }
    console.log("err from usercontroller is ", err)
    console.log('----------------------------------')
    res.status(500).json({ failure: true, message: "oops server issue happened" })
  }
}
const updatecontroller = async (req, res) => {
  let obj = null;
  try {
    const userExists = usermodel.findOne({ adhaar: req.body.adhaar })
    const mobileExists = usermodel.findOne({ mobile: req.body.mobile })
    const [existinguser, existingmobile] = await Promise.all([userExists, mobileExists])
    if (existinguser || existingmobile)
      return res.status(403).json({ failure: true, message: "this email or mobile already exists" })
    const photo = req.files.photo.tempFilePath;
    //  console.log('photo is ', req.files.photo)
    const userdocument = await usermodel.create(req.body);
    const user = await usermodel.findById(userdocument._id).select('-_id -__v -password -tripid')
    res.status(200).json({ failure: false, user: user })

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
const addTripController = async (req, res) => {
  try {
    const { email, tripId } = req.body;
    if (!email || !tripId)
      return res.status(400).json({ message: "insufficient inputs" })
    const isPresent = await usermodel.findOne({ email: email })
    if (!isPresent)
      return res.status(404).json({ message: "user not found" })
    isPresent.tripid.push(tripId)
    await isPresent.save()
    return res.status(200).json({ message: 'trip added for user successfully' })
  }
  catch (err) {
    console.log('error from add trip controller under user controller', err)
    return res.status(500).json({ message: "oops server error" })
  }
}
module.exports = {
  allUsersController,
  updatecontroller,
  registercontroller,
  userlogincontroller,
  tokengenerator,
  addTripController

}