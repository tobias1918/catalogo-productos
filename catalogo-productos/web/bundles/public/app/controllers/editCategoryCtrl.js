app.controller('EditCategory', function($scope,$stateParams, $http) {

    let vm = this;
    vm.productId = $stateParams.id;;
    console.log(vm.productId);
    console.log('hola')

    $scope.category={
        'name':'',
        'icon':''
    }

    $scope.updateCategory={
        'name':'',
        'icon':''
    }

    $scope.successMessage='';

    //DATOS ANTERIORES A ACTUALIZAR
    $http.get('http://localhost/catalogo-productos/web/category/'+vm.productId)
    .then(function(response) {
        console.log(response.data);
        $scope.category.name = response.data.name;
        $scope.category.icon = response.data.icon;
        console.log($scope.category.name);
        console.log($scope.category.name);
    })
    .catch(function(error) {
        console.error('Error al obtener product:', error);
    });

    //ACTUALIZAR CATEGORIA
    $scope.actualizarCategory=function(){
        console.log($scope.updateCategory);
        if ($scope.updateCategory.name && $scope.updateCategory.icon) {
            $http.put('http://localhost/catalogo-productos/web/category/'+ vm.productId +'/edit', $scope.updateCategory)
                .then(function(response) {
                    window.location.reload();
                   console.log('Producto actualizado correctamente');
                    $scope.successMessage='Producto cargado correctamente';
                     // Limpiar el formulario después de crear el producto
                    $scope.updateCategory = {
                        name: '',
                        icon: ''
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
