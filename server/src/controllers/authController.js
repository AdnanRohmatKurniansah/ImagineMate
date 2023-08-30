const User = require('../models/User')
const { secretToken } = require('../tokenize/secretToken')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

exports.register = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid value',
            errors: errors.array()
        })
    }

    try {
        const { username, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: 'Email already used'
            })
        }
        const user = await User.create({ username, email, password})

        res.status(200).json({
            message: 'Registration successfully',
            data: user
        })
        next()
    } catch (error) {
        res.status(500).json({
            message: error
        })
        next()
    }
}

exports.login = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid value',
            errors: errors.array()
        })
    }

    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            const token = secretToken(user._id)
            return res.status(201).json({
                message: 'Login successfully',
                token: "Bearer " + token
            })
        } else {
            return res.status(401).json({
                message: 'Login failed'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}


