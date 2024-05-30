'use strict';

app.factory('ProductFactory', function($http) {

    let ProductFactory = {
        getUser: function(id) {
            let url = 'http://localhost/catalogo-productos/web/product/' + id;
            return $http.get(url)
                .then(function(response) {
                    console.log(response.data);
                    return response.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    };

    return ProductFactory;

});
