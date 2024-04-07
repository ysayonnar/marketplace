const express = require('express')
const cors = require('cors')
const path = require('path');
const fileUpload = require('express-fileupload')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
