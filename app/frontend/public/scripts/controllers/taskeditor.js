'use strict';

/**
 * @ngdoc function
 * @name todoListApp.controller:TaskeditorCtrl
 * @description
 * # TaskeditorCtrl
 * Controller of the todoListApp
 */
angular.module('DomoHouse')
  .controller('TaskeditorCtrl', function ($scope,$mdDialog,task){
    	$scope.name="Editor de tareas";
    	$scope.task={name:task.name,
    				 desp:task.desp,
    			     done:task.done};
  		$scope.cancel=function(){
  			$mdDialog.cancel();
  		};
  		$scope.create=function(){
  			var valid=$scope.task.name.trim()!=false && $scope.task.desp.trim()!=false;  			
  			if(valid)
  				$mdDialog.hide($scope.task);
  		};
  });
