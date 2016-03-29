/**
 * Created by crystal on 3/29/16.
 */
angular.module('chatModule', []);

angular.module('chatModule').factory('socket', function($rootScope){
    var socket = io.connect('/');
    /*socket.on('connect', function () {
        console.log('Connected to angularchat');
    }); */
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
            socket.on(eventName, data, function(){
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


angular.module('chatModule').controller('RoomController', function($scope, socket){
    $scope.messages = [];
    socket.emit('getAllMessages');
    socket.on('allMessages', function(messages){
        $scope.messages = messages;
    });
    socket.on('messageAdded', function(message){
        $scope.messages.push(message);
        console.log('messageAdded', messages);
    });
});

angular.module('chatModule').controller('MessageCreatorController', function($scope, socket){
    $scope.newMessage = '';
    $scope.createMessage = function(){
        if($scope.newMessage == ''){
            return;
        }
        socket.emit('createMessage', $scope.newMessage);
        console.log($scope.newMessage);
        $scope.newMessage = '';
    }
});


angular.module('chatModule').directive('ctrlEnterBreakLine', function(){
    return function(scope, element, attrs){
        var flag = false;
        element.bind('keydown', function(event){
            if(event.which === 17){//ctrl
                flag = true;
                setTimeout(function(){
                    flag = false;
                },1000);
            }
            if(event.which === 13){//enter
                if(flag){
                    element.val(element.val() + '\n');
                }else{
                    scope.$apply(function(){
                        scope.$eval(attrs.ctrlEnterBreakLine);
                    });
                    event.preventDefault();
                }
            }
        })
    }
})




