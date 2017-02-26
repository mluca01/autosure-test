(function () {
    'use strict';

    angular.module('Autosure.services')

    .factory('ResponseInterceptor', function ($q, $location, $window) {
        return {
            // On request success
            request: function (config) {
                //console.log(config); 
                return config || $q.when(config);
            },

            // On request failure
            requestError: function (rejection) {
                console.log(rejection);
                if (rejection.status === 503) {
                    //$location.path('/503');
                    $window.location.reload();
                }
                return $q.reject(rejection);
            },

            // On response success
            response: function (response) {
                //console.log(response);   
                return response || $q.when(response);
            },

            // On response failture
            responseError: function (rejection) {
                console.log(rejection);
                return $q.reject(rejection);
            }
        };
    })

    .factory('RetryInterceptor', ['$q', '$injector', function ($q, $injector) {
        return {
            responseError: function (res) {
                if (res.status !== 503) {
                    return $q.reject(res);
                }
                if (res.config.retry) {
                    res.config.retry++;
                } else {
                    res.config.retry = 1;
                }
                if (res.config.retry > 5) {
                    return $q.reject(res);
                }
                return $injector.get('$http')(res.config);
            }
        };
    }])

    .service('PromiseUtils', function ($q) {
        return {
            getPromiseHttpResult: function (httpPromise) {
                var deferred = $q.defer();
                httpPromise.success(function (data) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject(arguments);
                });
                return deferred.promise;
            }
        };
    });

}());