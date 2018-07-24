var app = angular.module("myappText", ['ui.router', 'angularUtils.directives.dirPagination'])

app.service('Authorization', function ($state) {
    this.authorized = false;
    this.memorizedState = null;
    this.username = null;
    this.access_token = null;
    this.invalid_access_message = null;
    console.log(this);
    var setWalletGlobals = function (walletGlobalsJson) {
        sessionStorage.setItem("walletGlobals", JSON.stringify(walletGlobalsJson));
        console.log(walletGlobalsJson);
    }
    var getWalletGlobals = function () {
        var walletGlobalsJsonString = sessionStorage.getItem("walletGlobals");
        if (walletGlobalsJsonString != null) {
            var walletGlobalsJson = JSON.parse(walletGlobalsJsonString);
            return walletGlobalsJson;
        }
        return null;
    }

    var setUser = function (userAccessResponse) {
        sessionStorage.setItem("userAccessResponse", JSON.stringify(userAccessResponse));
    }
    var getUser = function () {
        var userAccessResponseJsonString = sessionStorage.getItem("userAccessResponse");
        if (userAccessResponseJsonString != null) {
            var userAccessResponse = JSON.parse(userAccessResponseJsonString);
            return userAccessResponse;
        }
        $state.go('auth.login');
    }

    var setInvalidAcessMessage = function (message) {
        this.invalid_access_message = message;
    }
    var clear = function () {
        this.authorized = false;
        this.memorizedState = null;
        this.username = null;
        this.access_token = null;
        this.invalid_access_message = null;

        sessionStorage.clear();
    },
        go = function (fallback) {
            this.authorized = true;
            this.targetState = this.memorizedState ? this.memorizedState : fallback;
            $state.go(targetState);
        },
        addUser = function (_username, _accessToken) {
            this.username = _username;
            this.access_token = _accessToken;
        };

    return {
        authorized: this.authorized,
        memorizedState: this.memorizedState,
        setUser: setUser,
        getUser: getUser,
        go: go,
        clear: clear,
        setInvalidAcessMessage: setInvalidAcessMessage
    };
});

app.run(['$rootScope', '$state', 'Authorization', function ($rootScope, $state, Authorization) {


    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        var userJson = Authorization.getUser();
        if (Authorization.getUser() != null) { // user session has not expired
            Authorization.authorized = true; // reset authorized to true if the user is already logged in and is trying to refresh page
        } else {

            $state.go(toState.name);
        }


        if (!Authorization.authorized && _.has(toState, 'data.authorization') && _.has(toState, 'data.redirectTo')) {// if you are not authorized
            if (_.has(toState, 'data.memory') && toState.data.memory) {
                Authorization.memorizedState = toState.name;
                console.log("page to redirect to " + toState.name);
                $state.go(toState.data.redirectTo, {
                    redirect: toState.name
                });

            } else {
                $state.go(toState.data.redirectTo);
            }
            Authorization.setInvalidAcessMessage("Sign in to view this page");
        }
        else if (Authorization.authorized && _.has(toState, 'data.authorization')) { //if you are authorized   and the state has authorization property          
            if (Authorization.authorized && _.has(toState, 'data.userRole')) { //if you are in a state that has role property

                if (Authorization.getUser().user_role === toState.data.userRole) {
                    $state.go(toState.name);
                } else {
                    Authorization.setInvalidAcessMessage("You do not have access to view this page");
                    $state.go(toState.data.redirectTo, {
                        redirect: toState.name
                    });

                }

            } else {
                $state.go(toState.name);
            }


        }
    });


}]);

app.directive('qrcode', ['$window', function ($window) {

    var canvas2D = !!$window.CanvasRenderingContext2D,
        levels = {
            'L': 'Low',
            'M': 'Medium',
            'Q': 'Quartile',
            'H': 'High'
        },
        draw = function (context, qr, modules, tile, color) {
            for (var row = 0; row < modules; row++) {
                for (var col = 0; col < modules; col++) {
                    var w = (Math.ceil((col + 1) * tile) - Math.floor(col * tile)),
                        h = (Math.ceil((row + 1) * tile) - Math.floor(row * tile));

                    context.fillStyle = qr.isDark(row, col) ? color.foreground : color.background;
                    context.fillRect(Math.round(col * tile),
                        Math.round(row * tile), w, h);
                }
            }
        };

    return {
        restrict: 'E',
        template: '<canvas class="qrcode"></canvas>',
        link: function (scope, element, attrs) {
            var domElement = element[0],
                $canvas = element.find('canvas'),
                canvas = $canvas[0],
                context = canvas2D ? canvas.getContext('2d') : null,
                download = 'download' in attrs,
                href = attrs.href,
                link = download || href ? document.createElement('a') : '',
                trim = /^\s+|\s+$/g,
                error,
                version,
                errorCorrectionLevel,
                data,
                size,
                modules,
                tile,
                qr,
                $img,
                color = {
                    foreground: '#000',
                    background: '#fff'
                },
                setColor = function (value) {
                    color.foreground = value || color.foreground;
                },
                setBackground = function (value) {
                    color.background = value || color.background;
                },
                setVersion = function (value) {
                    version = Math.max(1, Math.min(parseInt(value, 10), 40)) || 5;
                },
                setErrorCorrectionLevel = function (value) {
                    errorCorrectionLevel = value in levels ? value : 'M';
                },
                setData = function (value) {
                    if (!value) {
                        return;
                    }

                    data = value.replace(trim, '');
                    qr = qrcode(version, errorCorrectionLevel);
                    qr.addData(data);

                    try {
                        qr.make();
                    } catch (e) {
                        var newVersion;
                        if (version >= 40) {
                            throw new Error('Data is too long', e);
                        }
                        newVersion = version + 1;
                        setVersion(newVersion);
                        console.warn('qrcode version is too low and has been incremented to', newVersion)
                        setData(value);
                        return;
                    }

                    error = false;
                    modules = qr.getModuleCount();
                },
                setSize = function (value) {
                    size = parseInt(value, 10) || modules * 2;
                    tile = size / modules;
                    canvas.width = canvas.height = size;
                },
                render = function () {
                    if (!qr) {
                        return;
                    }

                    if (error) {
                        if (link) {
                            link.removeAttribute('download');
                            link.title = '';
                            link.href = '#_';
                        }
                        if (!canvas2D) {
                            domElement.innerHTML = '<img src width="' + size + '"' +
                                'height="' + size + '"' +
                                'class="qrcode">';
                        }
                        scope.$emit('qrcode:error', error);
                        return;
                    }

                    if (download) {
                        domElement.download = 'qrcode.png';
                        domElement.title = 'Download QR code';
                    }

                    if (canvas2D) {
                        draw(context, qr, modules, tile, color);

                        if (download) {
                            domElement.href = canvas.toDataURL('image/png');
                            return;
                        }
                    } else {
                        domElement.innerHTML = qr.createImgTag(tile, 0);
                        $img = element.find('img');
                        $img.addClass('qrcode');

                        if (download) {
                            domElement.href = $img[0].src;
                            return;
                        }
                    }

                    if (href) {
                        domElement.href = href;
                    }
                };

            if (link) {
                link.className = 'qrcode-link';
                $canvas.wrap(link);
                domElement = domElement.firstChild;
            }

            setColor(attrs.color);
            setBackground(attrs.background);
            setVersion(attrs.version);
            setErrorCorrectionLevel(attrs.errorCorrectionLevel);
            setSize(attrs.size);

            attrs.$observe('version', function (value) {
                if (!value) {
                    return;
                }

                setVersion(value);
                setData(data);
                setSize(size);
                render();
            });

            attrs.$observe('errorCorrectionLevel', function (value) {
                if (!value) {
                    return;
                }

                setErrorCorrectionLevel(value);
                setData(data);
                setSize(size);
                render();
            });

            attrs.$observe('data', function (value) {
                if (!value) {
                    return;
                }

                setData(value);
                setSize(size);
                render();
            });

            attrs.$observe('size', function (value) {
                if (!value) {
                    return;
                }

                setSize(value);
                render();
            });

            attrs.$observe('color', function (value) {
                if (!value) {
                    return;
                }

                setColor(value);
                render();
            });

            attrs.$observe('background', function (value) {
                if (!value) {
                    return;
                }

                setBackground(value);
                render();
            });

            attrs.$observe('href', function (value) {
                if (!value) {
                    return;
                }

                href = value;
                render();
            });
        }
    };
}])
.directive("ngFileSelect", function (fileReader, $timeout) {
    return {
        scope: {
            ngModel: '='
        },
        link: function ($scope, el) {
            function getFile(file) {
                fileReader.readAsDataUrl(file, $scope)
                  .then(function (result) {
                      $timeout(function () {
                          $scope.ngModel = result;
                      });
                  });
            }

            el.bind("change", function (e) {
                var file = (e.srcElement || e.target).files[0];
                getFile(file);
            });
        }
    };
});

app.factory("fileReader", function ($q, $log) {
    var onLoad = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function (reader, scope) {
        return function (event) {
            scope.$broadcast("fileProgress", {
                total: event.total,
                loaded: event.loaded
            });
        };
    };

    var getReader = function (deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL
    };
});
app.filter('FilterAcademic', function () {
    return function (items) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.schoolInfo.needAcaAttension) {
                filtered.push(item);
            }
        }
        return filtered;
    };
});

function ACademicController($scope, $http) {

    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.filteredAcademic = [];    
    $http.get("api/apiendpoint").then(function(data) {
            $scope.sponseoredchildren = data.data;
            console.log($scope.sponseoredchildren)
            var datacount = $scope.sponseoredchildren.length
            for (var i = 0; i < datacount; i++) {
                if ($scope.sponseoredchildren[i].schoolInfo.needAcaAttension) {
                    $scope.filteredAcademic.push($scope.sponseoredchildren[i]);
                }
            }
            
        });
    $scope.pageChangeHandler = function (num) {
        console.log('meals page changed to ' + num);
    };
    
    $scope.getSponsorPage = function (childsId) {
        $http.get("api/apiendpoint/" + childsId).then(function (data) {
            $scope.sponsorchild = data.data;
            console.log($scope.sponsorchild)
        })
    }
}

function OtherController($scope) {
    $scope.pageChangeHandler = function (num) {
        console.log('going to page ' + num);
    };
}
function HealthController($scope, $http) {

    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.filteredHealth = [];
    $http.get("api/apiendpoint").then(function (data) {
        $scope.sponseoredchildren = data.data;
        console.log($scope.sponseoredchildren)
        var datacount = $scope.sponseoredchildren.length
        for (var i = 0; i < datacount; i++) {
            if ($scope.sponseoredchildren[i].healthInfo.needMedAttension) {
                $scope.filteredHealth.push($scope.sponseoredchildren[i]);
            }
        }
    });
    //$scope.getSponsorPage = function (childsId) {
    //    $http.get("api/apiendpoint/" + childsId).then(function (data) {
    //        $scope.sponsorchild = data.data;
    //        console.log($scope.sponsorchild)
    //    })
    //}
}






