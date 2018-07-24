var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {res.send('Fish')})
router.get('/fish2', function (req, res) {res.send("Fish2")})

module.exports = router
