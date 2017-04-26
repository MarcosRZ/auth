angular.module('myApp')
.factory('authService', ['satellizer.config', function(config){

    return { 
        
        // Gets the incoming state and checks if user is logged in,
        // and if it has an allowed role to access it
        checkAuthAndRole: function(toState){

            if (!toState.allowedRoles || toState.allowedRoles.length == 0)
                return true;

            var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;

            console.log(tokenName);

            var token = localStorage.getItem(tokenName);

            if (!token || token === "")
                return false;

            return true;
        }
    }
}])