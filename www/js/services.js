angular.module('fseServices', [])

.service('apiService', function ($http, FSE_API, SITE_NAME) {
    
    //Get single post
     this.getPost = function ($scope, $stateParams) {

        return $http.get(
            FSE_API.url + "get_post/?post_id=" + $stateParams.postId

        ).then(function successCallback(response) {
            $scope.post = response.data.post;
            $scope.pageNum = response.data.pages;
        });
    };
    //Get Post list    
    this.getPosts = function ($scope, pageNum) {
        
        if (pageNum == 1) {    
            return $http.get(
                FSE_API.url + 'get_posts/')
                .then(function (response) {
                    $scope.posts = response.data.posts;
                    $scope.totalPageNum = response.data.pages;
                    $scope.pageTitle =  SITE_NAME.name;
                });
            
        } else if (pageNum <= $scope.totalPageNum ) {
            
            return $http.get(
                FSE_API.url + 'get_posts/?page=' + pageNum)
                .then(function (response) {
                    $scope.posts = $scope.posts.concat(response.data.posts);
                });

        }
    };
    
    //Get post list according to a category
    this.getCatPosts = function ($scope, $stateParams, pageNum) {

        if (pageNum == 1) {
            return $http.get(
                FSE_API.url + "get_category_posts/?category_id=" + $stateParams.catId).
            then(function (response) {
                $scope.posts = response.data.posts;
                $scope.totalPageNum = response.data.pages;
                $scope.pageTitle =  response.data.category.title;

            });
        } else if (pageNum <= $scope.totalPageNum) {

            return $http.get(
                FSE_API.url + "get_category_posts/?category_id=" + $stateParams.catId +'/&page=' + pageNum)
                .then(function (response) {
                    $scope.posts = $scope.posts.concat(response.data.posts);
                });

        }
        return null;

    };
    
    //Get post list according to a tag
    this.getTagPosts = function ($scope,$stateParams, pageNum) {

        if (pageNum == 1) {
            return $http.get(
                FSE_API.url + "get_tag_posts/?tag_id=" + $stateParams.tagId).
            then(function (response) {
                $scope.posts = response.data.posts;
                $scope.totalPageNum = response.data.pages;
                $scope.pageTitle =  response.data.tag.title;

            });
        } else if (pageNum <= $scope.totalPageNum) {

            return $http.get(
                FSE_API.url + "get_tag_posts/?tag_id=" + $stateParams.tagId +'/&page=' + pageNum)
                .then(function (response) {
                    $scope.posts = $scope.posts.concat(response.data.posts);
                });

        }
        return null;
        
    };
    
    //Get Categories list
    this.getCats = function ($scope) {

        return $http.get(
            FSE_API.url + "get_category_index/"
        ).then(function successCallback(response) {
            $scope.cats = response.data.categories;
        });

    };


});