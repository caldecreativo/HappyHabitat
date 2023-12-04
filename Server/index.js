const express = require ('express')
const mongoose = require ('mongoose')
const router = require('./src/routes/router')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser');

dotenv.config()

const app = express()

app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
})

app.use(express.json());

app.use(cors({
  credentials: true,
    origin:["http://localhost:8081", "http://localhost:8080" ]
}))

app.use(router)

app.use(express.json())


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
