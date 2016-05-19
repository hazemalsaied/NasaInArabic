angular.module('fseControllers', ['fseServices', 'ngCordova'])

.controller('AppCtrl', function ($scope, $rootScope, $state, config,$filter, apiService, $ionicSideMenuDelegate) {

    $rootScope.postsMap = {};
    apiService.getCats($scope);
    
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {

            if (toState.name === 'app.cat' && toParams.catId && $rootScope.postsMap[toParams.catId]) {
                
                $rootScope.posts = $rootScope.postsMap[toParams.catId];
                $rootScope.category = $filter('filter')($rootScope.cats, { id: toParams.catId })[0];
                
            } else if (toState.name === 'app.tag' && $rootScope.postsMap[toParams.tagId]) {

            } else if(toState.name === 'app.posts' && fromState.name !== 'app.post') {
                
                $rootScope.posts = $rootScope.postsMap[0];
            }
        });

    $scope.initiateCaptions = function ($scope, config) {

        $scope.menuTitle = config.MENU_TITLE;
        $scope.pageTitle = config.SITE_NAME;
        $scope.socialLinks = config.SOCIAL_PAGE_TITLE;
        $scope.contactUs = config.CONTACT_US;
        $scope.moreTags = config.MORE_TAGS;
        $scope.home = config.HOME;
        $scope.usefulLinks = config.USEFUL_LINK;
        $scope.multimedia = config.MULTIMEDIA;
        $scope.videos = config.VIDEOS;
        $scope.images = config.IMAGES;
    };

    $scope.initiateCaptions($scope, config);


    $scope.toggleGroup = function (group) {

        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }

        if (group.children.length === 0) {
            $ionicSideMenuDelegate.toggleRight();
        }
    };

    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };


})

.controller('postsCtrl', function ($scope,$ionicHistory, $ionicLoading, $rootScope, $state, config, $stateParams, apiService) {
    
    $ionicLoading.show({template: config.LOADING_TEXT , hideOnStateChange: true, delay: 0, duration: 10000 });
    if ($ionicHistory. backView()&& $ionicHistory. backView().stateName && $ionicHistory. backView().stateName === 'app.video') {
            $scope.getTagedVideos = true;
    } else if ($ionicHistory. backView()&& $ionicHistory. backView().stateName &&$ionicHistory. backView().stateName === 'app.image') {
        $scope.getTagedImages = true;
    }
    
    if (typeof $stateParams.catId != "undefined") {

        $scope.getCategories = true;
    } else $scope.getCategories = false;

    if ($stateParams.tagId ) {
        $scope.getTags = true;
    } else $scope.getTags = false;

    // Initialising values
    $scope.pageNum = 1;
    $scope.noMoreItemsAvailable = false;
    $scope.activeSlide = 0;
    $scope.refreshDate = new Date();
    $scope.loadingDate = new Date();
    $scope.canLoadMore = true;
    //get posts
    apiService.getPosts($scope, $scope.getCategories, $scope.getTags , $scope.getTagedVideos, $scope.getTagedImages);
    $ionicLoading.hide();
    $scope.refreshSlideInfo = function (index) {

        $scope.pageNum = 1;
        
        
        if (index !== 0) {
            $scope.whichCat = $rootScope.cats[index].id;
            $scope.getCategories = true;
            $scope.catId = $scope.whichCat;
            $scope.pageTitle = $rootScope.cats[index].title;
            //$scope.postContent = $sce.trustAsHtml(($filter('filter')($scope.posts, { ID: $scope.whichPost }))[0].content);
        } else {

            $scope.getCategories = false;
            $scope.pageTitle = config.SITE_NAME;
        }

        apiService.getPosts($scope, $scope.getCategories, $scope.getTags , $scope.getTagedVideos, $scope.getTagedImages);
        
//        if (index !== 0) {
//            $rootScope.posts = $rootScope.postsMap[$scope.whichCat];
//        } else $rootScope.posts = $rootScope.postsMap[0];
        
    };


    $scope.doRefresh = function () {

        if (new Date() - $scope.refreshDate > 100000) {
            $scope.pageNum = 1;
            $scope.refreshDate = new Date();
            apiService.getPosts($scope, $scope.getCategories, $scope.getTags , $scope.getTagedVideos, $scope.getTagedImages);
        }
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.loadMore = function () {

        if  (new Date() - $scope.loadingDate > 10000 && $scope.canLoadMore){
            $scope.loadingDate = new Date();
            $scope.pageNum = $scope.pageNum + 1;
            apiService.getPosts($scope, $scope.getCategories, $scope.getTags , $scope.getTagedVideos, $scope.getTagedImages);
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.shareAnywhere = function (message, subject, image, id) {
        window.plugins.socialsharing.share('', '', '', 'https://nasainarabic.net//r/a/' + id);
    }
})

.controller('postCtrl', function ($scope, $rootScope, $ionicLoading, config, apiService, $stateParams, $filter, config, $ionicHistory) {

    $ionicLoading.show({template: config.LOADING_TEXT , hideOnStateChange: true, delay: 500, duration: 10000 });
    $scope.whichPost = $stateParams.postId;

    $scope.pageTitle = config.SITE_NAME;
    $scope.onBrowser = config.ON_BROWSER;
    
    $scope.category = $rootScope.category;

    $scope.currentPost = $filter('filter')($scope.posts, {
        id: $scope.whichPost
    });
    $scope.post = $scope.currentPost[0];
//    $scope.getPostIndex = function (currentPost) {
//         currentPost = $filter('filter')($scope.posts, { id: $scope.whichPost });
//        if(currentPost){
//            for (var i = 0; i < $scope.posts.length; i++) {
//                tempPost = $scope.posts[i];
//                if (tempPost.id === currentPost[0].id) {
//                    return $scope.posts.indexOf(tempPost);
//                }
//            }
//        }
//        return -1;
//    };

//    $scope.activeSlide = $scope.getPostIndex($scope.currentPost);

    $scope.openSocialLink = function (url) {
        window.open(url, '_system', 'location=yes');
        return false;
    };

//    $scope.refreshSlideInfo = function (index) {
//        $scope.whichPost = $scope.posts[index].id;
//        $scope.currentPost = $filter('filter')($scope.posts, {
//            id: $scope.whichPost
//        });
//        $scope.activeSlide = $scope.getPostIndex($scope.currentPost);
//
//    };

    $scope.shareAnywhere = function (message, subject, image, id) {
        window.plugins.socialsharing.share('', '', '', 'https://nasainarabic.net//r/a/' + id);
    }

    $scope.browsePostText = config.BROWSE_POST;

    $scope.browsePost = function (url) {
        window.open(url, '_system', 'location=yes');
        return false;
    };
    $ionicLoading.hide();
})

.controller('contactCtrl', function ($scope, config, $cordovaEmailComposer) {

    $scope.pageTitle = config.SITE_NAME;

    $scope.submit = function (username, email, msg) {

        $cordovaEmailComposer.isAvailable().then(function () {

            var message = {
                to: config.CONTACT_MAIL,
                subject: 'رسالة من :' + username + '  ' + email,
                body: msg,
                isHtml: true
            };

            $cordovaEmailComposer.open(message).then(null, function () {
                // user cancelled email
            });

        }, function () {
            // not available
        });
        var message = {
            to: config.CONTACT_MAIL,
            subject: 'رسالة من :' + username + '  ' + email,
            body: msg,
            isHtml: true
        };

        $cordovaEmailComposer.open(message).then(null, function () {
            // user cancelled email
        });
    };
})

.controller('tagsCtrl', function ($scope, config, apiService) {

    $scope.pageTitle = config.SITE_NAME;
    $scope.subTitle = config.MORE_TAGS;
    apiService.getTags($scope);
})

.controller('socialCtrl', function ($scope, config, apiService) {

    $scope.initiateCaptions = function ($scope, config) {

        $scope.pageTitle = config.SITE_NAME;
        $scope.subTitle = config.SOCIAL_PAGE_TITLE;
        $scope.facebookText = config.FACEBOOK_TEXT;
        $scope.twitterText = config.TWITTER_TEXT;
        $scope.googleText = config.GOOGLE_TEXT;
        $scope.youtubeText = config.YOUTUBE_TEXT;
        $scope.instagramText = config.INSTAGRAM_TEXT;
        $scope.linkedInText = config.LINKEDIN_TEXT;
    };

    $scope.initiateCaptions($scope, config);

    $scope.openSocialLink = function (url) {
        window.open(url, '_system', 'location=yes');
        return false;
    };
})

.controller('videosCtrl', function ($scope, config, apiService, $ionicHistory) {

        if ($ionicHistory.currentView().stateName === 'app.images') {
            $scope.getImages = true;
        }

        $scope.pageTitle = $scope.getImages ? config.IMAGES : config.VIDEOS;
        $scope.pageNum = 1;
        $scope.noMoreItemsAvailable = false;

        apiService.getVideos($scope, $scope.getImages, false);

        $scope.getArticleUrl= function (postId) {
            if($scope.getImages){
                return '#/app/images/' + postId
            }
            return '#/app/videos/' + postId
        }
    
        $scope.doRefresh = function () {

            if (($scope.refreshDate == null || new Date() - $scope.refreshDate > 100000)) {
                $scope.pageNum = 1;
                $scope.refreshDate = new Date();
                apiService.getVideos($scope, $scope.getImages, true);
            }
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.loadMore = function () {

            if ((!$scope.loadingDate || new Date() - $scope.loadingDate > 10000)) {
                $scope.loadingDate = new Date();
                $scope.pageNum = $scope.pageNum + 1;
                apiService.getVideos($scope, $scope.getImages, true);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
        $scope.openSocialLink = function (url) {
            window.open(url, '_system', 'location=yes');
            return false;
        };

        $scope.shareAnywhere = function (message, subject, image, id) {
            window.plugins.socialsharing.share('', '', '', 'https://nasainarabic.net//r/v/' + id);
        }

        $scope.browsePostText = config.BROWSE_POST;

        $scope.browsePost = function (url) {
            window.open(url, '_system', 'location=yes');
            return false;
        };
    })
    .controller('videoCtrl', function ($scope, $rootScope, $stateParams, $filter, config, $sce, $ionicHistory) {

        if ($ionicHistory.currentView().stateName === 'app.image') {
            $scope.getImage = true;
        }

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }

        $scope.convertToEmbedLink = function (url) {

            if (url) {
                return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + url.split('=')[1]);
            }
            return '';
        }

        $scope.pageTitle = config.SITE_NAME;
        $scope.onBrowser = config.ON_BROWSER;

        $scope.whichPost = $stateParams.videoId;
        $scope.posts = $rootScope.posts;
        $scope.currentPost = $filter('filter')($scope.posts, {
            id: $scope.whichPost
        });
        $scope.post = $scope.currentPost[0];



//        $scope.getPostIndex = function (posts, currentPost) {
//
//            for (var i = 0; i < posts.length; i++) {
//                tempPost = posts[i];
//                if (tempPost.id === currentPost[0].id) {
//                    return posts.indexOf(tempPost);
//                }
//            }
//            return -1;
//        };
//        
//        $scope.activeSlide = $scope.getPostIndex($scope.posts, $scope.currentPost);
//
//        $scope.openSocialLink = function (url) {
//            window.open(url, '_system', 'location=yes');
//            return false;
//        };
//
//        $scope.refreshSlideInfo = function (index) {
//            $scope.whichPost = $scope.posts[index].id;
//            $scope.currentPost = $filter('filter')($scope.posts, {
//                id: $scope.whichPost
//            });
//            $scope.activeSlide = $scope.getPostIndex($scope.posts, $scope.currentPost);
//        };

        $scope.shareAnywhere = function (message, subject, image, id) {
            if (getImages)
                window.plugins.socialsharing.share('', '', '', 'https://nasainarabic.net//r/i/' + id);
            else window.plugins.socialsharing.share('', '', '', 'https://nasainarabic.net//r/v/' + id);
        }

        $scope.browsePostText = config.BROWSE_POST;

        $scope.browsePost = function (url) {
            window.open(url, '_system', 'location=yes');
            return false;
        };
    })

.controller('userCtrl', function ($scope, config, apiService) {
    apiService.getUser($scope);
    $scope.pageTitle = config.SITE_NAME;
    
    $scope.openSocialLink = function (url , param) {
        window.open(url + param, '_system', 'location=yes');
        return false;
    };
    
})
.controller('imagesCtrl', function ($scope, config) {
    $scope.pageTitle = config.SITE_NAME;
})

.controller('homeCtrl', function ($scope, config) {
    $scope.pageTitle = config.SITE_NAME;
});