/**
 * Created by ziwen.xu on 2016/3/30.
 */
var crypto = require('crypto');

exports.md5 = function(value){
	return crypto.createHash('md5').update(value).digest('hex');
}
