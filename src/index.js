/**
 * Created by crystal on 3/29/16.
 */
angular.module('chatModule', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider.
            when('/',{
                templateUrl: '/templates/room.tpl.html',
                controller: 'RoomController'
            }).
	        when('/login', {
		        templateUrl: '/templates/login.tpl.html',
		        controller: 'LoginController'
	        }).
            otherwise({
                redirectTo: '/'
            })
    }).
	run(function($rootScope, $http, $location, validator){
		//validate user
		validator.then(function(user){
			$location.path('/');
		},function(reason) {//失败
			$location.path('/login');
		});

		//当用户通过登录页成功登录后，将用户信息发送给启动模块，更新$rootScope的用户信息；
		$rootScope.$on('login', function (evt, me) {
			$rootScope.me = me
		})

	});










