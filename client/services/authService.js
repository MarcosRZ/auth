angular.module('myApp')
.factory('authService', ['SatellizerConfig', function(config){

    return { 
        
        // Gets the incoming state and checks if user is logged in,
        // and if it has an allowed role to access it
        checkAuthAndRole: function(toState){

            console.log("toState", toState)
            if (!toState.allowedRoles || toState.allowedRoles.length == 0) {
                console.log("This state has NO authentication")
                return true;
            }

            var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;

            console.log(tokenName);

            var token = localStorage.getItem(tokenName);

            if (!token || token === "") {
                console.log("There's no token at LS");
                return false;
            }

            console.log("Token present.")

            // TODO: Implement Token Validation and Role checking
            
            return true;
        }
    }
}])