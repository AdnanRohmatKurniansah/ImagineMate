const express = require('express')
const app = express()
const cors = require('cors')
const authRoute = require('./src/routes/authRoute')
const recordRoute = require('./src/routes/recordRoute')
require('dotenv').config()
const mongoose = require('mongoose')
const multer = require('multer')

app.use(cors({
    credentials:true,
    origin: 'https://imatesite.vercel.app',
}))

app.use(express.json())

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'))

app.use('/auth', authRoute)
app.use('/record', recordRoute)

mongoose.connect(process.env.MONGO_CONNECT)
.then(() => {
    app.listen(3000, () => {
        console.log('Server listening in port 3000, Connection success')
    })
})
.catch(err => console.log(err))
