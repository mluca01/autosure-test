(function () {
    'use strict';

    angular.module('Autosure.services')

    .constant('ENDPOINT_URI', 'https://autosure.mybluemix.net/api/')

    // Makes using $http
    .service('ItemsMake', function ($http, ENDPOINT_URI) {
        var service = this,
            path = 'makes/';

        function getUrl() {
            return ENDPOINT_URI + path;
        }

        service.all = function () {
            return $http.get(getUrl());
        };
    })

    .service('PolicyCTPL', function ($http, ENDPOINT_URI) {
        var service = this,
            path = 'policies/ctpl';

        function getUrl() {
            return ENDPOINT_URI + path;
        }

        service.all = function () {
            return $http.get(getUrl());
        };
    })

    .service('PolicyComprehensive', function ($http, ENDPOINT_URI) {
        var service = this,
            path = 'policies/comprehensive';

        function getUrl() {
            return ENDPOINT_URI + path;
        }

        service.all = function () {
            return $http.get(getUrl());
        };
    })

    .service('PolicyFull', function ($http, ENDPOINT_URI) {
        var service = this,
            path = 'policies/full';

        function getUrl() {
            return ENDPOINT_URI + path;
        }

        service.all = function () {
            return $http.get(getUrl());
        };
    })

    .factory('PolicyCost', function ($http, ENDPOINT_URI) {
        var path = 'cost/';
        return function (value) {
            return $http({
                method: 'GET',
                url: ENDPOINT_URI + path + '?data={%22value%22:' + value + '}'
            });

        };
    })

    .factory('SharedService', function () {
        var padding = '0';
        var yr = new Date().getFullYear();
        var range = [];
        range.push(yr);
        for (var i = 1; i < 22; i++) {
            range.push(yr - i);
        }

        var d = $.map($(Array(31)), function (val, i) {
            i = i + 1;
            var num = parseInt(i, 10);
            num = '' + num;

            while (num.length + padding.length < length) {
                padding += padding;
            }
            return padding.substr(0, length - num.length) + num;
        });

        var addon = [
            'Uber Assitance', 'Roadside Assistance', 'Hotel Assistance'
        ];

        return {
            years: function () {
                return range;
            },
            addons: function () {
                return addon;
            },
        };
    })

    .filter('selectFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function (item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                out = items;
            }

            return out;
        };
    })

    .directive('uiSelectRequired', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.uiSelectRequired = function (modelValue, viewValue) {
                    return modelValue && modelValue.length;
                };
            }
        };
    });

    /*
    .directive('showErrors', function () {
        return {
            restrict: 'A',
            require: '^form',
            link: function (scope, el, attrs, formCtrl) {
                var inputEl = el[0].querySelector("[name]");
                var inputNgEl = angular.element(inputEl);
                var inputName = inputNgEl.attr('name');

                inputNgEl.bind('blur', function () {
                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
                });
            }
        };
    });
    */

}());