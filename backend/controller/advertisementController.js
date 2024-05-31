const advertisementModel = require('../model/advertismentModel')
const addAdvertisement = async (req, res) => {
    try {
        if (!req.body.advertisement)
            return res.status(400).json({ message: "Advertisement Required" })
        const result = await advertisementModel.create(req.body)
        return res.status(200).json({ advertisement: result })

    }
    catch (err) {
        console.log('err in add advertisement model', err)
        return res.status(500).json({ message: "Server Error Occurred" })
    }
}
const deleteAdvertisement = async (req, res) => {
    try {
        console.log(req.body)
        if (!req.body.id)
            return res.status(500).json({ message: "Advertisement ID Required" })
        const result = await advertisementModel.findOneAndDelete({ _id: req.body.id })
        return res.status(200).json({ message: "Deleted SuccessFully" })

    }
    catch (err) {
        console.log('Err in delete Advertisement Function', err)
        return res.status(500).json({ message: "Server Error" })

    }
}
const getAdvertisement = async (req,res) => {
    try {
        const result = await advertisementModel.find()
        return res.status(200).json({ advertisement: result[0] })

    }
    catch (err) {
        console.log('err in delete advertisement function', err)
        return res.status(500).json({ message: "Server Error" })
    }
}
module.exports = {
    addAdvertisement,
    getAdvertisement,
    deleteAdvertisement
}