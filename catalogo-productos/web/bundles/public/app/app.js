'use strict';

let app = angular.module('appAngular', [
    'ui.router'
]);

//CONTROLADOR DE RUTAS GENERAL
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'bundles/public/views/home.html',
            controller: 'HomeController',
            controllerAs: 'home',
            resolve: {
                auth: function($q, $state, loginService) {
                    if (loginService.getRole() === 'admin' || loginService.getRole() === 'user') {
                        return $q.resolve();
                    } else {
                        return $q.reject('Not authorized');
                    }
                }
            }
            
        })
        .state('product', {
            url: '/product/:id',
            templateUrl: 'bundles/public/views/product.html',
            controller: 'ProductController',
            controllerAs: 'product',
            resolve: {
                auth: function($q, $state, loginService) {
                    if (loginService.getRole() === 'admin') {
                        return $q.resolve();
                    } else if (loginService.getRole() === 'user'){
                        return $q.resolve();
                    } else{
                        $state.go('login');
                    }
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'bundles/public/views/login.html',
            controller: 'loginController',
            controllerAs: 'login'  
        })
        .state('register', {
            url: '/register',
            templateUrl: 'bundles/public/views/register.html',
            controller: 'RegisterController',
            controllerAs: 'register'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'bundles/public/views/admin.html',
            controller: 'AdminController',
            controllerAs: 'admin',
            resolve: {
                auth: function($q, $state, loginService) {
                    if (loginService.getRole() === 'admin') {
                        return $q.resolve();
                    } else if (loginService.getRole() === 'user'){
                        $state.go('home');
                    } else{
                        $state.go('login');
                    }
                }
            }
        })
        .state('editProduct', {
            url: '/edit/product/:id',
            templateUrl: 'bundles/public/views/editProduct.html',
            controller: 'EditController',
            resolve: {
                auth: function($q, $state, loginService) {
                    if (loginService.getRole() === 'admin') {
                        return $q.resolve();
                    } else if (loginService.getRole() === 'user'){
                        $state.go('home');
                    } else{
                        $state.go('login');
                    }
                }
            }
        })
        .state('editCategory', {
            url: '/edit/category/:id',
            templateUrl: 'bundles/public/views/editCategory.html',
            controller: 'EditCategory',
            resolve: {
                auth: function($q, $state, loginService) {
                    if (loginService.getRole() === 'admin') {
                        return $q.resolve();
                    } else if (loginService.getRole() === 'user'){
                        $state.go('home');
                    } else{
                        $state.go('login');
                    }
                }
            }
        })
        .state('direccionar', {
            url: '/direccionar',
            resolve: {
                auth: function($q, $state, loginService) {
                    if (loginService.getRole() === 'admin') {
                        $state.go('admin');
                    } else if (loginService.getRole() === 'user'){
                        $state.go('home');
                    } else{
                    }
                }
            }
        })
    
    

    $urlRouterProvider.otherwise('/login');
});


//AUTORIZACION
app.run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'Not authorized') {
            $state.go('login');
        }
    });
});

//FUNCION CERRAR SESION
app.run(function($rootScope, $state) {
    $rootScope.logout = function() {
        localStorage.removeItem('userRole'); // Eliminar userRole del localStorage
        $state.go('login'); // Redirigir al estado de login
    };
});



//MOVIMIENTO DINAMICO ENTRE PAGINAS
app.run(function($rootScope, $window) {
    $rootScope.$on('$viewContentLoaded', function() {
        $window.scrollTo(0, 0); 
    });
});

//RECORTAR PALABRAS PARA SIMPLIFICAR LA VISTA
app.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        } else {
            return String(text).substring(0, length-end.length) + end;
        }
    };
});

