(function () {
    'use strict';

    angular.module('Autosure.controllers')
        .controller('ServiceCtrl', ['$scope', '$http', '$window', '$state', '$location', '$filter', '$uibModal', 'PromiseUtils', 'ItemsMake', 'Makes', 'Models', 'SharedService', function ($scope, $http, $window, $state, $location, $filter, $uibModal, PromiseUtils, ItemsMake, Makes, Models, SharedService) {

            $scope.make = {};
            $scope.model = {};
            $scope.years = SharedService.years();

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
                    console.log('Test');
                });

            };

            $scope.openModal = openModal;

            /* Using $http
                function getCarMake() {
                    ItemsMake.all()
                        .then(function (result) {
                        $scope.makeDetails = result.data;
                    });
                }
            
                $scope.getCarMake = getCarMake;
                getCarMake();
            */

            $scope.makeDetails = Makes.find();

            $scope.model.selected = {};
            $scope.modelDetails = {};
            $scope.carSelection = [];
            $scope.carValue = {};
            $scope.yearSelected = '';
            $scope.modelSelection = '';
            $scope.submitted = '';
            $scope.message = '';

            $scope.currentYear = $filter('date')(new Date(), "yyyy");
            console.log("Current Year: " + $scope.currentYear);

            $scope.onSelectCallback = function (selectedItem) {
                $scope.model.selected = '';
                $scope.itemSelected = selectedItem;
                console.log('Selected: ' + $scope.itemSelected);

                if ($scope.itemSelected !== null || $scope.itemSelected.length !== 0) {
                    /* Cross-Origin Request Blocked error
                    $scope.carSelection = Models.find({
                            filter: {
                                where: {
                                    car_make: $scope.itemSelected
                                }
                            }
                        },
                        function (list) {
                            $scope.modelResults = list;
                            if ($scope.modelResults.length === 0) {
                                $window.alert('No model for the selected car make. Please select again');

                            }
                            console.log("Results: " + JSON.stringify($scope.modelResults));
                        },
                        function (err) {
                            $scope.errorResponse = err;
                        }
                    );
                    */
                    var requestPromise_Model = $http({
                        method: 'GET',
                        url: 'https://autosure.mybluemix.net/api/models?filter={%22where%22:{%22car_make%22:%22' + $scope.itemSelected + '%22}}',
                    });

                    PromiseUtils.getPromiseHttpResult(requestPromise_Model).then(function (data) {
                        $scope.modelResults = data;
                        console.log("Results: " + JSON.stringify($scope.modelResults));
                        if ($scope.modelResults.length === 0) {
                            //$window.alert('No model for the selected car make. Please select again');
                            $scope.message = 'No model for the selected car make. Please select again.';
                            openModal($scope.message);

                        }
                        //console.log("Results: " + JSON.stringify($scope.modelResults));
                    });
                }
            };

            $scope.onSelectCallback2 = function (selectedItem) {
                $scope.itemSelected = selectedItem;
                console.log('Selected: ' + $scope.itemSelected);

                if ($scope.itemSelected === null || $scope.itemSelected.length === 0) {
                    //$window.alert("Please select a year");
                    $scope.message = 'Please select a year.';
                    openModal($scope.message);
                } else {
                    $scope.modelSelection = $scope.itemSelected;
                }
            };

            $scope.onSelectYear = function (selectedItem) {
                $scope.yearSelected = selectedItem;
                //console.log('Selected: ' + $scope.itemSelected);
                $scope.submitted = $scope.currentYear - $scope.yearSelected;
                console.log('Year diff: ' + $scope.submitted);

                if ($scope.submitted > 10) {
                    //$window.alert('If you want to cover a vehicle more than 10 years please contact admin@autosure.me');
                    $scope.message = 'If you want to cover a vehicle more than 10 years please contact admin@autosure.me.';
                    openModal($scope.message);
                    return false;
                } else {
                    var requestPromise = $http({
                        method: 'GET',
                        url: 'https://autosure.mybluemix.net/api/compute?data={%22year%22:' + $scope.yearSelected + ',%22value%22:' + $scope.modelSelection + '}',
                    });

                    PromiseUtils.getPromiseHttpResult(requestPromise).then(function (data) {
                        $scope.carValue = data;
                        console.log('Details: ' + JSON.stringify($scope.carValue));
                    });
                }
            };

            $scope.submitQuote = function (value) {
                $scope.carval = value;
                console.log('in submit: ' + $scope.carval);
                $scope.submitted = $scope.currentYear - $scope.yearSelected;
                if (($scope.yearSelected === '' || $scope.yearSelected == '-- Select --' || typeof $scope.yearSelected === 'undefined') || $scope.model.selected === '' || typeof $scope.model.selected === 'undefined' || $scope.make.selected === '' || typeof $scope.make.selected === 'undefined') {
                    //$window.alert('Please complete the form.');
                    $scope.message = 'Please complete the form.';
                    openModal($scope.message);
                    //return false;
                } else {
                    if ($scope.submitted > 10) {
                        //$window.alert('If you want to cover a vehicle more than 10 year old please contact admin@autosure.me');
                        $scope.message = 'If you want to cover a vehicle more than 10 years please contact admin@autosure.me.';
                        openModal($scope.message);
                        //return false;
                    } else {
                        console.log("Year: " + $scope.yearSelected + " Model: " + JSON.stringify($scope.model.selected) + " Make: " + JSON.stringify($scope.make.selected));
                        $state.go('policies', {
                            value: $scope.carval
                        });
                    }

                }

            };
        }]);

}());