'use strict';

// Declare app level module which depends on views, and components
angular.module('bookme', [
  'ngRoute',
  'ngMaterial'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});
}])

.config(function($mdThemingProvider) {
        var customPrimary = {
            '50': '#fb3f3f',
            '100': '#fa2626',
            '200': '#fa0d0d',
            '300': '#e80505',
            '400': '#cf0505',
            '500': '#B60404',
            '600': '#9d0303',
            '700': '#840303',
            '800': '#6b0202',
            '900': '#520202',
            'A100': '#fb5858',
            'A200': '#fc7171',
            'A400': '#fc8a8a',
            'A700': '#390101',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
            // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined
        };
        $mdThemingProvider
            .definePalette('customPrimary',
            customPrimary);
        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
    });