/**
 * Created by crystal on 4/1/16.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var msgSchema = new mongoose.Schema({
    //message data model
    content:{type:String},
    creator:{
        _id: ObjectId,
        email: String,
        username: String,
        avatar: String
    },
    createAt:{type: Date, default: Date.now}
});

var msgModel = mongoose.model('message', msgSchema);

module.exports = msgModel;