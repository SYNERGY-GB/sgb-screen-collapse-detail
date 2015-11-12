'use strict';

angular.module('app', ["ionic","megazord","pascalprecht.translate","sgb-screen-collapse-detail","sgb-datasource-function"])
    .run(function ($ionicPlatform, _globalRouter) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            setTimeout(function() {
              if(navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
              }
            }, 100);

            
            _globalRouter.goToState('sandbox', {name: "myEvent",params: {myEventValue: "value",},});
            
        });
    })

    .config(['$ionicConfigProvider', '$stateProvider', '$urlRouterProvider', '_globalRouterProvider', '$translateProvider', 'lodash', function ($ionicConfigProvider ,$stateProvider, $urlRouterProvider, _globalRouterProvider, $translateProvider, _) {

        _.forEach(translations, function(translation){
            $translateProvider.translations(translation.lang, translation.table);
        });

        $translateProvider.preferredLanguage('en_us');

        if(!ionic.Platform.isIOS())$ionicConfigProvider.scrolling.jsScrolling(false);

        $ionicConfigProvider.views.transition('platform');
        $ionicConfigProvider.views.forwardCache(true);
        $ionicConfigProvider.views.maxCache(10);
        $ionicConfigProvider.views.swipeBackEnabled(false);

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js

        _globalRouterProvider.routes({});

        $stateProvider

        
            .state('sandbox', {
                url: '/sandbox',
                

                views: {
                  
                    "": {
                      templateUrl: 'lib/sgb-screen-collapse-detail/templates/sgb-screen-collapse-detail.html',
                      controller: 'sgb-screen-collapse-detail-controller',
                      resolve: {
                        _dataConnectors: function() {
                          return {};
                        },
                        _router: function(_globalRouter, _dataConnectors, lodash) {
                          return _globalRouter.createContextual(lodash.cloneDeep(_dataConnectors));
                        },
                        _screenParams: function() {
                          return {title: "screen_title",screenName: "sandbox",screenType: "sgb-screen-collapse-detail",};
                        },
                        _event: function(lodash, _routerState) {
                         return lodash.cloneDeep(_routerState.lastEvents[this.name]);
                        }
                        
                          , _dataSource: function() {
                            return {type: "sgb-datasource-function",params: {data: function ($http) {
                    return $http.get('data.js')
                        .then(function (result) {
                        var data;
                        return eval(result.data);
                    });
                },},};
                          },
                           _data: function(_dataLoader, _dataSource, _event) {
                            return _dataLoader.load(_dataSource, _event);
                          }
                        
                      }
                    },
                  
                },

                
                
                cache: true,
                

            })
        

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/sandbox');
    }]);
