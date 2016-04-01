var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../controllers/user');
var md5 = require('../utils/md5');

/* GET users listing. */
router.get('/validate', function(req, res) {
	var userId = req.session.userId;
	if(userId){
		User.findUserById(userId, function(err, user){
			//check where the user login or not
			if(err){
				res.json(401, {msg: err});
			}else{
				res.json(user);
			}
		})
	}else{
		res.json(401, null);
	}
});

//regsiter
router.post('/login', function(req, res){
	var email = req.body.email;
	if(email){
		User.reg(email, function(err, user){
			if(err){
				res.json(500, {msg: err});
			}else{
				req.session.userId = user._id;
				User.online(user._id, function(err, user){
					if(err){
						res.json(500, {msg: err});
					}else{
						res.json(user);
					}
				})
			}
		})
	}else{
		res.json(403);
	}
});

router.get('/logout', function(req, res){
	var userId = req.session.userId;
	User.offline(userId, function(err, user){
		if(err){
			res.json(500, {msg: err});
		}else{
			res.json(200);
			delete req.session.userId;
		}
	})
})

module.exports = router;
