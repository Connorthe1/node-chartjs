const Router = require('express')
const router = new Router()
const controller = require('./chartController')

router.post('/test', controller.test);

module.exports = router;