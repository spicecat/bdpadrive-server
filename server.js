const mongoose = require('mongoose'),
    app = require('./app')

const PORT = 8000, CONNECTION_STRING = 'mongodb+srv://dbUser:dbPassword@cluster0.1wj2g.mongodb.net/test'

mongoose.connect(CONNECTION_STRING, {}, err => {
    if (err) console.log(err)
    else app.listen(PORT, () => console.log('listening at port:', PORT))
})