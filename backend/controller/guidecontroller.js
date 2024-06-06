const guidemodel = require('../model/guidemodel')
const usermodel = require("../model/usermodel");
const adminmodel = require("../model/adminmodel");
const cloudinary = require('cloudinary').v2
const { sendOtp, verifyOtp } = require('../email')
const { bcryptverify } = require('../assets/hashing')
const { hashpassword } = require('../assets/hashing')
const jwtTokenGenerator = require('../assets/jwtTokenGenerator')
const { get } = require('../routes/userRoutes');
const { error } = require('../assets/joischema');
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
const getGuideData = async (req, res) => {
  try {
    const users = await guidemodel.findOne({ email: req.body.email }, { password: 0, __v: 0, photoId: 0 }).populate('tripId')
    return res.status(200).json({ users: users })
  }
  catch (err) {
    console.log('err in getguidedata from guide controller', err)
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
const sendOtpFunction = async (req, res) => {
  try {
    const { email, userType } = req.body
    if (!email || !userType)
      return res.status(400).json({ message: "InSufficient Data Provided" })
    const userExists = await guidemodel.findOne({ email: email })
    if (!userExists)
      return res.status(404).json({ message: "User Not Found" })
    await sendOtp(email)
    return res.status(200).json({ message: "Otp Sent SuccessFully" })
  }
  catch (err) {
    console.log('err in sendotp function in guidecontroller', err)
    return res.status(500).json({ message: "Server Error" })

  }
}

const verifyOtpFunction = async (req, res) => {
  try {
    const { email, userType, otp, deviceId } = req.body
    if (!email || !userType || !deviceId)
      return res.status(400).json({ message: "InSufficient Data Provided" })
    const userExists = await guidemodel.findOne({ email: email }).populate('tripId')
    if (!userExists)
      return res.status(404).json({ message: "User Not Found" })
    await verifyOtp(req.body.otp)//if error or wrong otp control passes to catch block automatically
    const { err, data } = await jwtTokenGenerator({ email, userType, deviceId })
    if (err)
      return res.status(500).json({ message: "Jwt Signing Error" })
    const { _id, __v, photoId, password, ...necessaryData } = userExists.toObject()
    return res.status(200).cookie('AuthCookie', data, { maxAge: 1814400000 }).json({ success: true, message: 'user authenticated', user: necessaryData })
  }
  catch (err) {
    console.log(err.message)
    err.message = err.message || "Server Error"
    err.status = err.status|| 500
    console.log('err in verifyotp function in guidecontroller', err)
    return res.status(err.status).json({ message: err.message })

  }
}

const guideLogin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ success: false, message: "insufficient inputs provided" })
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//email regex
  if (!emailRegex.test(email) || password.length < 8)//data validation here
    return res.status(400).json({ success: false, message: "invalid inputs" })
  const isUserPresent = await guidemodel.findOne({ email: email })
  if (!isUserPresent)
    return res.status(403).json({ success: false, message: "user not present" })
  console.log('guide is', isUserPresent)
  const isPasswordCorrect = await bcryptverify(password, isUserPresent.password)
  console.log(isPasswordCorrect)
  if (!isPasswordCorrect)
    return res.status(401).json({ success: false, message: "invalid credientials" })
  return res.status(200).json({ success: true, message: 'Login Successfull Go For Otp' })
}
module.exports = {
  guideRegistration,
  guideLogin,
  getAllGuides,
  sendOtpFunction,
  verifyOtpFunction,
  getGuideData
}
/* const mailResponse = await sendMail(email)
    time = new Date().getSeconds()
    console.log(time)
    console.log('male respoonse is', mailResponse)
    otp = mailResponse
    return res.status(200).json({ success: true, message: 'otp sent successfully' })
    */