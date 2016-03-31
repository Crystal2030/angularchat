/**
 * Created by crystal on 3/30/16.
 */
angular.module('chatModule').controller('RoomController', function($scope, socket){
    $scope.messages = [];
    socket.emit('getAllMessages')
    socket.on('allMessage', function (messages) {
        $scope.messages = messages
    })
    socket.on('messageAdded', function (message) {
        console.log('*****************');
        $scope.messages.push(message)
    })
});