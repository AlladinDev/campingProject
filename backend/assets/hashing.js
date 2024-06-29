const bcrypt = require('bcryptjs')
const hashpassword = (pass) => {
    console.log('control entered hashing function')
    return new Promise((resolve, reject) => {
        try {
            bcrypt.hash(pass, 8, (err, result) => {
                if (err) {
                    console.log('error while hashing password')
                    reject('password hashing failed')
                }

                else {
                    resolve(result)
                }

            })
        }
        catch (error) {
            console.log('error in hashing function', error)
        }

    })
}
const bcryptverify = (pass, hashedpassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass, hashedpassword, (err, res) => {
            if (err) {
                return reject('error while comparing password')
            }
            if (res == true)
                resolve(true)
            else
                resolve(false)

        })
    })
}
module.exports = {
    hashpassword,
    bcryptverify
}