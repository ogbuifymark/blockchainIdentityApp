/// <reference path="C:\Users\DELL\Documents\Visual Studio 2013\Projects\BlockchainIdentitySystem\BlockchainIdentitySystem\TestFolder/views/Home.html" />
/// <reference path="C:\Users\DELL\Documents\Visual Studio 2013\Projects\BlockchainIdentitySystem\BlockchainIdentitySystem\TestFolder/views/Home.html" />
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

var version = uuidv4();

app
    .config(function ($stateProvider, $urlRouterProvider) {
        // code to implement routing
        $urlRouterProvider.otherwise('/auth/login');

        $stateProvider

            //Auth state and nested states

            .state('auth', {
                abstract: true,
                url: '/auth',
                views: {
                    //the main template will be placed here (relatively named)
                    '': {
                        templateUrl: '/Templates/Auths/AuthBase.html?version=' + version,
                        controller: 'AuthBaseController'
                    },

                },
            })
            
            .state('auth.login', { //nested login state
                url: '/login',
                views: {
                    'login@auth': {
                        templateUrl: '/Templates/Auths/Login.html?version=' + version,
                        controller: 'LoginController'
                    }
                }
            })
            .state('auth.register', { //nested register state
                url: '/register',
                views: {
                    'register@auth': {
                        templateUrl: '/Templates/Auths/Register.html?version=' + version,
                        controller: 'RegisterController'
                    }
                }
            })
            
        .state('dashboard', {
                abstract: true,
                url: '/dashboard',
                views: {
                    //the main template will be placed here (relatively named)
                    '': {
                        templateUrl: '/Templates/IdentityHome/BaseDashboard.html?version=' + version,
                        controller: 'ACademicController'
                    },

                },
            })
        .state('dashboard.mykids', {
            url: '/mykids',
            views: {
                //the main template will be placed here (relatively named)
                'mykids@dashboard': {
                    templateUrl: '/Templates/IdentityHome/ChildList.html?version=' + version,
                    controller: 'ACademicController'
                },
                'healthChildren@dashboard.mykids': {
                    templateUrl: '/Templates/IdentityHome/HealthChildren.html?version=' + version,
                    controller: 'HealthController'
                },

            },
        })
        .state('dashboard.mykid-detail', {
            url: '/mykids/:id',
            views: {
                //the main template will be placed here (relatively named)
                'mykid-detail@dashboard': {
                    templateUrl: '/Templates/IdentityHome/ChildDetail.html?version=' + version,
                    controller: 'ChildDetailController'
                },

            },
        })
        .state('dashboard.child-register', { //nested register state
            url: '/child/register',
            views: {
                'child-register@dashboard': {
                    templateUrl: '/Templates/IdentityHome/Register.html?version=' + version,
                    controller: 'DashboardRegisterController'
                }
            }
        })
    });

