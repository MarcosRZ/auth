angular.module('myApp')
.controller('IdentityController', ['$scope', 'authService', function($scope, authService){

    authService.subscribe(function(identity){
        $scope.identity = identity;
    })

    $scope.identity = authService.getIdentity();

}])

// Escuchar eventos login y logout.
