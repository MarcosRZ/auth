angular.module('myApp')
.factory('authService', ['SatellizerConfig', function(config){

    return { 
        
        // Gets the incoming state and checks if user is logged in,
        // and if it has an allowed role to access it
        checkAuthAndRole: function(toState){

            var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;

            var token = localStorage.getItem(tokenName);

            if (!token || token === "") return false;

            // TODO: Implement Token Validation and Role checking
            
            return true;
        },

        isLoggedIn: function() { return; },

        hasRole: function(role){ return; }
    }
}])