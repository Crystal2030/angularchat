var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'ChatRoom' });
	res.sendFile(path.resolve(__dirname,'..','src','index.html'));
});

module.exports = router;
