// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'fseControllers', 'ngSanitize', 'ngCordova'])

//
//, "proxies": [
//    {
//      "path": "/api",
//      "proxyUrl": "http://api.nasainarabic.net/"
//    }
//  ]

.constant('config', {
    SITE_NAME: 'ناسا بالعربي',
    CONTACT_MAIL: 'CONTACT_MAIL',
    API: 'http://api.nasainarabic.net/',
//    API: 'http://localhost:8100/api/',
    MENU_TITLE: 'تبويبات الموقع',
    POST_LIST_DATA: 'number=10&fields=ID,date,excerpt,title,discussion,content,categories,tags,featured_image,short_URL',
    LOADING_TEXT: 'جاري التحميل ..',
    ON_BROWSER:'على المتصفح',
    USEFUL_LINK: 'روابط مفيدة',
    FACEBOOK_TEXT: 'على فيسبوك',
    TWITTER_TEXT: 'على تويتر',
    GOOGLE_TEXT :'على جوجل',
    YOUTUBE_TEXT:'على يوتيوب',
    INSTAGRAM_TEXT:'على انستجرام',
    LINKEDIN_TEXT:'على لينكيد إن',
    CONTACT_US: 'تواصل معنا',
    MORE_TAGS: 'كلمات مفتاحية',
    HOME: 'الرئيسية',
    MULTIMEDIA: 'ملتيميديا ناسا',
    VIDEOS: 'فيديو',
    IMAGES: 'صور',
    SOCIAL_PAGE_TITLE: 'ناسا بالعربي في كل مكان',
    FACEBOOK_LINK: 'https://www.facebook.com/NasaInArabic',
    TWITTER_LINK: 'https://twitter.com/NasaInArabic',
    YOUTUBE_LINK: 'https://www.youtube.com/user/NasaInArabic',
    BROWSE_POST: 'قد تحتوي هذه المادة على محتوى يتعذر إظهاره في التطبيق، لمشاهدتها على المتصفح، انقر هنا',
    CONNECTION_ERROR: 'خطأ تقني',
    CONNECTION_ERROR_MSG : 'عذرا .. لا يمكننا الاتصال بالمخدم. سيتم إغلاق التطبيق!'
})
.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
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
.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
    .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeCtrl'
                }
            }
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
    .state('app.cat', {
            url: '/cat/:catId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/posts.html',
                    controller: 'postsCtrl'
                }
            }
        })
    .state('app.tag', {
            url: '/tag/:tagId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/posts.html',
                    controller: 'postsCtrl'
                }
            }
        })
    .state('app.tags', {
            url: '/tags',
            views: {
                'menuContent': {
                    templateUrl: 'templates/tags.html',
                    controller: 'tagsCtrl'
                }
            }
        })
    .state('app.videos', {
            url: '/videos',
            views: {
                'menuContent': {
                    templateUrl: 'templates/videos.html',
                    controller: 'videosCtrl'
                }
            }
        })
    .state('app.images', {
            url: '/images',
            views: {
                'menuContent': {
                    templateUrl: 'templates/videos.html',
                    controller: 'videosCtrl'
                }
            }
        })
    .state('app.contact', {
            url: '/contact',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contact.html',
                    controller: 'contactCtrl'
                }
            }
        })
    .state('app.post', {
            url: '/posts/:postId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/post.html',
                    controller: 'postCtrl'
                }
            }
        })
    .state('app.video', {
        url: '/videos/:videoId',
        views: {
            'menuContent': {
                templateUrl: 'templates/video.html',
                controller: 'videoCtrl'
            }
        }
    })
    .state('app.image', {
        url: '/images/:videoId',
        views: {
            'menuContent': {
                templateUrl: 'templates/video.html',
                controller: 'videoCtrl'
            }
        }
    })
    .state('app.user', {
        url: '/users/:userId',
        views: {
            'menuContent': {
                templateUrl: 'templates/user.html',
                controller: 'userCtrl'
            }
        }
    })
    .state('app.social', {
            url: '/social',
            views: {
                'menuContent': {
                    templateUrl: 'templates/social.html',
                    controller: 'socialCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});