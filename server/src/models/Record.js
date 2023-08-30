const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Record = new Schema({
    username: {
        type: String, 
        required: [true, 'Username is empty'] 
    },
    prompt: { 
        type: String, 
        required: [true, 'Prompt is empty'] 
    },
    photo: { 
        type: String, 
        required: [true, 'Photo is empty']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Record', Record)