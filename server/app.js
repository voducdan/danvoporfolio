const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

const indexRouter = require('./routes/index')
const postRouter = require('./routes/post')

app.use(cors())
app.use(bodyParser.json())
app.use('/', indexRouter)
app.use('/posts', postRouter)

app.use(express.static(__dirname + './client/public'))
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
