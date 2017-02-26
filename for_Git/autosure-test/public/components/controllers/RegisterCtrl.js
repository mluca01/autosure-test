(function () {
    'use strict';

    angular.module('Autosure.controllers')
        .controller('RegisterCtrl', ['$scope', '$http', '$state', '$stateParams', '$window', '$location', '$uibModal', 'PromiseUtils', 'ModalService', function ($scope, $http, $state, $stateParams, $window, $location, $uibModal, PromiseUtils, ModalService) {

            $scope.name = $stateParams.name;
            console.log("Selected Policy: " + $scope.name);
            $scope.insuredAmount = $stateParams.amount;
            console.log("Insured Amount: " + $scope.insuredAmount);

            $scope.countryDetails = [];
            $scope.returnMessage = '';
            $scope.user = {};

            function openModal() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/views/modalAlert.html',
                    controller: 'ModalAlertCtrl',
                    windowClass: 'custom-modal',
                    //size: 'sm',
                    resolve: {
                        message: function () {
                            return $scope.message;
                        }
                    }

                });

                modalInstance.result.then(function () {
                    //$scope.message = message;
                }, function () {
                    //console.log('Test');
                });

            }

            $scope.openModal = openModal;

            var requestPromise_Register = $http({
                method: 'GET',
                //url: 'components/data/countries.json',
                url: 'https://restcountries.eu/rest/v1/all'
            });

            PromiseUtils.getPromiseHttpResult(requestPromise_Register).then(function (data) {
                $scope.countryDetails = data;
                console.log('Country list: ' + JSON.stringify($scope.countryDetails));
            });

            $scope.submitDetails = function () {
                $scope.$broadcast('show-errors-check-validity');
                if (typeof $scope.firstName === 'undefined' || $scope.firstName === '' || $scope.firstName.length === 0 || typeof $scope.lastName === 'undefined' || $scope.lastName === '' || $scope.lastName.length === 0 || typeof $scope.emailAdd === 'undefined' || $scope.emailAdd === '' || $scope.emailAdd.length === 0 || typeof $scope.address === 'undefined' || $scope.address === '' || $scope.address.length === 0 || typeof $scope.city === 'undefined' || $scope.city === '' || $scope.city.length === 0 || typeof $scope.zip === 'undefined' || $scope.zip === '' || $scope.zip.length === 0 || $scope.item === '' || $scope.item.length === 0) {
                    $scope.message = 'Please complete the missing fields.';
                    openModal($scope.message);
                } else {
                    $scope.returnMessage = 'Thanks for sending your information to us, we will get back to you shortly';
                }
            };

            $scope.viewPolicy = function () {
                ModalService.showModal({
                    templateUrl: 'components/views/modalViewPolicy.html',
                    controller: 'ModalViewPolicyCtrl',
                    inputs: {
                        title: 'Selected Policy',
                        policyName: $scope.name,
                        amount: $scope.insuredAmount

                    },
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function () {

                    });
                });


            };

        }]);

}());