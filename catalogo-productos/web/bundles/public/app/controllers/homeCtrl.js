'use strict';

app.controller('HomeController',function(HomeFactory){

    let vm = this;

    vm.productos=[];
    HomeFactory.getProducts().then(function(data){
        vm.productos= data;
    })

})