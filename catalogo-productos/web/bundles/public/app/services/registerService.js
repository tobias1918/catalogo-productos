'use strict';

app.factory('registerService', ['$http', function($http) {
    let registerService = {};

    registerService.createUser = function(usuario) {
        console.log('Sending registration request with:', usuario);
        return $http.post('http://localhost/catalogo-productos/web/user/new', usuario)
            .then(function(response) {
                console.log('Registration successful:', response.data);
                return response.data;
            })
            .catch(function(error) {
                console.log('Registration failed:', error);
                // Devuelve el error del servidor
                return {
                    success: false,
                    error: error.data.error || 'Datos invalidos, Por favor intentelo nuevamente.'
                };
            });
    };

    return registerService;
}]);
