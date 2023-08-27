const express = require('express')
const app = express()
const cors = require('cors')
const authRoute = require('./src/routes/authRoute')
require('dotenv').config()
const mongoose = require('mongoose')

app.use(cors())

app.use(express.json())

app.use('/auth', authRoute)

// app.use((error, req, res, next) => {
//     const status = error.errorStatus || 500
//     const message = error.message
//     const data = error.data
//     res.status(status).json({
//         message: message,
//         data: data
//     })
// })

mongoose.connect(process.env.MONGO_CONNECT)
.then(() => {
    app.listen(3000, () => {
        console.log('Server listening in port 3000, Connection success')
    })
})
.catch(err => console.log(err))
