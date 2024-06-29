const tripModel = require('../model/tripmodel')
const cloudinary = require('cloudinary').v2
const guideModel = require('../model/guidemodel')
const mongoose = require('mongoose')
const stripe = require('stripe')('sk_test_51P928jSG2H8tvxJlaSKdXrU3RzQSy7QWwHexYNYFbgSJp7E7NMGD97aj3rvgGryRMEwPTyWSdVJU7mNaKKKTONcK007bVTXuVL');
const addTrip = async (req, res) => {
  let uploadedPhoto = null
  try {
    if (!req.body.tripType || !req.body.difficulty)
      return res.status(400).json({ message: "Insufficient Data" })
    const photo = req.body.photo//it has been appended to it by trip validator function
    //otherwise photo is in req.files ,here photo means photo path
    uploadedPhoto = await cloudinary.uploader.upload(photo)
    req.body.photo = uploadedPhoto.secure_url
    req.body.photoId = uploadedPhoto.public_id
    req.body.expiresAfter = req.body.date//add the expiry date of trip after which it should be deleted
    const guide = await guideModel.findById(req.body.guideAllotted)
    const place = await tripModel.create(req.body)
    guide.trips.push(place._id)
    await guide.save()
    console.log('user saved')
    await place.populate('guideAllotted')
    console.log('guide informed about trip successfully')
    const { __v, photoId, ...obj } = place.toObject()
    return res.status(200).json({ trip: obj })
  }
  catch (err) {
    if (uploadedPhoto) {
      const deleteResult = await cloudinary.uploader.destroy(req.body.photoId)
      console.log('uploaded photo deleted successfully response is', deleteResult)
    }
    console.log('err in trek controller add trek', err)
    return res.status(500).send('oops server error ')
  }
}
const getAllTrips = async (req, res) => {
  try {
    const trips = await tripModel.find({}, { __v: 0 }).populate({ path: 'guideAllotted', select: '-_id-__v -password -photoId -tripId -userType' })
    return res.status(200).json({ trips: trips })
  }
  catch (err) {
    console.log('err in trip controller get all trips', err)
    return res.status(500).send('oops server error')
  }
}
const deleteTrip = (req, res) => {

}
const checkOutTrip = async (req, res) => {
  try {
    console.log('api key is', process.env.stripysecretkey)
    const Amount = req.body.amount
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Trip  Fee',
            },
            unit_amount: Amount * 100, // Amount in cents (100 rupees)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/paymentsuccess',
      cancel_url: 'http://localhost:5173/paymentfailure',
    });

    res.json({ session: session.id });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message, error });
  }
}
const deleteOldTrips = async (req, res) => {//for deleting old trips  automatically
  const DateObj = new Date()
  let presentDate = ''
  presentDate = presentDate + DateObj.getFullYear()
  presentDate = presentDate + '-' + 0 + (DateObj.getMonth() + 1)
  presentDate = presentDate + '-' + (DateObj.getDate())
  console.log('today is', presentDate)
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    // const result = await tripModel.deleteMany({ date: { $lt: presentDate } }, { session })
    // console.log(result)
    // const guideList = await guideModel.find()
    // const allTrips = await tripModel.find()
    // console.log('all trips are', allTrips)
    // const result = await tripModel.find({ date: { $lt: presentDate } })
    // const guideList = await guideModel.find()
    // result.map((oldTrip) => {

    // })
    // console.log('old trips are', result)

    await session.commitTransaction();
    return res.status(200).json({ message: "Old trips retrived" })
  }

  catch (err) {
    console.log(err)
    await session.abortTransaction();
    session.endSession();
    return res.status(200).json({ message: "Server Error" })
  }
}
module.exports = {
  addTrip,
  getAllTrips,
  deleteTrip,
  checkOutTrip,
  deleteOldTrips
}