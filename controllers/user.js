/**
 * Created by ziwen.xu on 2016/3/30.
 */
var userModel = require("../models/user");
var gravatar = require('gravatar')


exports.findById = function(userId, callback){
	userModel.findById({_id: userId}, callback);
};

//use email to find user, if not find, use this email to create a new account
exports.reg = function(email, callback){
	userModel.findOne({email: email}, function(err, doc){
		if(doc){
			callback(null, doc);
		}else{
			doc = new userModel;
			doc.username = email.split('@')[0];
			doc.email = email;
			user.avatarUrl = gravatar.url(email);
			doc.save(callback);
		}
	})
}