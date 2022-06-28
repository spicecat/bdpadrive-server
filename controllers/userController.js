const { getUsers, register, login, authenticate } = require('../services/userService')

const registerController = async (req, res) => {
    const { username, password } = req.body
    try {
        if (await register(username, password)) res.sendStatus(201)
        else res.sendStatus(409)
    } catch (err) {
        res.sendStatus(400)
        return
    }
}
const loginController = async (req, res) => {
    const { username, password } = req.body
    try {
        if (await login(username, password)) res.sendStatus(202)
        else {
            res.sendStatus(401)
            return
        }
    } catch (err) {
        res.sendStatus(400)
        return
    }
}

const authenticateController = async (req, res, next) => {
    const { token } = req.body
    try {
        if (await authenticate(token)) next()
        else {
            res.sendStatus(401)
            return
        }
    } catch (err) {
        res.sendStatus(400)
        return
    }
}

module.exports = { registerController, loginController, authenticateController }