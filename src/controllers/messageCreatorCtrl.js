/**
 * Created by crystal on 3/30/16.
 */

angular.module('chatModule').controller('MessageCreatorController', function($rootScope, $scope, socket){
    $scope.newMessage = '';
    $scope.createMessage = function(){
        if($scope.newMessage){
            socket.emit('createMessage',{
                content: $scope.newMessage,
                creator: $rootScope.me,
                createAt: new Date()
            });
            $scope.newMessage = '';
        }
    }
});