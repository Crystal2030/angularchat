/**
 * Created by crystal on 3/30/16.
 */

angular.module('chatModule').controller('MessageCreatorController', function($scope, socket){
    $scope.newMessage = '';
    $scope.createMessage = function(){
        if($scope.newMessage == ''){
            return;
        }
        socket.emit('createMessage', $scope.newMessage);
        $scope.newMessage = '';
    }
});