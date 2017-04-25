var app = angular.module("myApp", [])


 
app.config(['$httpProvider', 'satellizer.config', function($httpProvider, config) {
      $httpProvider.interceptors.push(['$q', function($q) {
        var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
        return {
          request: function(httpConfig) {
            var token = localStorage.getItem(tokenName);
            if (token && config.httpInterceptor) {
              token = config.authHeader === 'Authorization' ? 'Bearer ' + token : token;
              httpConfig.headers[config.authHeader] = token;
            }
            return httpConfig;
          },
          responseError: function(response) {
            return $q.reject(response);
          }
        };
      }]);
    }])

angular.module("myApp", ["satellizer", "ui.router"])
    .config(function($authProvider, $stateProvider) {
        // Parametros de configuración
        $authProvider.loginUrl = "http://localhost:3000/auth/login";
        $authProvider.signupUrl = "http://localhost:300/auth/signup";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "myApp",

        // Configuración de las rutas/estados
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "views/index.html",
                controller: "HomeController"
            })
            .state("login", {
                url: "/login",
                templateUrl: "views/login.html",
                controller: "LoginController",
                controllerAs: "login"
            })
            .state("signup", {
                url: "/signup",
                templateUrl: "views/signup.html",
                controller: "SignUpController",
                controllerAs: "signup"
            })
            .state("logout", {
                url: "/logout",
                templateUrl: null,
                controller: "LogoutController"
            })
            .state("private", {
                url: "/private",
                templateUrl: "views/private.html",
                controller: "PrivateController",
                controllerAs: "private"
            });


      
    })
/*
angular.module('myApp', [])   
    .config(['$httpProvider', 'satellizer.config', function($httpProvider, config) {
      $httpProvider.interceptors.push(['$q', function($q) {
        var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
        return {
          request: function(httpConfig) {
            var token = localStorage.getItem(tokenName);
            if (token && config.httpInterceptor) {
              token = config.authHeader === 'Authorization' ? 'Bearer ' + token : token;
              httpConfig.headers[config.authHeader] = token;
            }
            return httpConfig;
          },
          responseError: function(response) {
            return $q.reject(response);
          }
        };
      }]);
    }]);
*/
