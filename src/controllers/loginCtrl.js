/**
 * Created by ziwen.xu on 2016/3/30.
 */
angular.module('chatModule').controller('LoginController', function($scope, $http, $location){
	$scope.login = function () {
		$http({
			url: '/users/login',
			method: 'POST',
			data: {
				email: $scope.email
			}
		}).success(function (user) {
			$scope.$emit('login', user)
			$location.path('/')
		}).error(function (data) {
			$location.path('/login')
		})
	}
});