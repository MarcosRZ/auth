angular.module('myApp')
.service('authService', ['SatellizerConfig', 'jwtHelper', function(config, jwtHelper){
    
    var identity;

    var subscribers = []

    function subscribe(s){
        subscribers.push(s);
    }

    function checkRole(toState, token){

        if (!identity) return false;

        if (identity.admin === true) {console.log("admin access granted"); return true;}

        for (var i = 0; i < toState.allowedRoles.length; i++){
            if (toState.allowedRoles[i] === 'user'){
                console.log("identity ["+(identity.admin) ? "admin" : "user"+"] allowed", toState.allowedRoles);
                return true
            }
        }
    
        return false;
    };

    var getToken = function(){

        var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;

        return localStorage.getItem(tokenName);
    }

    var setIdentity = function(){

        var i = null;

        var token = getToken();

        if (token) 
            i = jwtHelper.decodeToken(token);

        identity = i;

        notify();
    }

    function notify(){
        for (var i = 0; i < subscribers.length; i++){
            subscribers[i](identity);
        }
    }

    var getIdentity = function(){
        return identity;
    }

    setIdentity();

    return { 
        
        // Gets the incoming state and checks if user is logged in,
        // and if it has an allowed role to access it
        checkAuthAndRole: function(toState){

            
            var token = getToken();

            if (!token) {console.log("token not present"); return false;}

            // Checking token expiration
            if (jwtHelper.isTokenExpired(token)) { console.log("token expired");return false;}

            // Checking if identity implements any allowed role
            return checkRole(toState, token);
        },

        hasRole: function(role){ return; },

        setIdentity: setIdentity,

        getIdentity: getIdentity,

        subscribe: subscribe
    }

}])
