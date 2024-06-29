const jwt = require('jsonwebtoken')
const util = require('util')
const signToken = util.promisify(jwt.sign)
const jwtTokenGenerator = async (payload) => {// for generating jwt
    //now generate token with email and deviceid
    let values = {}
    try {
        const data = await signToken(payload, "SecretKey")   
        values.data = data
    }
    catch (err) {
        values.error = "Jwt Signing Error"
    }
    console.log('value obj is',values)
    return values
}
module.exports = jwtTokenGenerator