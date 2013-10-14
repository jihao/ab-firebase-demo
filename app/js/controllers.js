'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('ListCtrl', ['$scope', '$location', 'angularFire', 'fbURL', 'Users', function ListCtrl($scope, $location, angularFire, fbURL, Users) {
        $scope.users = Users;
        $scope.destroy = function (userId) {
            var itemRef = new Firebase(fbURL + userId);
            itemRef.remove();
        };
    }])
    .controller('CreateCtrl', ['$scope', '$location', '$timeout', 'Users', function CreateCtrl($scope, $location, $timeout, Users) {
        $scope.save = function () {
            Users.add($scope.user, function () {
                $timeout(function () {
                    $location.path('/');
                });
            });
        }

    }])
    .controller('EditCtrl', ['$scope', '$location', '$routeParams', 'angularFire', 'fbURL', function EditCtrl($scope, $location, $routeParams, angularFire, fbURL) {
        angularFire(fbURL + $routeParams.userId, $scope, 'remote', {}).
            then(function () {
                $scope.user = angular.copy($scope.remote);
                $scope.user.$id = $routeParams.userId;
                $scope.isClean = function () {
                    return angular.equals($scope.remote, $scope.user);
                }
                $scope.destroy = function () {
                    $scope.remote = null;
                    $location.path('/');
                };
                $scope.save = function () {
                    $scope.remote = angular.copy($scope.user);
                    $location.path('/');
                };
            });
    }]);