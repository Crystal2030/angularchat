/**
 * Created by crystal on 3/30/16.
 */
angular.module('chatModule').factory('socketService', function($rootScope){
    var socket = io.connect('http://'+window.location.host);
    return {
        on: function(eventName, callback){
            socket.on(eventName, function(){
                var args = arguments;
                //用$rootScope检查整个应用数据状态，如果有变化就更新index.html中的绑定
                $rootScope.$apply(function(){
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback){
            socket.emit(eventName, data, function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    if(callback){
                        callback.apply(socket, args);
                    }
                })
            })
        }
    }
});