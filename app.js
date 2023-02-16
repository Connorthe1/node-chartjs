const express = require('express')
const PORT = process.env.PORT || 5000
const chartRouter = require('./chartRouter')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
app.use("/chart", chartRouter)


const start = async () => {
    try{
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()