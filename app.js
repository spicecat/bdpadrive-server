const express = require('express'), cors = require('cors'),
    { registerController, loginController, authenticateController } = require('./controllers/userController')

const app = express()

app.use(cors())
app.use(express.json())
app.use((_, res, next) => {
    res.removeHeader('X-Powered-By')
    next()
})

app.get('/ping', (_req, res) => {
    res.status(206).send('pong')
})

app.post('/register', registerController)
app.get('/login', loginController)

module.exports = app