'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['firebase', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
    value('fbURL', 'https://addressbook.firebaseio.com/').
    factory('Users',function (angularFireCollection, fbURL) {
        return angularFireCollection(fbURL);
    }).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/list', {templateUrl: 'partials/list.html', controller: 'ListCtrl'});
        $routeProvider.when('/edit/:userId', {templateUrl: 'partials/detail.html', controller: 'EditCtrl'});
        $routeProvider.when('/new', {templateUrl: 'partials/detail.html', controller: 'CreateCtrl'});
        $routeProvider.otherwise({redirectTo: '/list'});
    }]);
