const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    lastAction: { type: Date, default: new Date },
    auth: { type: String, required: true, enum: ['admin', 'user'], default: 'user' },
    created: { type: Date, required: true, default: Date.now },
})

module.exports = mongoose.model('user', UserSchema)