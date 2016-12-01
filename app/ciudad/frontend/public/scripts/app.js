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
    'ngTouch',
    'ngRoute'
  ])
  //constantes globales
  .constant("netConfig",{ip:"192.168.2.7",port:"3000"})
  //paleta de colores
  .config(function ($mdThemingProvider) {
 
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');

     $mdThemingProvider.enableBrowserColor({
      theme: 'default', // Default is 'default'
      palette: 'primary', // Default is 'primary', any basic material palette and extended palettes are available
      hue: '800' // Default is '800'
    });
  });
