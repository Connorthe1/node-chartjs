const express = require('express')
const router = express.Router()
const controller = require('./chartController')

router.post('/test', controller.test);

module.exports = router;