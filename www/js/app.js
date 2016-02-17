// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'fseControllers', 'ngSanitize'])

.constant('FSE_API', {
  url: 'http://localhost:8100/api/'
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.posts', {
      url: '/posts',
      views: {
        'menuContent': {
          templateUrl: 'templates/posts.html',
          controller: 'postsCtrl'
        }
      }
    })

      .state('app.cats', {
    url: '/cats/:catId',
    views: {
      'menuContent': {
        templateUrl: 'templates/posts.html',
        controller: 'catPostsCtrl'
      }
    }
  })
  
      .state('app.tags', {
    url: '/tag/:tagId',
    views: {
      'menuContent': {
        templateUrl: 'templates/posts.html',
        controller: 'tagPostsCtrl'
      }
    }
  })
    
    .state('app.single', {
    url: '/posts/:postId',
    views: {
      'menuContent': {
        templateUrl: 'templates/post.html',
        controller: 'postCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/posts');
});
