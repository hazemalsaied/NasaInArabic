angular.module('fseServices', [])

.service('apiService', function ($http, $rootScope, $ionicPopup, $stateParams, config, $sce, $ionicLoading) {
    
    showAlert = function( closeAPP) {
        var alertPopup = $ionicPopup.alert({
         title: config.CONNECTION_ERROR,
         template: config.CONNECTION_ERROR_MSG
        });
         alertPopup.then(function(res) {
            if(closeAPP){
                ionic.Platform.exitApp();}
   });
    };
    
    this.generateQuery = function ($scope, getCat, getTag , getTagedVideos, getTagedImages){
        
        if (typeof $scope.pageNum === "undefined" || $scope.pageNum === 1) {
            httpQuery = config.API + 'articles/main/' ;
        } else {
            httpQuery = config.API + 'articles/main/' + $scope.pageNum ;
        }
        
        if(getTagedVideos){
            return config.API + 'tagged_videos/'+  $stateParams.tagId ;
        }
        
        if(getTagedImages){
            return config.API + 'tagged_images/'+  $stateParams.tagId  ;   
        }
        
        if (getCat){
            httpQuery = config.API + 'category/' ;
            if (typeof $scope.catId === "undefined" ){
                httpQuery = httpQuery +  $stateParams.catId;
            } else httpQuery = httpQuery +  $scope.catId;
            httpQuery = httpQuery + '/' + $scope.pageNum;
        
        } else if (getTag){
            httpQuery =config.API + 'tagged_articles/'+  $stateParams.tagId + '/' + $scope.pageNum ;
        }
        return httpQuery;
    }
    
    this.getPosts = function ($scope, getCat, getTag, getTagedVideos, getTagedImages) {
        
        httpQuery = this.generateQuery($scope, getCat, getTag, getTagedVideos, getTagedImages);
        $ionicLoading.show({template: config.LOADING_TEXT , hideOnStateChange: true, delay: 500, duration: 10000 });

        return $http.get(httpQuery) 
            .then(function (response) {
            
                if ($scope.pageNum == 1) {  
                    $scope.posts = response.data.data;
                } else{
                        if (!$scope.posts){
                            $scope.posts = [];
                        }
                        $scope.posts = $scope.posts.concat(response.data.data);
                }
            if (getCat){
                $scope.category = response.data.category;
                $rootScope.category = response.data.category;
                $scope.pageTitle = response.data.category.title;
            }
            $rootScope.posts = $scope.posts;
            
            if(getCat){
                if ($stateParams.catId)
                    key = $stateParams.catId;
                else key = $scope.catId;
                $rootScope.postsMap[key] = $scope.posts;
            } else if(!getTag){
                $rootScope.postsMap[0] = $scope.posts;
            }
            $ionicLoading.hide();
            }, function errorCallback(response) {
                $scope.canLoadMore = false;
                $ionicLoading.hide();
        });
            
    };
    
    //Get Categories list
    this.getCats = function ($scope) {

        return $http.get(
            config.API + "categories/main"
        ).then(function successCallback(response) {
            $rootScope.cats = response.data;
        },function errorCallback(response){
            showAlert(true);
            
        });
    };
    
    //Get Categories list
    this.getVideos = function ($scope, getImages, loadMore) {

        return $http.get(
            config.API + (getImages? "images/main/":"videos/main/") + $scope.pageNum
        ).then(function successCallback(response) {
            if(!loadMore)
                $scope.posts = response.data.data;
            else $scope.posts = $scope.posts.concat(response.data.data);
            $rootScope.posts = $scope.posts;
        },function errorCallback(response){
            showAlert(true);
            
        });
    };
    
    this.getUser = function ($scope) {

        return $http.get(
            config.API + "user/" + $stateParams.userId
        ).then(function successCallback(response) {
            $scope.user = response.data.data;
        });

    };
    
    this.getTags = function ($scope) {

        return $http.get(
            config.API + "tags/"
        ).then(function successCallback(response) {
            $scope.tags = response.data.tags;
        });

    };


});