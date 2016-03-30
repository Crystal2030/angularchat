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
            otherwise({
                redirectTo: '/'
            })
    });








