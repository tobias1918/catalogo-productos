'use strict';

app.factory('loginService', ['$http', '$window', function($http, $window) {
    let loginService = {};

    loginService.login = function(credentials) {
        
        return $http.post('http://localhost/catalogo-productos/web/user/getCredential', credentials)
            .then(function(response) {
        
                // Almacenar el rol en el localStorage
                if (response.data.success) {
                    $window.localStorage.setItem('userRole', response.data.role);
                }
                return response.data;
            })
            .catch(function(error) {

                // Devuelve un objeto estándar con error
                return {
                    success: false,
                    error: 'Datos invalidos, Por favor intentelo nuevamente.'
                };
            });
    };

    loginService.getRole = function() {
        return $window.localStorage.getItem('userRole');
    };

    loginService.clearRole = function() {
        $window.localStorage.removeItem('userRole');
    };

    return loginService;
}]);
