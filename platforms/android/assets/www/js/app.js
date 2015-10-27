// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
}) 

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.timeout = 600000;
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('remoov', {
    url: '/remoov',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
 
  .state('remoov.home', {
    url: '/home',
    views: {
      'remoov-home': {
        templateUrl: 'templates/remoov-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('remoov.itempage', {
      url: '/itempage/:itemId',
      views: {
        'remoov-itempage': {
          templateUrl: 'templates/remoov-itempage.html',
          controller: 'ItemPageCtrl'
        }
      }
    })

  .state('remoov.itemview', {
      url: '/itemview/:barcode',
      views: {
        'remoov-itemview': {
          templateUrl: 'templates/remoov-itemview.html',
          controller: 'ItemViewCtrl'
        }
      }
    })

  .state('remoov.barcode', {
    url: '/barcode',
    views: {
      'remoov-barcode': {
        templateUrl: 'templates/remoov-barcode.html',
        controller: 'BarcodeCtrl'
      }
    }
  })

  .state('remoov.furniture', {
    url: '/furniture',
    views: {
      'remoov-furniture': {
        templateUrl: 'templates/remoov-furniture.html',
        controller: 'FurnitureCtrl'
      }
    }
  }) 

  .state('remoov.painting', {
    url: '/painting',
    views: {
      'remoov-painting': {
        templateUrl: 'templates/remoov-painting.html',
        controller: 'PaintingCtrl'
      }
    }
  })

  .state('remoov.electronic', {
    url: '/electronic',
    views: {
      'remoov-electronic': {
        templateUrl: 'templates/remoov-electronic.html',
        controller: 'ElectronicCtrl'
      }
    }
  })

  .state('remoov.wearable', {
    url: '/wearable',
    views: {
      'remoov-wearable': {
        templateUrl: 'templates/remoov-wearable.html',
        controller: 'WearableCtrl'
      }
    }
  })

  .state('remoov.appliance', {
    url: '/appliance',
    views: {
      'remoov-appliance': {
        templateUrl: 'templates/remoov-appliance.html',
        controller: 'ApplianceCtrl'
      }
    }
  })

  .state('remoov.other', {
    url: '/other',
    views: {
      'remoov-other': {
        templateUrl: 'templates/remoov-other.html',
        controller: 'OtherCategoryCtrl'
      }
    }
  })

  .state('remoov.cagetory', {
    url: '/category',
    views: {
      'remoov-category': {
        templateUrl: 'templates/remoov-category.html',
        controller: 'CagetoryCtrl'
      }
    }
  })

  .state('remoov.photo', {
    url: '/photo',
    views: {
      'remoov-photo': {
        templateUrl: 'templates/remoov-photogallery.html',
        controller: 'PhotoGalleryCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/remoov/home');

});
