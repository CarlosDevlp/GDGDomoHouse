'use strict';

/**
 * @ngdoc function
 * @name todoListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoListApp
 */
 var p;
angular.module('DomoHouse')
  .controller('MainCtrl', function ($scope,$mdSidenav,$timeout,$mdDialog,$http,$mdToast) {
    p=$mdDialog;
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
              //$scope.toDoList.tasks.unshift(resp); 
              $scope.devices.push(resp);

              $mdToast.show(
                $mdToast.simple()
                .content("Nuevo dispositivo agregado")
                .hideDelay(3000)
              );
          },function(){});
     };

     $scope.sendCommandToDevice=function(index,command){
          
          $http({
              method:"GET",
              url:"/led/"+index,
              params:{state:command}
          }).then(function (response) { //success
              console.log(response);            
          }, function (response) { //error
          });
     };

    
     /*lista de dispositivos*/
    $scope.devices=[{name:"Foco dormitorio",img:"images/room.jpg"},
                    {name:"Foco del comedor",img:"images/dinnerroom.jpg"},
                    {name:"Foco de la cocina",img:"images/kitchen.jpg"},
                    {name:"Foco del baño",img:"images/bathroom.jpg"}];

    
  //Preloader
  /*init*/
    
    /*init with delay*/
    var timer=$timeout(function() {                
                $scope.preloader.hidden=true;
                $timeout.cancel(timer);

    },500 ); 

  });
