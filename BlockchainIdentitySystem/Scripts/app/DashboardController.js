app
    .controller("ACademicController", ACademicController)
    .controller('OtherController', OtherController)
    .controller("HealthController", HealthController)
    .controller("DashboardRegisterController", ['$rootScope', '$scope', '$http', 'Authorization', '$state','fileReader', function ($rootScope, $scope, $http, Authorization, $state, fileReader) {
        $scope.imageSrc = "";
    
        $scope.$on("fileProgress", function (e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });
    }])
       
        

   
        .controller("ChildDetailController", ['$scope', '$state', '$stateParams', '$http', function ($scope, $state, $stateParams, $http) {
           
            $http.get("api/apiendpoint/" + $stateParams.id).then(function (data) {
                console.log(data)
                $scope.child = data.data;
                console.log($scope.child)
            })
           
        
    }])
 