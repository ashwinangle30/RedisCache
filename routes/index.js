var express = require('express');
var router = express.Router();
//var cache = require('express-redis-cache')(); 

/* GET home page. */
router.get('/',	function(req, res, next) {
  res.render('index', { title: 'Redis Cache Driver Page' });
});

module.exports = router;
