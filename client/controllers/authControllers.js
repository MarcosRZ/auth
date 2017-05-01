angular  
    .module("myApp")
    .controller("SignUpController", ["authService",SignUpController])
    .controller("LoginController", LoginController)
    .controller("LogoutController", LogoutController)
    .controller("PrivateController", PrivateController)
    .controller("HomeController", HomeController); 

function SignUpController($auth, $location, authService) {  
    var vm = this;
    
    vm.email = "";
    vm.passhash = "";
    vm.repeat = "";
    vm.error = "";
    
    this.signup = function() {

        if (vm.email === ""){
            vm.error = "Email is empty"
            return;
        }

        if (vm.passhash.length < 6){
            vm.error = "Password must be at least 6 chars long";
            return;
        }

        if (!(vm.passhash === vm.repeat)){
            vm.error = "Passwords does not match";
            return;
        }

            console.log(this.passhash + " == " + this.repeat)

        $auth.signup({
            email: vm.email,
            passhash: vm.passhash,
            active: true,
            admin: false
        })
        .then(function() {
            // Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte

            
            $location.path("/private");
        })
        .catch(function(response) {
            // Si ha habido errores, llegaremos a esta función
        });
    }
}

function LoginController($scope, $auth, $location, authService) {  
    var vm = this;

    vm.error = "";

    this.login = function(){
        $auth.login({
            email: vm.email,
            passhash: vm.password
        })
        .then(function(){
            // Si se ha logueado correctamente, lo tratamos aquí.
            // Podemos también redirigirle a una ruta

            // Emitir evento login
            authService.setIdentity()
            $location.path("/private")
        })
        .catch(function(response){
            // Si ha habido errores llegamos a esta parte
            vm.error = response.data.message;
            console.log("ERROR:", vm.error)
            return;
        });
    }
}

function LogoutController($scope, $auth, $location, authService) {  
    $auth.logout()
        .then(function() {
            // Desconectamos al usuario y lo redirijimos

            // Emitir evento logout
            
            authService.setIdentity()
            $location.path("/login")
        });
}

function PrivateController($scope) {  

}

function HomeController($scope) {  

}
