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
	run(function($window, $rootScope, $http, $location){
		$http({
			url: '/validate',
			method: 'GET'
		}).success(function(user){
			//如果用户已登录，服务端返回用户信息，客户端把用户信息保存到全局作用域中$rootScope.curUser中
			if(user){
				$rootScope.curUser = user;
				$location.path('/');
			}
		}).error(function(data){
			$location.path('/login');
		});

		$rootScope.logout = function(){
			$http({
				url:'/logout',
				method:'GET'
			}).success(function(){
				$rootScope.curUser = null;
				$location.path('/login');
			})
		};
		//当用户通过登录页成功登录后，将用户信息发送给启动模块，更新$rootScope的用户信息；
		$rootScope.$on('login', function (evt, curUser) {
			$rootScope.curUser = curUser;
		})

	});










