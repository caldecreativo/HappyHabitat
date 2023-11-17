const express = require ('express')
const mongoose = require ('mongoose')
const router = require('./src/routes/router')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')

dotenv.config()

const app = express()

app.use(express.json());

app.use(router)

app.use(express.json())

app.use(cors(
    {
    origin: "*"
    }
))

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
      },
    })
  );

mongoose.connect(process.env.MONGO_ENDPOINT).then(() => {
    console.log('server connected, port8081')
    app.listen(8081)
})
