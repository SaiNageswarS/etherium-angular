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

function ContractsCtrl($scope, $location, $mdPanel, EtheriumService, 
    $firebaseObject, Contract) { 
    console.log(Contract);
    var currentEther = EtheriumService.getCurrentInstance();

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
            zIndex: 150,
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: true
        };
        $mdPanel.open(config);
    };
}

function AddContractDialogCtrl($scope){
    $scope.contract = {
        name: "",
        supplier: "",
        value: "",
        bank: ""
    };

    $scope.approvals = [
        {name: "Trucker", wanted: true},
        {name: "PortAuthority", wanted: true},
        {name: "CustomsAuthority", wanted: true}        
    ];
};