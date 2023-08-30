const recordController = require('../controllers/recordController')
const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { verify } = require('../middleware/auth')

const validateShare = [
    body('prompt').notEmpty().withMessage('Your prompt is empty')
]

router.post('/share', validateShare, verify, recordController.sharing)
router.get('/lists', verify, recordController.lists)

module.exports = router