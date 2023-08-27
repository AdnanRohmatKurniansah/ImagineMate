const authController = require('../controllers/authController')
const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const validateRegister = [
    body('name').notEmpty().withMessage('Your name is empty').isLength({min: 5}).withMessage('Name min 5'),
    body('email').notEmpty().withMessage('Your email is empty').isEmail().withMessage('Email must be valid'),
    body('password').notEmpty().withMessage('Your password is empty').isLength({min: 5}).withMessage('Password min 5')
]

const validateLogin = [
    body('email').notEmpty().withMessage('Your email is empty').isEmail().withMessage('Email must be valid'),
    body('password').notEmpty().withMessage('Your password is empty').isLength({min: 5}).withMessage('Password min 5')
]

router.post('/register', validateRegister, authController.register)
router.post('/login', validateLogin, authController.login)

module.exports = router
