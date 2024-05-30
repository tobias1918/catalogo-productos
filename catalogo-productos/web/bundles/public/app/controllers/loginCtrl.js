'use strict';

app.controller('loginController', ['$state', 'loginService', function($state, loginService) {
    let vm = this;  // Usar 'vm' para hacer referencia al 'view model'

    vm.credentials = {
        username: '',
        password: ''
    };

    vm.errorMessage = '';

    //LOGUEO CON RUL USER O ADMIN
    vm.login = function() {
        loginService.login(vm.credentials).then(function(data) {
            console.log('Response from loginService:', data);
            if (data.success) {
                if (data.role === 'admin') {
                    $state.go('home');
                } else {
                    $state.go('home');
                }
            } else {
                vm.errorMessage = data.error || 'Error desconocido';
            }
        }).catch(function(error) {
            console.error('An error occurred:', error);
            vm.errorMessage = 'An error occurred during login. Please try again.';
        });
    };
}]);
