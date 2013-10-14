'use strict';

/* Filters */

angular.module('myApp.filters', []).
    filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]).
    filter('keepsafe', [function () {
        return function (text) {
            return String(text).replace(/(\d{3})(\d{4})(\d*)/mg, '$1****$3');
        }
    }]);
