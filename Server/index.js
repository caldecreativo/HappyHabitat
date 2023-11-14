const express = require ('express')
const mongoose = require ('mongoose')
const router = require('./src/routes/router')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(express.json());

app.use(router)

mongoose.connect(process.env.MONGO_ENDPOINT).then(() => {
    console.log('server connected, port8081')
    app.listen(8081)
})
