angular.module('fseServices', [])

.service('apiService', function ($http, FSE_API) {

    this.getPosts = function ($scope, pageNum) {
        if (pageNum == 1) {
            return $http.get(FSE_API.url + 'get_posts/')
                .then(function (response) {
                    $scope.posts = response.data.posts;
                    $scope.totlaPageNum = response.data.pages;
                    $scope.count_total =  response.data.count_total;
                
                });
        } else if (pageNum <= $scope.totlaPageNum && $scope.posts.length < $scope.count_total) {
            temPosts = $scope.posts;
            return $http.get(FSE_API.url + 'get_posts/?page=' + pageNum)
                .then(function (response) {
                    $scope.posts = $scope.posts.concat(response.data.posts);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });

        }
    };

    this.getPost = function ($scope, $stateParams) {

        return $http.get(
            FSE_API.url + "get_post/?post_id=" + $stateParams.postId

        ).then(function successCallback(response) {
            $scope.post = response.data.post;
            $scope.pageNum = response.data.pages;
            console.log('hhh');
        });
    };

    this.getCatPosts = function ($scope, $stateParams) {

        return $http.get(
            FSE_API.url + "get_category_posts/?category_id=" + $stateParams.catId
        ).then(function successCallback(response) {
            $scope.posts = response.data.posts;
            $scope.pageNum = response.data.pages;
        });

    };

    this.getTagPosts = function ($scope, $stateParams) {

        return $http.get(
            FSE_API.url + "get_tag_posts/?tag_id=" + $stateParams.tagId
        ).then(function successCallback(response) {
            $scope.posts = response.data.posts;
            $scope.pageNum = response.data.pages;
        });

    };
    
    this.getCats = function ($scope) {

        return $http.get(
            FSE_API.url + "get_category_index/"
        ).then(function successCallback(response) {
            $scope.cats = response.data.categories;
        });

    };


});