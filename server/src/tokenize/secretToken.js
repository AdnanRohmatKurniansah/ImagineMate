require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports.secretToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.SECRET_TOKEN, {
        expiresIn: 1 * 24 * 60 * 60,
    })
}   