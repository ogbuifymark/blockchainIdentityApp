app
    .controller("AuthBaseController", function ($scope, $http) {
        // function to submit the form after all validation has occurred 
        $scope.isLogin = true;
        $scope.isRegister = true;
       
    })
    .controller("LoginController", ['$rootScope', '$scope', '$http', 'Authorization', '$state', function ($rootScope,$scope, $http, Authorization,$state) {
        // function to submit the form after all validation has occurred 
        $scope.loading = false;
        var loginInfo = {
            "username": "mark",
            "password":"mark",
            "first_login":2
        };
       
        $scope.closeWarningAlert = function () {
            
            $scope.hideWarningAlert = true;
        }
        if (Authorization.invalid_access_message != null) {
            $scope.authorizationMessage = Authorization.invalid_access_message;
            
        }

        $scope.submitLoginForm = function (isValid) {
            if (isValid) {
               //Call the Login Api
                var loginViewModel = {
                    "username": $scope.walletId,
                    "password": $scope.password
                };
                //var config = {
                //    headers: {
                //        'Content-Type': 'application/json;charset=utf-8;'
                //    }
                //}

                $scope.loading = true;
                console.log(loginViewModel, loginInfo);
                if (loginViewModel.username == loginInfo.username && loginViewModel.password ==loginInfo.password) {
                    Authorization.setUser(loginViewModel);
                    $rootScope.first_login = loginViewModel.first_login;
                    Authorization.authorized = true;
                    $state.go('dashboard.mykids')
                }
                else {
                    $scope.authorizationMessage = "Username do not match";
                    $scope.hideWarningAlert = false;
                    $scope.loading = false;
                }
                //$http.post("api/AuthApi/Login", JSON.stringify(loginViewModel), JSON.stringify(config))
                //    .then(
                //    (success) => {
                //        console.log(success.data.status);
                //        if (success.data.status === true) {
                //            //$scope.loading = false;
                //            //alert("We are logged in");                          
                //            Authorization.setUser(success.data);
                //            $rootScope.first_login = success.data.first_login;
                //            Authorization.authorized = true;
                //            $state.go('dashboard.stats')
                //        } else {
                //            //alert(success.data.error.errorMessage);
                //            $scope.authorizationMessage = success.data.error.errorMessage;
                //            $scope.hideWarningAlert = false;
                //            $scope.loading = false;
                //        }
                //    },
                //    (error) => console.log(error)
                //    );
            }
        };
        $scope.PageTitle = "Login";
        $scope.Login = "Welcome to the login page";
    }])
    .controller("RegisterController", ['$rootScope', '$scope', '$http', 'Authorization', '$state', function ($rootScope,$scope, $http, Authorization,$state) {
        // function to submit the form after all validation has occurred 
        $scope.Register = "Welcome to the registration page";
        $scope.loading = false;
        $scope.closeWarningAlert = function () {

            $scope.hideWarningAlert = true;
        }
        var password = $scope.password;
        var confirmPassword = $scope.confirmPassword;
        if (confirmPassword != password) {
            $scope.PasswordFieldMatch = false;
        } else {
            $scope.PasswordFieldMatch = false;
        }
        $scope.submitRegistrationForm = function (isValid) {
            
            if (isValid) {
                //Call the Register Api
                var registerViewModel = {
                    "Email": $scope.email,
                    "Password": $scope.password,
                    "ConfirmPassword": $scope.confirmPassword
                };
                var config = {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8;'
                    }
                }
                $scope.loading = true;
                $http.post("api/AuthApi/Register", JSON.stringify(registerViewModel), JSON.stringify(config))
                    .then(
                    (success) => {
                        if (success.data.status) {
                            //alert("We are registered & logged in");
                            //sessionStorage.setItem("userAccessResponse", JSON.stringify(success.data));
                            Authorization.setUser(success.data);
                            Authorization.authorized = true;
                            $state.go('dashboard.stats')
                        } else {
                            //alert(success.data.error.errorMessage);
                            $scope.authorizationMessage = success.data.error.errorMessage;
                            $scope.hideWarningAlert = false;
                            $scope.loading = false;
                        }
                    },
                    (error) => console.log(error)
                    );
                
            }
        };
    }])


