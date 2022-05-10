const mongoose = require('mongoose')
const DB = require('./db')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '請輸入您的名字']
    },
    email: {
        type: String,
        required: [true, '請輸入您的Email'],
        unique: true,
        lowercase: true,
        select: false
    },
    photo: String
})

const User = mongoose.model('user', userSchema)
module.exports = User;