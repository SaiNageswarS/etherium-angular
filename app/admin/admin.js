'use strict';

angular.module('bookme')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'app/admin/admin.html',
    controller: 'adminCtrl'
  });
}])

.controller('adminCtrl', function($scope, $location, $firebaseObject,
                             EtheriumService) { 
    var ref = firebase.database().ref().child("accounts");
    var syncObject = $firebaseObject(ref);
    /* 
    * 3 way binding between angular, view and firebase
    */
    syncObject.$bindTo($scope, "accounts");

    $scope.eth = {host: "http://localhost:8545"};
    $scope.syncAccounts = function() {
        if ($scope.eth.host) {
            var etheriumConnection = EtheriumService.getConnection($scope.eth.host);
            var accountsLocal = etheriumConnection.getAccounts();
            accountsLocal.forEach(function(acc) { 
                if (!$scope.accounts[acc]) {
                    var accDetails = {
                        host: $scope.eth.host,
                        role: "Exporter"
                    };
                    $scope.accounts[acc] = accDetails; 
                }
            });
        }
    };
});