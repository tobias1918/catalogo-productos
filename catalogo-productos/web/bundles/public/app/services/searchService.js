app.service('searchService', function($http) {
    this.searchProducts = function(query) {
        return $http.get('http://localhost/catalogo-productos/web/product/search', { params: { name: query } });
    };

    this.getAllProducts = function() {
        return $http.get('http://localhost/catalogo-productos/web/product');
    };
});
