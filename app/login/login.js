'use strict';

angular.module('bookme')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', function($scope, $location, EtheriumService) { 
    $scope.isLoading = false;

    $scope.accounts = [];
    var etheriumConnection = null;
    $scope.ether = {
      etheriumServer: "http://localhost:8545",
      etheriumAccountId: "",
      passphrase: ""
    };

    $scope.login = function() {
      $scope.isLoading = true;
      
    };

    $scope.getAccounts = function() {
      if($scope.ether.etheriumServer) {
        etheriumConnection = EtheriumService.getConnection($scope.ether.etheriumServer);
        $scope.accounts = etheriumConnection.getAccounts();
      }
    };
  
});