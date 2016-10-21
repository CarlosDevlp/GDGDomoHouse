'use strict';

/**
 * @ngdoc function
 * @name todoListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoListApp
 */
 var p;
 var path;
angular.module('DomoHouse')
  .controller('MainCtrl', function ($scope,$mdSidenav,$timeout,$mdDialog,$http,$mdToast,$location) {
    p=$mdDialog;    
    $scope.path=$location.absUrl().split("/")[3]||"Unknown";


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

     $scope.sendCommandToDevice=function(index,cmd){
          //var index=index || null;

          $http({
              method:"GET",
              url:(index!='none'?  "/led/"+index : "/spider/control"),
              params:{command:cmd}
          }).then(function (response) { //success
              console.log(response);            
          }, function (response) { //error
          });
     };



    
     /*lista de dispositivos*/

     /*domo house*/

     if($scope.path!="spider")

     
      $scope.devices=[{name:"Foco del dormitorio",img:"images/room.jpg"},
                      {name:"Foco del comedor",img:"images/dinnerroom.jpg"},
                      {name:"Foco de la cocina",img:"images/kitchen.jpg"},
                      {name:"Foco del baño",img:"images/bathroom.jpg"}];
      else
    /*spider*/
      $scope.devices=[{name:"Arduino Robot Spider",img:"images/spider.jpg"}];
      //$scope.devices
    
  //Preloader
  /*init*/
    
    /*init with delay*/
    var timer=$timeout(function() {                
                $scope.preloader.hidden=true;
                $timeout.cancel(timer);

    },500 ); 

  });
