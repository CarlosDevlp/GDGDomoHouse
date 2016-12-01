'use strict';

/**
 * @ngdoc function
 * @name todoListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoListApp
 */

angular.module('DomoHouse')
  .controller('MainCtrl', function ($scope,$mdSidenav,$timeout,$mdDialog,$http,$mdToast,$location,netConfig,houseName) {
    
    $scope.socket= io.connect('http://'+netConfig.ip+':'+netConfig.port);
    $scope.houseName=houseName;

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
          }).then(function(resp){//promises//succes
              $scope.devices.push(resp);

              $mdToast.show(
                $mdToast.simple()
                .content("Nuevo dispositivo agregado")
                .hideDelay(3000)
              );
          },function(){});
     };

    //enviar comando al dispositivo arduino
     $scope.sendCommandToDevice=function(index,cmd){
          $scope.devices[index].state=!cmd;
          $scope.socket.emit('led', { 'index':index, 'state': !cmd});
     };


    // 
    $scope.socket.on('led', function (data) {
          console.log(data);
          $scope.devices[data.index].state=data.state;            
    });


    //socket io escuchando al backend de algún cambio
    $scope.socket.on('leds', function (data) {
            console.log(data);
              for(var pos in data.devices)
                  $scope.devices[pos].state= data.devices[pos].state;

    });

    
     /*lista de dispositivos*/

     /*domo house*/
     
      $scope.devices=[{name:"Foco del dormitorio",img:"images/room.jpg",state:false},
                      {name:"Foco del comedor",img:"images/dinnerroom.jpg",state:false},
                      {name:"Foco de la cocina",img:"images/kitchen.jpg",state:false},
                      {name:"Foco del baño",img:"images/bathroom.jpg",state:false}];
     



  //Preloader
  /*init*/
    
    /*init with delay*/
    var timer=$timeout(function() {                
                $scope.preloader.hidden=true;
                $timeout.cancel(timer);

    },500 ); 


  


});
