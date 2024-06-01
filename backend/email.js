const nodemailer = require('nodemailer');
let otpSentTime = null;
let generatedOtp = null
function generateOtp() {
    let digits = '9835478612';
    let otpNumber = '';
    for (let i = 0; i < 6; i++) {
        otpNumber += digits[Math.floor(Math.random() * 10)];
    }
    console.log('otp is',otpNumber)
    return otpNumber;
}
const sendOtp = (receipientEmail) => {
    return new Promise((resolve, reject) => {
        const err = false//error flag
        const otp = generateOtp()//returns otp calculated
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            pool: true,
            auth: {
                user: 'alladinmagic12@gmail.com',
                pass: "jodl tazp phkq xjlr"
            }
        });
        const mailOptions = {
            from: 'alladinmagic12@gmail.com',
            to: receipientEmail,
            subject: 'OTP from labourHiring Organisation',
            text: `${otp}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                const errObj = new Error('oops error while sending email')
                errObj.status = 500
                reject(errObj)
            } else {
                otpSentTime = new Date().getSeconds()//save time at which otp was sent
                console.log('otp sent to: ', receipientEmail, + otp);
                generatedOtp = otp//save also the otp sent
                resolve(otp)
            }
        });

    })
}
const verifyOtp = (receivedOtp) => {
    const currentTime = new Date().getSeconds()
    return new Promise((resolve, reject) => {
        if (!receivedOtp) {
            const errObj = new Error('otp not present')
            errObj.status = 400
            reject(errObj)//if no otp send error response
        }

        if (currentTime - otpSentTime > 180) {
            const errObj = new Error('otp timeout')
            errObj.status = 400
            reject(errObj)//if otp timeout
        }

        if (generatedOtp != receivedOtp) {
            console.log('otp received for verification is',generatedOtp)
            console.log(generatedOtp != receivedOtp)
            const errObj = new Error('invalid otp')
            errObj.status = 400
            reject(errObj)//if invalid otp sent
        }
        console.log('passed email validation')
        resolve('otp validation passed')//else resolve promise
    })
}

module.exports = {
    sendOtp,
    verifyOtp
}
