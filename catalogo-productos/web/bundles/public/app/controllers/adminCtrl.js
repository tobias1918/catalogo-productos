app.controller('AdminController', function($scope, $http) {

    //CREATE 
    $scope.newProduct = {
        name: '',
        image: '',
        category_id: ''
    };
    $scope.newCategory = {
        name: '',
        icon: ''
    };

     //EDIT
     $scope.editProduct = {
        id: '',
        name: '',
        image: '',
        category_id: ''
    };
    $scope.editCategory = {
        id: '',
        name: '',
        icon: ''
    };

    //MESSAGES
    $scope.errorMessage = '';
    $scope.successMessage = '';
    $scope.successMessageDelete='';
    $scope.errorMessageDelete='';
    $scope.successMessageEdit = '';
    $scope.errorMessageEdit = '';


    //DELETE
    $scope.idProduct='';
    $scope.deleteProduct = {
        id:''
    }

    // CARGAR CATEGORIAS 
    $http.get('http://localhost/catalogo-productos/web/category')
        .then(function(response) {
            $scope.categories = response.data;
        })
        .catch(function(error) {
            console.error('Error al obtener categorías:', error);
        });

    //ELIMINAR PRODUCTOS
    $scope.deleteProduct = function(productId) {
        $http.delete('http://localhost/catalogo-productos/web/product/' + productId)
            .then(function(response) {
                    $scope.successMessageDelete = 'Producto eliminado correctamente';
                    $scope.errorMessageDelete = '';
            })
            .catch(function(error) {
                    console.error('Error al eliminar producto:', error);
                    $scope.errorMessageDelete = 'Ya fue eliminado o error interno';
                    $scope.successMessageDelete = '';
            });
    };
        

    // CREAR PRODUCTO
    $scope.createProduct = function() {
        console.log('entre', $scope.newProduct.name,$scope.newProduct.category_id);
        if ($scope.newProduct.name && $scope.newProduct.image && $scope.newProduct.category_id) {
            $http.post('http://localhost/catalogo-productos/web/product/new', $scope.newProduct)
                .then(function(response) {
                    $scope.errorMessage = '';
                    $scope.successMessage = 'Producto cargado correctamente';
                    // Limpiar el formulario después de crear el producto
                    $scope.newProduct = {
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

    //CATEGORY

    //CREAR CATEGORIA
    $scope.createCategory = function() {
        console.log($scope.newCategory.name,$scope.newCategory.icon);
        if ($scope.newCategory.name && $scope.newCategory.icon) {
            console.log($scope.newCategory)
            $http.post('http://localhost/catalogo-productos/web/category/new', $scope.newCategory)
                .then(function(response) {
                    $scope.errorMessageCategory = '';
                    $scope.successMessageCategory = 'Category cargado correctamente';
   
                    console.log('entre aca'+ $scope.successMessageCategory)
                    // Limpiar el formulario después de crear el producto
                    $scope.newCategory = {
                        name: '',
                        icon: ''
                    };
                })
                .catch(function(error) {
                    console.error('Error al crear producto:', error);
                    $scope.successMessageCategory = '';
                    $scope.errorMessageCategory = 'Error al crear el producto. Inténtalo de nuevo.';
                 
                });
        } else {
            $scope.errorMessageCategory = 'Todos los campos son obligatorios.';
            $scope.successMessageCategory = '';
        }
    };


    // ELIMINAR CATEGORIA
    $scope.deleteCategory = function(categoryId) {
        $http.delete('http://localhost/catalogo-productos/web/category/' + categoryId)
            .then(function(response) {
                    $scope.successMessageDelete = 'Categoria eliminada correctamente';
                    $scope.errorMessageDelete = '';
                    window.location.reload();
            })
            .catch(function(error) {
                    console.error('Error al eliminar producto:', error);
                    $scope.errorMessageDelete = 'Ya fue eliminado o error interno';
                    $scope.successMessageDelete = '';
            });
    };

   



});
