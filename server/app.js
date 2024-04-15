const express = require('express')
const cors = require('cors')
const path = require('path');
const fileUpload = require('express-fileupload')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
    

const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start()