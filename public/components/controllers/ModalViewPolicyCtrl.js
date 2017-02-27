(function () {
    'use strict';

    angular.module('Autosure.controllers')
        .controller('ModalViewPolicyCtrl', ['$scope', '$element', '$http', 'PromiseUtils', 'close', 'title', 'policyName', 'amount', 'localStorageService', function ($scope, $element, $http, PromiseUtils, close, title, policyName, amount, localStorageService) {

            $scope.title = title;
            $scope.policy = policyName;
            $scope.amount = amount;

            $scope.policyDetails = {
                "PIDs": {
                    "ctpl": [
                        {
                            "type": "Compulsory Third Party Liability (CTPL) Coverage",
                            "description": "A mandatory for all vehicle. This coverage, subject to the limits of liability, will answer for the death, disablement and medical expenses of a person injured because of an accident involving your vehicle.",
                            "coverage1": "This is the basic insurance coverage required. There are two kinds of Third Party Liability: Bodily Injury (BI) and Property Damage (PD) and in this case, the policy will only effect if the injury or damage was of course caused by the operation of the insured’s motor vehicle."
                        }
                    ],

                    "comprehensive": [
                        {
                            "type": "Comprehensive Car Insurance",
                            "description": "Comprehensive car insurance with all your basic coverage needs PLUS FREE additional benefits.",
                            "coverage1": "Provides protection against accidental loss and damage to the vehicle due to: accidental collision and overturning, fire and lightning, explosion, theft and burglary; self ignition and malicious acts by third parties.",
                            "coverage2": "Covers Legal Liabilities for third parties in case of death or bodily injury; physical damage to properties arising for the use of the insured vehicle, and (3) Comes with FREE additional benefits."
                        }
                    ],

                    "full": [
                        {
                            "type": "Comprehensive Car Insurance with Acts of Nature Coverage",
                            "description": "Most complete car insurance with all your basic coverage needs PLUS Acts of Nature (AON)* coverage and it also comes with FREE additional benefits.",
                            "coverage1": "Provides protection against accidental loss and damage to the vehicle due to: accidental collision and overturning, fire and lightning, explosion, theft and burglary; self ignition and malicious acts by third parties.",
                            "coverage2": "It also covers liabilities arising from damage to someone else's vehicle or property, and bodily injury or death to a third party."
                        }
                    ],

                }
            };


            $scope.results = [];

            function displayPolicy(policyName) {
                console.log('ID: ' + policyName);
                angular.forEach($scope.policyDetails.PIDs, function (value, key) {
                    if (key === policyName) {
                        $scope.results.push({
                            id: key,
                            type: value[0].type,
                            description: value[0].description,
                            coverage1: value[0].coverage1,
                            coverage2: value[0].coverage2
                        });
                    }
                });
            }

            $scope.displayPolicy = displayPolicy;
            displayPolicy(policyName);

            var requestPromise_Policy = $http({
                method: 'GET',
                url: 'https://autosure.mybluemix.net/api/policies/' + $scope.policy,
            });

            PromiseUtils.getPromiseHttpResult(requestPromise_Policy).then(function (data) {
                $scope.policyResults = data;
                console.log("Results: " + JSON.stringify($scope.policyResults));
                if ($scope.policyResults.length === 0) {
                    //$window.alert('No model for the selected car make. Please select again');
                    $scope.message = 'No model for the selected car make. Please select again.';
                    openModal($scope.message);

                }

            });

            $scope.closeModal = function () {
                $element.modal('hide');
                close(null, 500);
            };

        }]);

}());