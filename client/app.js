// var app = angular.module("myApp", [])
angular.module("myApp", ["satellizer", "ui.router", "angular-jwt"])
    .config(function($authProvider, $stateProvider, $httpProvider) {

      

      console.log($authProvider)
        // Parametros de configuración
        $authProvider.loginUrl = "http://192.168.0.23:3000/auth/login";
        $authProvider.signupUrl = "http://192.168.0.23:3000/auth/signup";
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
            .state("user", {
              url: '/user',
              templateUrl: "views/user.html",
              allowedRoles: ["user"]
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
            if (!toState.allowedRoles || toState.allowedRoles.length == 0)
              return;

            if (!authService.checkAuthAndRole(toState)){
              e.preventDefault();
              $state.go("login")
            }
        });
    });