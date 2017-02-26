(function () {
    'use strict';

    angular.module('Autosure.controllers')
        .controller('ModalAlertCtrl', ['$scope', '$uibModalInstance', 'message', function ($scope, $uibModalInstance, message) {

            $scope.message = message;

            $scope.ok = function () {
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };


        }]);

}());