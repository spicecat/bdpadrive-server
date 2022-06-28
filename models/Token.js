const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    token: { type: String }
})

module.exports = mongoose.model('token', TokenSchema)