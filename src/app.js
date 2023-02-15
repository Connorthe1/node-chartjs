const express = require('express')
const serverless = require('serverless-http')
const PORT = process.env.PORT || 5000
const chartRouter = require('./chartRouter')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
app.use("/.netlify/chart", chartRouter)

const start = async () => {
    try{
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
module.exports.handler = serverless(app)
