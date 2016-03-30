/**
 * Created by ziwen.xu on 2016/3/30.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	//User data model
	username:{type:String},
	email:{type:String},
	avatar: {type:String}
});

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;