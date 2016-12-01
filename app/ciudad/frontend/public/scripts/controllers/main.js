'use strict';

/**
 * @ngdoc function
 * @name todoListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoListApp
 */

angular.module('DomoHouse')
  .controller('MainCtrl', function ($scope,$mdSidenav,$timeout,$mdDialog,$http,$mdToast,$location,netConfig) {
    
    $scope.socket= io.connect('http://'+netConfig.ip+':'+netConfig.port);


  /*declaration*/      
     /*componente preloader*/
     $scope.preloader={
        hidden:false,
     };
     /*componente navegador de opciones*/
     $scope.optionsSideNav = {
       hidden:true,
       close:function(){
         $mdSidenav('options').close();
       },
       toggle:function(){            

            var context = $scope,wait=100,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            var timer = $timeout(function() {

              timer = undefined;
              $mdSidenav('options').open();              

            },wait); 

       },
       refresh:function(){
            window.location.reload(); 
       }
     };

     
     /*componente formulario de creación de dispositivoss*/
     $scope.openDeviceMakerForm = function($event){
          $mdDialog.show({  
            targetEvent: $event,
            templateUrl:"views/deviceForm.html",
            controller: "DeviceMakerCtrl"
          }).then(function(resp){
              
              //agregar al arreglo
              $scope.houses.push(resp);

              //enviar objetos a través de sockets
              $scope.socket.emit('agregar_casa',$scope.houses);

              $mdToast.show(
                $mdToast.simple()
                .content("Nueva casa agregada")
                .hideDelay(3000)
              );
          },function(){});
     };


     $scope.goToHouse=function(url){
      window.location.href=url;
     }

  //--------------------------------------------------------------

      
    /*lista de casas*/


     //{name:"",img:"",ip:}
    $scope.houses=[];   
     

    //socket io escuchando al backend de algún cambio
    $scope.socket.on('casas', function (data) {
              console.log(data);
              $scope.houses= data;

    });

    
    
  

  /*init*/  
    /*init with delay*/
    var timer=$timeout(function() {                
                $scope.preloader.hidden=true;
                $timeout.cancel(timer);

    },500 ); 


  


});
