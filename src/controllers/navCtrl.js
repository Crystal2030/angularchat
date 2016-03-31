/**
 * Created by crystal on 3/31/16.
 */
angular.module('chatModule').controller('NavController', function($scope, $http, $location){
    $scope.logout = function(){
        $http({
            url:'/users/logout',
            method: 'GET'
        }).success(function(user){
            $scope.$emit('logout');
            $location.path('/login');
        }).error(function(){
            $location.path('/login');
        })
    }
});