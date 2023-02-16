const express = require('express')
const serverless = require('serverless-http')
const PORT = process.env.PORT || 5000
// const chartRouter = require('./chartRouter')
const controller = require('./chartController')
const bodyParser = require('body-parser')


const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

router.get('/', (req, res) => {
    res.json({
        'hello': 'hi!'
    })
})
router.post('/test', controller.test)


app.use("/.netlify/functions/app", router)

// const start = async () => {
//     try{
//         app.listen(PORT, () => console.log(`server started on port ${PORT}`))
//     } catch (e) {
//         console.log(e)
//     }
// }
//
// start()
module.exports = app;
module.exports.handler = serverless(app)
