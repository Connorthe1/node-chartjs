const Router = require('express')
const router = new Router()
const controller = require('./chartController')

router.post('/', controller.test);

module.exports = router;