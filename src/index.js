/**
 * Created by crystal on 3/29/16.
 */
angular.module('chatModule', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider.
            when('/room',{
                templateUrl: '/templates/room.tpl.html',
                controller: 'RoomController'
            }).
	        when('/login', {
		        templateUrl: '/templates/login.tpl.html',
		        controller: 'LoginController'
	        }).
            otherwise({
                redirectTo: '/room'
            })
    }).
	run(function($rootScope, $http, $location, validator){
		//validate user
		validator.then(function(user) {//  成功
			$location.path('/');
		}, function(data) {//失败
			$location.path('/login');
		});

		//当用户通过登录页成功登录后，将用户信息发送给启动模块，更新$rootScope的用户信息；
		$rootScope.$on('login', function (evt, me) {
			$rootScope.me = me
		});

		$rootScope.$on('logout', function (evt, me) {
			$rootScope.me = null;
		});

	});










