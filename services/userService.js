const jwt = require('jsonwebtoken'), User = require('../models/User')

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).lean()
        res.send(users).status(201)
    } catch (err) {
        res.sendStatus(400)
    }
}
const register = async (username, password) => {
    try {
        const user = new User({ username, password })
        await user.save()
        return user
    } catch (err) {
        return false
    }
}

const login = async (username, password) => {
    try {
        const user = await User.findOne({ username })
        if (!user || user.password !== password) return false
        const lastAction = Date.now(), token = jwt.sign({ username, lastAction }, 'tokenSignature', { expiresIn: '2h' })
        await User.findByIdAndUpdate(user._id, { token, lastAction })
        return token
    }
    catch (err) {
        return false
    }
}

const logout = async (username, password) => {
    try {
        const user = await User.findOne({ username })
        await User.findByIdAndUpdate(user._id, { token: '' })
        return true
    }
    catch (err) {
        return false
    }
}

const authenticate = async (token) => {
    try {
        const user = await User.findOne({ token })
        const verification = jwt.verify(token, 'tokenSignature'), date = Date.now()
        console.log(131, user, verification, date - verification.lastAction, Date.now())
        if (verification.username === user.username && date - verification.lastAction < 1500000) {
            await User.findByIdAndUpdate(user._id, { lastAction: date })
            return true
        }
        else return false
    }
    catch (err) {
        return false
    }
}


module.exports = { getUsers, register, login, logout, authenticate }