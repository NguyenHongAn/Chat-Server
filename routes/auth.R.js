var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   res.send("<h1> Chat App Server </h1>");
});

module.exports = router;
