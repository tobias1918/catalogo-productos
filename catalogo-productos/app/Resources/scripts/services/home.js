'use strict';

app.factory('HomeFactory',function($http){

    let url = 'http://localhost/catalogo-productos/web/product';

    let HomeFactory = {
        getUsers: function() {
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        createUsers: function() {
            // Implementar la lógica para crear usuarios aquí
        }
    };

    return HomeFactory;

});