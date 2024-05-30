app.controller('EditController', function($scope,$stateParams, $http) {
    // Inicializar el scope
    let vm = this;
    vm.productId = $stateParams.id;;
    console.log(vm.productId);
    console.log('hola')

    $scope.product={
        'name':'',
        'image':'',
        'category':''
    }

    $scope.updateProduct={
        'name':'',
        'image':'',
        'category_id':''
    }

    // PEDIR CATEGORIAS PARA USAR EN LA ACTUALIZACION DE PRODUCT
    $http.get('http://localhost/catalogo-productos/web/category')
    .then(function(response) {
        $scope.categories = response.data;
    })
    .catch(function(error) {
        console.error('Error al obtener categorías:', error);
    });

    //DATOS ANTERIOR A ACTUALIZAR
    $http.get('http://localhost/catalogo-productos/web/product/'+vm.productId)
    .then(function(response) {
        console.log(response.data[0].category[1]);
        $scope.product.name = response.data[0].name;
        $scope.product.image = response.data[0].image;
        $scope.product.category = response.data[0].category[1];
        console.log($scope.product);
    })
    .catch(function(error) {
        console.error('Error al obtener product:', error);
    });

    //ACTUALIZAR PRODUCTO
    $scope.actualizarProducto=function(){
        console.log($scope.updateProduct);
        if ($scope.updateProduct.name && $scope.updateProduct.image && $scope.updateProduct.category_id) {
            $http.put('http://localhost/catalogo-productos/web/product/'+ vm.productId +'/edit', $scope.updateProduct)
                .then(function(response) {
                    window.location.reload();
                   console.log('Producto actualizado correctamente');
                    // Limpiar el formulario después de crear el producto
                    $scope.updateProduct = {
                        name: '',
                        image: '',
                        category_id: ''
                    };
                })
                .catch(function(error) {
                    console.error('Error al crear producto:', error);
                    $scope.successMessage = '';
                    $scope.errorMessage = 'Error al crear el producto. Inténtalo de nuevo.';
                 
                });
        } else {
            $scope.errorMessage = 'Todos los campos son obligatorios.';
            $scope.successMessage = '';
        }
    };


  

});
