const tokenGenerator = async (req, res) => {//function for keeping admin logged in by using jwt token invoked from otp form
    //first check if otp verification successfully or not
    const presentTime = new Date().getSeconds()
    const { otp: receivedOtp, email, username, userType } = req.body
    const deviceId = req.headers.deviceid
    if (!receivedOtp)
        return res.status(400).json({ success: false, message: "enter otp sent to registered email" })
    if (presentTime - time > 180000) {
        console.log("timeout", presentTime - time)
        return res.status(401).json({ success: false, message: "otp timeout" })
    }
    if (receivedOtp != otp)//if wrong otp send error message
        return res.status(401).json({ success: false, message: "unauthorised admin" })
    //now generate jwt token with emailID and deviceid and send it back
    jwt.sign({ email, deviceId, userType, username }, "secretkey", (err, token) => {
        if (err) {
            return res.status(500).json({ success: false, message: "failure while generating auth token" })
        }
        else {
            console.log('token is', token)
            return res.status(200).cookie('AuthCookie', token, { maxAge: 1814400000 }).json({ success: true, message: 'Authenticated Successfully' })
        }
    })
}
module.exports=tokenGenerator

