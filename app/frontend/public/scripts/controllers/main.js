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
       selectAll:function(){
            for(var i in $scope.toDoList.tasks)
               $scope.toDoList.tasks[i].done=true;
       },
       deselectAll:function(){
            for(var i in $scope.toDoList.tasks)
               $scope.toDoList.tasks[i].done=false;
       },
       deleteSelectedTasks:function(){
            
            for(var i=0;i<$scope.toDoList.tasks.length;i++)
              if($scope.toDoList.tasks[i].done){
                $scope.toDoList.doneTasks.push($scope.toDoList.tasks[i]);
                $scope.toDoList.tasks.splice(i,1);
                i--;
              }
              
                
            

            $mdToast.show(
              $mdToast.simple()
                .content("Se han eliminado todas las tareas seleccionadas")                
                .hideDelay(3000)
            );

       }
     };

     
     /*componente formulario de creación de tareas*/
     $scope.taskMaker = function($event){
          $mdDialog.show({  
            targetEvent: $event,
            templateUrl:"views/taskForm.html",
            controller: "TaskmakerCtrl"
          }).then(function(resp){//promises//succes
              $scope.toDoList.tasks.unshift(resp); 
              

              $mdToast.show(
                $mdToast.simple()
                .content("Se creó una nueva tarea")                
                .hideDelay(3000)
              );
          },function(){});
     };

     $scope.taskEditor = function(index,$event){          
          $mdDialog.show({  
            targetEvent: $event,
            templateUrl:"views/taskForm.html",
            controller: "TaskeditorCtrl",
            locals:{task:$scope.toDoList.tasks[index]}
          }).then(function(resp){//promises//succes
              $scope.toDoList.tasks[index]=resp; 
              

              $mdToast.show(
              $mdToast.simple()
                .content("Se editó la información de la tarea")                
                .hideDelay(2000)
              );

          },function(){});
     };


     /*cards de tareas*/
     $scope.toDoList={
         				  tasks:[],
    		     	    doneTasks:[]
     			  };


    $scope.devices=[{name:"Foco dormitorio",img:"images/room.jpg"},
                    {name:"Foco del comedor",img:"images/dinnerroom.jpg"},
                    {name:"Foco de la cocina",img:"images/kitchen.jpg"},
                    {name:"Foco del baño",img:"images/bathroom.jpg"}];

    
  /*init*/
    
    /*init with delay*/
    var timer=$timeout(function() {                
                $scope.preloader.hidden=true;
                $timeout.cancel(timer);

    },500); 

  });
