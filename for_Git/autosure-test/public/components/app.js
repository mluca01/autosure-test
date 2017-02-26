(function () {
    'use strict';

    (function () {
        var Autosure = angular.module('Autosure', ['Autosure.controllers', 'Autosure.services', 'ui.router', 'lbServices', 'ngSanitize', 'ui.select', 'ui.bootstrap', 'angularModalService', 'ui.bootstrap.showErrors', 'checklist-model']);

        Autosure.config(function ($stateProvider, $urlRouterProvider, $httpProvider, LoopBackResourceProvider, showErrorsConfigProvider) {
            LoopBackResourceProvider.setAuthHeader('X-Access-Token');
            // LoopBack REST API server
            LoopBackResourceProvider.setUrlBase('https://autosure.mybluemix.net/api');

            $httpProvider.interceptors.push('RetryInterceptor');
            $httpProvider.interceptors.push('ResponseInterceptor');
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            showErrorsConfigProvider.showSuccess(true);

            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'components/views/home.html'
                })
                .state('services', {
                    url: '/services',
                    templateUrl: 'components/views/services.html',
                    controller: 'ServiceCtrl',

                })
                .state('policies', {
                    url: '/policies/:value',
                    templateUrl: 'components/views/policies.html',
                    controller: 'PolicyCtrl',
                    /*
                    resolve: {
                        value: ['$stateParams', function ($stateParams) {
                            return $stateParams.value;
                        }]
                    }
                    */

                })
                .state('register', {
                    url: '/register/:name/:amount',
                    templateUrl: 'components/views/register.html',
                    controller: 'RegisterCtrl',

                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: 'components/views/contact.html',
                    controller: 'ContactCtrl'
                });

        });

        angular.module('Autosure.controllers', []);
        angular.module('Autosure.services', []);

    })();

}());