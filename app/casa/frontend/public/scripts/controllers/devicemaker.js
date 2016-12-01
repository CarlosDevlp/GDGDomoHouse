'use strict';

/**
 * @ngdoc function
 * @name DomoHouse.controller:DeviceMakerCtrl
 * @description
 * # DeviceMaker
 * Controller of the DomoHouse
 */
angular.module('DomoHouse')
  .controller('DeviceMakerCtrl', function ($mdDialog,$scope) {
      
  		$scope.device={
  			name:"",
  			url:"",
        img:""
  		};

      //cancelar y salir del formulario
  		$scope.cancel=function(){
  			$mdDialog.cancel();
  		};

      //crear y enviar el dispositivo al objeto que invocó
  		$scope.create=function(){
  			var valid=$scope.device.name.trim()!=false 
               && $scope.device.url.trim()!=false;

  			if(valid)
  				$mdDialog.hide($scope.device);
  		};


  });
