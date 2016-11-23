'use strict';

angular.module('bookme')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contracts', {
    templateUrl: 'app/contracts/contracts.html',
    controller: 'contractsCtrl'
  });
}])

.controller('contractsCtrl', ContractsCtrl)
.controller('addContractDialogCtrl', AddContractDialogCtrl);

/**
 * Roles: ImporterBank, Exporter, PortAuthority, Trucker, Customs
 */

function ContractsCtrl($scope, $location, $mdPanel, EtheriumService, 
    $firebaseObject, $firebaseArray, Contract) { 
    console.log(Contract);
    var currentEther = EtheriumService.getCurrentInstance();

    var contractsRef = firebase.database().ref().child("contracts");
    $scope.contracts = $firebaseArray(contractsRef);
    
    $scope.contracts.$loaded().then(function() {
        $scope.totalContractVal = 0;
        angular.forEach($scope.contracts, 
            function(contract){
                if (contract.value && contract.portAuthorityApproved &&
                        contract.truckerApproved && contract.customsApproved) {
                    $scope.totalContractVal += parseInt(contract.value); 
                }
            });
    });

    if(!currentEther) {
        $location.path("/login");
        return;
    }
    var currentAccountId = currentEther.accountId;

    var ref = firebase.database().ref().child("accounts/" + currentAccountId);
    $scope.user = $firebaseObject(ref);

    $scope.addContractDialog = function($event) {
        var position = $mdPanel.newPanelPosition().absolute().center();
        var config = {
            attachTo: angular.element(document.body),
            controller: AddContractDialogCtrl,
            controllerAs: 'ctrl',
            disableParentScroll: true,
            templateUrl: 'app/contracts/addContracts.html',
            hasBackdrop: true,
            panelClass: 'demo-dialog-example',
            position: position,
            trapFocus: true,
            zIndex: 50,
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: true
        };
        $mdPanel.open(config);
    };

    $scope.roleAuthorityApproval = {
        Trucker: "truckerApproved",
        ImporterBank: "importerBankApproved",
        Customs: "customsApproved",
        PortAuthority: "portAuthorityApproved"
    };
    $scope.approvals = Object.keys($scope.roleAuthorityApproval);

    $scope.saveContract = function(contract) {
        $scope.contracts.$save(contract);
    };
}

function AddContractDialogCtrl(mdPanelRef, $scope, $firebaseObject,
                                    $firebaseArray, $mdToast){
    $scope.contract = {
        name: "",
        supplier: "",
        value: "",
        bank: "",
        portAuthorityApproved: false,
        truckerApproved: false,
        customsApproved: false
    };

    var contractsRef = firebase.database().ref().child("contracts");
    $scope.contracts = $firebaseArray(contractsRef);

    var accountsRef = firebase.database().ref().child("accounts");
    $scope.accounts = $firebaseObject(accountsRef);

    $scope.addContract = function() {
        $scope.contracts.$add($scope.contract);
        
        $mdToast.show(
            $mdToast.simple()
                .textContent('Contract Added!')
                .position('top right')
                .hideDelay(3000)
            );

        mdPanelRef.close();
    };
};

angular.module('bookme').filter('with', function() {
  return function(accounts, role) {
        var result = {};
        angular.forEach(accounts, function(desc, accountId) {
            if (desc["role"] === role) {
                result[accountId] = desc;
            }
        });
        return result;
    };
});