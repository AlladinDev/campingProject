const feedBackModel = require('../model/feedbackModel')
const addFeedBack = async (req, res) => {
    try {
        if (!req.body.username || !req.body.email || !req.body.feedBack)
            return res.status(400).json({ message: "Insufficient Data Provided" })
        const feedBackCreated = await feedBackModel.create(req.body)
        const {__v,...necessaryData}= feedBackCreated.toObject()
        return res.status(200).json({ feedBack: necessaryData })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}
const getAllFeedBacks = async (req, res) => {
    try {
        const feedBacks = await feedBackModel.find({}, { __v: 0 })
        return res.status(200).json({ feedBacks: feedBacks })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}
const deleteFeedBack = async (req, res) => {
    try {
        if (!req.body.id)
            return res.status(400).json({ message: "FeedBack Id Required" })
        const feedBacks = await feedBackModel.findOneAndDelete({ _id: req.body.id })
        return res.status(200).json({ message: "FeedBack Deleted Successfully" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}
module.exports={
    addFeedBack,
    getAllFeedBacks,
    deleteFeedBack
}