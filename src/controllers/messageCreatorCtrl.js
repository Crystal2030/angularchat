/**
 * Created by crystal on 3/30/16.
 */

angular.module('chatModule').controller('MessageCreatorController', function($rootScope, $scope, socketService){
    $scope.newMessage = '';
    $scope.createMessage = function(){
        if($scope.newMessage){
            socketService.emit('createMessage',{
                content: $scope.newMessage,
                creator: $rootScope.me,
                createAt: new Date()
            });
            $scope.newMessage = '';
        }
    }
});