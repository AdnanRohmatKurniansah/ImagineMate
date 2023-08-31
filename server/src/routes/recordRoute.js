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
router.get('/history', verify, recordController.history)
router.delete('/:recordId', verify, recordController.deleteHistory)

module.exports = router