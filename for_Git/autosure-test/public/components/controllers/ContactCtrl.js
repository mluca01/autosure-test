(function () {
    'use strict';

    angular.module('Autosure.controllers')
        .controller('ContactCtrl', ['$scope', '$http', '$state', '$stateParams', '$uibModal', function ($scope, $http, $state, $stateParams, $uibModal) {

            $scope.submitMessage = function (contact) {
                $scope.name = contact;

                if (typeof $scope.contactName === 'undefined' || $scope.contactName === '' || $scope.contactName.length === 0 || typeof $scope.emailAdd === 'undefined' || $scope.emailAdd === '' || $scope.emailAdd.length === 0 || $scope.subject === '' || typeof $scope.subject === 'undefined' || $scope.subject.length === 0 || typeof $scope.contactMessage === 'undefined' || $scope.contactMessage === '' || $scope.contactMessage.length === 0) {
                    $scope.message = 'Please complete all fields.';
                    openModal($scope.message);

                } else {
                    $scope.message = 'Thank you for contacting us, ' + $scope.name + ' - we will get back to you soon. Thank you.';
                    openModal($scope.message);
                }
            };

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
                    //$log.info('Modal dismissed at: ' + new Date());
                    //console.log('Test');
                });

            }

            $scope.openModal = openModal;

        }]);

}());