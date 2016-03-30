/**
 * Created by ziwen.xu on 2016/3/30.
 */
angular.module('chatModule').controller('LoginController', function($scope, $http, $location){
	$http({
		url:'/login',
		method: 'POST',
		data:{
			email: $scope.email
		}
	}).success(function(user){
		$scope.$emit('login', user);
		$location.path('/');
	}).error(function(data){
		$location.path('/login');
	})
});