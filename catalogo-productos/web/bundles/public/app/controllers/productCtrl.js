'use strict';

app.controller('ProductController', function($stateParams, ProductFactory) {
    let vm = this;
    vm.productId = $stateParams.id;

    //LISTAR PRODUCTOS
    ProductFactory.getUser(vm.productId).then(function(data) {
        console.log(data);
        vm.producto = data;
    }).catch(function(error) {
        console.log(error);
    });
});
