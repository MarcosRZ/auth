// var app = angular.module("myApp", [])

var app = angular.module("myApp", ["satellizer", "ui.router"])
    .config(function($authProvider, $stateProvider, $httpProvider) {

      

      console.log($authProvider)
        // Parametros de configuración
        $authProvider.loginUrl = "http://localhost:3000/auth/login";
        $authProvider.signupUrl = "http://localhost:3000/auth/signup";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "myApp",

        // Configuración de las rutas/estados
        $stateProvider
            .state("home", {
                url: "",
                templateUrl: "views/index.html",
                controller: "HomeController"
            })
            .state("slash", {
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
                controllerAs: "private",
                allowedRoles: ['admin']
            })
            .state("404", {
              url: "*path",
              templateUrl: "views/404.html"
            })

          // Configuracion del interceptor que añade la cabecera Authorization
          $httpProvider.interceptors.push(['$q', function($q) {
            var tokenName = $authProvider.SatellizerConfig.tokenPrefix ? $authProvider.SatellizerConfig.tokenPrefix + '_' + $authProvider.SatellizerConfig.tokenName : $authProvider.SatellizerConfig.tokenName;
            return {
              request: function(httpConfig) {
                var token = localStorage.getItem(tokenName);
                if (token && $authProvider.SatellizerConfig.httpInterceptor) {
                  token = $authProvider.SatellizerConfig.authHeader === 'Authorization' ? 'Bearer ' + token : token;
                  httpConfig.headers[$authProvider.SatellizerConfig.authHeader] = token;
                }
                return httpConfig;
              },
              responseError: function(response) {
                return $q.reject(response);
              }
            };
          }]);
      
    })
    .run(function($rootScope, $location, $state, authService) {
        $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams
                                                      , fromState, fromParams) {
            console.log(toState)

            if (!toState.allowedRoles || toState.allowedRoles.length == 0)
              return;

            if (!authService.checkAuthAndRole(toState)){
              e.preventDefault();
              $state.go("login")
            }
        });
    });
/*
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
    */
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
