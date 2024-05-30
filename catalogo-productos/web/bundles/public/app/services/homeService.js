'use strict';

app.factory('HomeFactory',function($http){

    let url = 'http://localhost/catalogo-productos/web/product';
    
    let HomeFactory = {
        getProducts: function() {
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
      
    };

    return HomeFactory;

});