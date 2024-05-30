'use strict';

app.controller('HomeController',function(HomeFactory){

    let vm = this;

    vm.users=[];

    HomeFactory.getUsers().then(function(data){
        console.log(data);
    })

})