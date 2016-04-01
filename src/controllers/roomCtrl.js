/**
 * Created by crystal on 3/30/16.
 */
angular.module('chatModule').controller('RoomController', function($scope, socketService){
    socketService.on('roomData', function(room){
        $scope.room = room;
    });
    socketService.on('messageAdded', function (message) {
        $scope.room.messages.push(message);
    });
    socketService.emit('getRoom');

});