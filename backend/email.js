var nodemailer = require('nodemailer');
const sendMail = (receipientEmail) => {
  return new Promise((resolve, reject) => {
    const err = false//error flag
    const randomNumber = Math.floor(Math.random() * 10) + 901539
    const otp = randomNumber + Math.floor(Math.random() * 10) + randomNumber
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
      subject: 'OTP from hikers@nature',
      text: `${otp}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {

        console.log(error);
        reject('oops error while sending email')
      } else {
        console.log('otp sent to: ', receipientEmail, + otp);
        resolve(otp)

      }
    });

  })

}

module.exports = sendMail