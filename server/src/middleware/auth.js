const jwt = require('jsonwebtoken')
require("dotenv").config();

exports.verify = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
            if(err) return res.status(401).json({
                isLoggedIn: false,
                message: 'Authentication failed'
            })
            req.user = {}
            req.user.id = decoded.id
            req.user.email = decoded.email
            next()
        })
    } else {
        res.status(403).json({
            message: 'Token not valid',
            isLoggedIn: false
        })
    }
}