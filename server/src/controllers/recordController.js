const { validationResult } = require('express-validator')
const Record = require('../models/Record')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.lists = async (req, res, next) => {
    try {
        const currentPage = req.query.page || 1
        const perPage = req.query.perPage || 10
        let totalItems

        const count = await Record.countDocuments()
        totalItems = count

        const result = await Record.find()
            .sort({_id: -1})
            .skip((parseInt(currentPage) - 1) * perPage)
            .limit(perPage)
        
        res.status(200).json({
            message: 'Successfully',
            data: result,
            total_data: totalItems,
            per_page: perPage,
            current_page: currentPage
        })
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

exports.sharing = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid value',
            errors: errors.array()
        })
    }

    try {
        const { prompt, photo } = req.body

        if (photo == null) {
            return res.status(422).json({
                message: 'Image harus diupload',
            });
        }

        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
        const authorId = decodedToken.id

        const user = await User.findById(authorId)

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const share = new Record({
            username: user.username,
            prompt: prompt,
            photo: Buffer.from(photo)
        })

        const result = await share.save()

        res.status(201).json({
            message: 'Your image has been shared',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

exports.history = async (req, res, next) => {
    try {
        const currentPage = req.query.page || 1
        const perPage = req.query.perPage || 10
        let totalItems

        const count = await Record.countDocuments()
        totalItems = count

        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
        const authorId = decodedToken.id

        const user = await User.findById(authorId)

        const result = await Record.find({'username' : user.username})
            .sort({_id: -1})
            .skip((parseInt(currentPage) - 1) * perPage)
            .limit(perPage)
        
        res.status(200).json({
            message: 'Successfully',
            data: result,
            total_data: totalItems,
            per_page: perPage,
            current_page: currentPage
        })
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

exports.deleteHistory = async (req, res, next) => {
    try {
        const record = await Record.findById(req.params.recordId)

        if (!record) {
            return res.status(404).json({
                message: 'Record not found'
            })
        }
        
        const result = await Record.findByIdAndRemove(req.params.recordId)

        res.status(200).json({
            message: 'Your image has been removed',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}