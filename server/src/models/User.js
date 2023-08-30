const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const User = new Schema({
    username: {
        type: String,
        required: [true, 'Your username is empty'],
    },
    email: {
        type: String,
        required: [true, 'Your e-mail is empty'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Your password is empty'],
    },
}, {
    timestamp: true
})

User.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12)
})

module.exports = mongoose.model('User', User)