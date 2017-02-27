(function () {
    'use strict';

    angular.module('Autosure.controllers')
        .controller('PolicyCtrl', ['$scope', '$http', '$state', '$stateParams', '$window', '$location', 'PromiseUtils', 'SharedService', 'PolicyCTPL', 'PolicyComprehensive', 'PolicyFull', 'PolicyCost', 'localStorageService', function ($scope, $http, $state, $stateParams, $window, $location, PromiseUtils, SharedService, PolicyCTPL, PolicyComprehensive, PolicyFull, PolicyCost, localStorageService) {

            $scope.costValue = $stateParams.value;
            localStorageService.set('localStorageKey', $scope.costValue);
            //$scope.costValue = localStorageService.get('localStorageKey');
            console.log("Cost value: " + $scope.costValue);
            $scope.insuredAmount = {};

            // 2017.02.22 update
            $scope.ctpl = {};
            $scope.comprehensive = {};
            $scope.full = {};
            $scope.coverageSize = 7;
            $scope.coverageCtpl = [];
            $scope.insuredAmountComp = '';
            $scope.insuredAmountFull = '';

            $scope.addons1 = SharedService.addons();
            $scope.addons2 = SharedService.addons();
            $scope.addons3 = SharedService.addons();

            function getPolicyDetails() {
                PolicyCTPL.all()
                    .then(function (result) {
                        //$scope.ctpl = result.data;
                        $scope.coverageCtpl = result.data.coverage;
                        $scope.nameCTPL = result.data.policy;
                        console.log('CTPL coverage: ' + JSON.stringify($scope.coverageCtpl));
                        $scope.insuredAmountCTPL = 625;
                        /*
                        $scope.coverageEmpty1 = [];
                        var count = $scope.coverageSize - $scope.coverageCtpl.length;

                        for (var i = 0; i < count; i++) {
                            $scope.coverageEmpty1.push({

                            });
                        }
                        */
                    });
                PolicyComprehensive.all()
                    .then(function (result) {
                        //$scope.comprehensive = result.data;
                        $scope.coverageComprehensive = result.data.coverage;
                        $scope.nameComp = result.data.policy;
                        console.log('Comprehensive: ' + JSON.stringify($scope.coverageComprehensive));
                        $scope.coverageEmpty2 = [];

                        PolicyCost($scope.costValue)
                            .success(function (data) {
                                $scope.insuredAmountComp = data.cost;
                            });


                    });
                PolicyFull.all()
                    .then(function (result) {
                        //$scope.full = result.data;
                        $scope.coverageFull = result.data.coverage;
                        $scope.nameFull = result.data.policy;
                        console.log('Full: ' + JSON.stringify($scope.coverageFull));

                        PolicyCost($scope.costValue)
                            .success(function (data) {
                                $scope.insuredAmountFull = (data.cost) + 3000;
                            });

                    });
            }

            $scope.getPolicyDetails = getPolicyDetails;
            getPolicyDetails();


            $scope.getAddOns1 = function () {
                return $scope.policy1.addons1;
            };

            $scope.getAddOns2 = function () {
                return $scope.policy2.addons2;
            };

            $scope.getAddOns3 = function () {
                return $scope.policy3.addons3;
            };


            $scope.policy1 = {
                addons1: ['']
            };

            $scope.policy2 = {
                addons2: ['']
            };

            $scope.policy3 = {
                addons3: ['']
            };

            $scope.checkCTPL = function (value, checked) {
                var idx = $scope.policy1.addons1.indexOf(value);
                var addonCost = 200;
                if (idx >= 0 && !checked) {
                    $scope.policy1.addons1.splice(idx, 1);
                    $scope.insuredAmountCTPL = $scope.insuredAmountCTPL - addonCost;
                }
                if (idx < 0 && checked) {
                    $scope.policy1.addons1.push(value);
                    var items = $scope.policy1.addons1;
                    for (var i = 0; i < items.length; i++) {
                        if (value.id == items[i].id) {
                            $scope.insuredAmountCTPL = $scope.insuredAmountCTPL + addonCost;
                            return true;
                        }

                    }
                    return false;
                }
            };

            $scope.checkComp = function (value, checked) {
                var idx = $scope.policy2.addons2.indexOf(value);
                var addonCost = 200;
                if (idx >= 0 && !checked) {
                    $scope.policy2.addons2.splice(idx, 1);
                    $scope.insuredAmountComp = $scope.insuredAmountComp - addonCost;
                }
                if (idx < 0 && checked) {
                    $scope.policy2.addons2.push(value);
                    var items = $scope.policy2.addons2;
                    for (var i = 0; i < items.length; i++) {
                        if (value.id == items[i].id) {
                            $scope.insuredAmountComp = $scope.insuredAmountComp + addonCost;
                            return true;
                        }

                    }
                    return false;
                }
            };

            $scope.checkFull = function (value, checked) {
                var idx = $scope.policy3.addons3.indexOf(value);
                var addonCost = 200;
                if (idx >= 0 && !checked) {
                    $scope.policy3.addons3.splice(idx, 1);
                    $scope.insuredAmountFull = $scope.insuredAmountFull - addonCost;
                }
                if (idx < 0 && checked) {
                    $scope.policy3.addons3.push(value);
                    var items = $scope.policy3.addons3;
                    for (var i = 0; i < items.length; i++) {
                        if (value.id == items[i].id) {
                            $scope.insuredAmountFull = $scope.insuredAmountFull + addonCost;
                            return true;
                        }

                    }
                    return false;
                }
            };

        }]);

}());