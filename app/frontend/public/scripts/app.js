'use strict';

/**
 * @ngdoc overview
 * @name todoListApp
 * @description
 * # todoListApp
 *
 * Main module of the application.
 */
angular
  .module('DomoHouse', [
    'ngMaterial',
    'ngAnimate',
    'ngAria',            
    'ngTouch'
  ])
  .config(function ($mdThemingProvider) {
 
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');
  });
