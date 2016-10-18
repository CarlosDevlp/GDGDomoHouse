'use strict';

/**
 * @ngdoc function
 * @name todoListApp.controller:TaskmakerCtrl
 * @description
 * # TaskmakerCtrl
 * Controller of the todoListApp
 */
angular.module('DomoHouse')
  .controller('TaskmakerCtrl', function ($mdDialog,$scope) {
      $scope.name="Nueva Tarea";
  		$scope.task={
  			name:"",
  			desp:"",
        done:false
  		};
  		$scope.cancel=function(){
  			$mdDialog.cancel();
  		};
  		$scope.create=function(){
  			var valid=$scope.task.name.trim()!=false && $scope.task.desp.trim()!=false;  			
  			if(valid)
  				$mdDialog.hide($scope.task);
  		};
  });
