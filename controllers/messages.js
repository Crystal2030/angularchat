/**
 * Created by crystal on 4/1/16.
 */
var msgModel = require("../models/message");

exports.create = function(message, callback){
    msgModel.create({
        content: message.content,
        creator: message.creator
    }, callback);
};

exports.read = function(callback){
    msgModel.find({}, null, {
        sort:{
            'createAt': -1
        },
        limit: 10
    }, callback);
}
