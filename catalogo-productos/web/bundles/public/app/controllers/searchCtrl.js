'use.strict';

app.controller('SearchController', function($scope, $http) {
    $scope.searchQuery = '';
    $scope.searchResults = [];


    //MANEJO DE BUSQUEDA DINAMICA DE PRODUCTOS
    $scope.handleSearchQueryChange = function() {
        if ($scope.searchQuery.length >= 2) {
            // Realizar la solicitud HTTP para buscar productos
            $http.get('http://localhost/catalogo-productos/web/product/search/product', { params: { name: $scope.searchQuery } })
                .then(function(response) {
                    $scope.searchResults = response.data;
                })
                .catch(function(error) {
                    console.error('Error al buscar productos:', error);
                });
        } else {
            // Si la longitud de la búsqueda es menor que 2, obtener todos los productos
            $http.get('http://localhost/catalogo-productos/web/product')
                .then(function(response) {
                    $scope.searchResults = response.data;
                })
                .catch(function(error) {
                    console.error('Error al obtener todos los productos:', error);
                });
        }
    };

    // Ejecutar la función para obtener todos los productos al cargar la página
    $scope.handleSearchQueryChange();
});
