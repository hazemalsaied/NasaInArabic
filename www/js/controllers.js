angular.module('fseControllers', ['fseServices'])

.controller('AppCtrl', function($scope,apiService) {

     apiService.getCats($scope);
})
.controller('postsCtrl', function ($scope, apiService) {

    pageNum = 1;
    apiService.getPosts($scope, pageNum);
    
    $scope.loadMore = function () {

        if (pageNum < $scope.totlaPageNum) {
            pageNum = pageNum + 1;
        }
        apiService.getPosts($scope, pageNum);
    };

    $scope.$on('$stateChangeSuccess', function () {
        $scope.loadMore();
    });
    
//    $scope.getSearchResult() = function(){
//        apiService.getCatPosts($scope, $stateParams);
//    };

})

.controller('catPostsCtrl', function ($scope, $stateParams, apiService) {

    apiService.getCatPosts($scope, $stateParams);
})

.controller('tagPostsCtrl', function ($scope, $stateParams, apiService) {

    apiService.getTagPosts($scope, $stateParams);
})

.controller('postCtrl', function ($scope, $stateParams, apiService) {

    apiService.getPost($scope, $stateParams);
});