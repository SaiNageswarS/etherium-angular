'use strict';

angular.module('bookme')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', function($scope, $location, $firebaseObject,
             EtheriumService) { 
    $scope.isLoading = false;

    var ref = firebase.database().ref().child("accounts");
    $scope.serverAccounts = $firebaseObject(ref);

    $scope.accounts = [];
    var etheriumConnection = null;
    $scope.ether = {
      etheriumServer: "http://localhost:8545",
      etheriumAccountId: "",
      passphrase: ""
    };

    $scope.login = function() {
      etheriumConnection.setDefaultAccount($scope.ether.etheriumAccountId,
                          $scope.ether.passphrase);
      $location.path("/contracts")
    };

    $scope.getAccounts = function() {
      if($scope.ether.etheriumServer) {
        etheriumConnection = EtheriumService.getConnection($scope.ether.etheriumServer);
        $scope.accounts = etheriumConnection.getAccounts();
      }
    };
  
});