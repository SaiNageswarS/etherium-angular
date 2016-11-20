'use strict';

angular.module('bookme')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', function($scope, $location) { 
    $scope.isLoading = false;

    $scope.ether = {
      etheriumServer: "http://localhost:8545",
      etheriumAccountId: "0x12dw23dfsdf2sdadasasda31",
      passphrase: ""
    };

    $scope.login = function() {
      $scope.isLoading = true;
      
    };
  
});