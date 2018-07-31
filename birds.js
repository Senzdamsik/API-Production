var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {res.send('Birds')})
router.get('/birds2', function (req, res) {res.send('Birds 2')})

module.exports = router

//lalalalalalalallalalal


