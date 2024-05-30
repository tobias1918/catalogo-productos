'use strict';

app.controller('RegisterController', ['$state', 'registerService', function($state, registerService) {
    let vm = this;

    vm.usuario = {
        username: '',
        email: '',
        password: ''
    };

    vm.errorMessage = '';

    //CREAR USUARIO
    vm.crearUsuario = function() {
        if (vm.usuario.password.length <= 5) {
            vm.errorMessage = 'La contraseña debe tener más de 5 caracteres.';
            return;
        }

        console.log('Attempting to register with:', vm.usuario);
        registerService.createUser(vm.usuario).then(function(data) {
            console.log('Response from registerService:', data);
            if (data.success) {
                // Manejar el caso de éxito
                console.log('Registration successful, redirecting...');
                $state.go('login');
            } else {
                // Manejar el caso de error
                console.log('Registration failed:', data.error);
                vm.errorMessage = data.error || 'Error desconocido';
            }
        }).catch(function(error) {
            console.error('An error occurred:', error);
            vm.errorMessage = 'An error occurred during registration. Please try again.';
        });
    };
}]);
