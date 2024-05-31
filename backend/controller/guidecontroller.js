const guidemodel = require('../model/guidemodel')
const cloudinary = require('cloudinary').v2
const sendMail = require('../email')
const { bcryptverify } = require('../assets/hashing')
const { hashpassword } = require('../assets/hashing')
const jwt = require('jsonwebtoken')
const { get } = require('../routes/userRoutes')
const getAllGuides = async (req, res) => {
  try {
    const users = await guidemodel.find({}, { __v: 0, password: 0, photoid: 0 })
    return res.status(200).json({ users: users })

  }
  catch (err) {
    console.log('err in getallguide from guide controller', err)
    return res.status(500).send('oops server error')
  }
}
const guideRegistration = async (req, res) => {
  console.log('----------------------------------------------------')
  console.log('request object received in guidecontroller is ', req.body)
  let guidephoto = null
  let GuideUploadedPhoto = null;
  let user = null //variable to store user document created using usermode.create()
  try {
    const userExists = guidemodel.findOne({ email: req.body.email })
    const mobileExists = guidemodel.findOne({ mobile: req.body.mobile })
    const [existinguser, existingmobile] = await Promise.all([userExists, mobileExists])
    if (existinguser || existingmobile)
      return res.status(403).json({ failure: true, message: "this email or mobile already exists" })
    guidephoto = req.body.photo;
    console.log('guide photo is', guidephoto)
    GuideUploadedPhoto = await cloudinary.uploader.upload(guidephoto)
    console.log('photo uploaded to cloudinary')
    req.body.photo = GuideUploadedPhoto.secure_url;
    req.body.photoid = GuideUploadedPhoto.public_id;
    const hashedpassword = await hashpassword(req.body.password)

    req.body.password = hashedpassword
    console.log('hashed password is', hashedpassword)
    console.log('reqbody is', req.body)
    user = await guidemodel.create(req.body)
    console.log('guide data saved to database : data is', user)
    console.log(user.toObject())
    const { __v, password, photoid, ...obj } = user.toObject();//inorder to remove photoid password v id from object to be sent to frontend
    return res.status(200).json({ success: true, message: 'registered successfully', user: obj })
  }
  catch (err) {
    if (GuideUploadedPhoto) {//if guide photo uploaded but error occurred delete guide uploaded photo
      const deletedphoto = await cloudinary.uploader.destroy(req.body.photoid)
      console.log('deleted guide uploaded photo succesfully deleted response is', deletedphoto)
    }
    if (user)//if user created and error occured delete user
    {
      const userdeleted = await guidemodel.findOneAndDelete({ email: user.email })
      console.log('user deleted successfully')
    }
    console.log('err in guide conrtroller is', err)
    console.log('-------------------------------------------------------')
    return res.status(500).send('oops something went wrong in guidecontroller')

  }
}
let otp = null
const guideTokengenerator = async (req, res) => {// for generating jwt
  const { otp: receivedOtp, email } = req.body
  const nowTime = new Date().getSeconds()
  const deviceId = req.headers.deviceid
  if (!receivedOtp || !deviceId)
    return res.status(400).json({ success: false, message: "insufficient  inputs" })
  if (nowTime - time > 15)
    return res.status(401).json({ success: false, message: "otp timeout" })
  if (receivedOtp != otp)
    return res.status(401).json({ success: false, message: "wrong otp" })
  //now generate token with email and deviceid
  jwt.sign({ deviceId, email }, 'secretkey', (err, token) => {
    if (err)
      return res.status(500).json({ success: false, message: "oops token generation failure" })
    return res.status(200).cookie('AuthCookie', token, { maxAge: 1209600 }).json({ success: true, message: 'user authenticated' })
  })
  return//return from function
}
const guideLogin = async (req, res) => {
  const { useremail, password } = req.body
  if (!useremail || !password)
    return res.status(400).json({ success: false, message: "insufficient inputs provided" })
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//email regex
  if (!emailRegex.test(useremail) || password.length < 8)//data validation here
    return res.status(400).json({ success: false, message: "invalid inputs" })
  const isUserPresent = await guidemodel.findOne({ email: useremail })
  if (!isUserPresent)
    return res.status(403).json({ success: false, message: "user not present" })
  const isPasswordCorrect = await bcryptverify(password, isUserPresent.password)
  console.log(isPasswordCorrect)
  if (!isPasswordCorrect)
    return res.status(401).json({ success: false, message: "invalid credientials" })
  //send mail with otp for added security and identifying true user
  const mailResponse = await sendMail(useremail)
  time = new Date().getSeconds()
  console.log(time)
  console.log('male respoonse is', mailResponse)
  otp = mailResponse
  return res.status(200).json({ success: true, message: 'otp sent successfully' })
}
module.exports = {
  guideRegistration,
  guideLogin, guideTokengenerator,
  getAllGuides
}
/* const mailResponse = await sendMail(useremail)
    time = new Date().getSeconds()
    console.log(time)
    console.log('male respoonse is', mailResponse)
    otp = mailResponse
    return res.status(200).json({ success: true, message: 'otp sent successfully' })
    */