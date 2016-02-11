'use strict';

angular.module('megazord')
    .provider('_dataLoader', function() {

        this.$get = ['$rootScope', '$injector', '$q', 'lodash', '$translate', '$ionicPopup', function($rootScope, $injector, $q, _, $translate, $ionicPopup) {
            return {
                loadConnector: function(config, event) {
                    if(event) {
                        var data = event.params;
                        if (config.inputTransform) {
                            data = $injector.invoke(config.inputTransform, null, {_data: data});
                        }
                        var newEvent = {name: event.name, params: data};
                        return this.load(config, newEvent);
                    }
                    else
                        return this.load(config, event);
                },
                loadInternal: function(config, event) {
                    var dataPromise;

                    if (config) {
                        var dataSource = $injector.get(config.type);
                        var transformFunction = config.outputTransform;
                        var dataSourceParams = config.params;
                        $rootScope.$broadcast('_dataLoadStarted', {source: config});
                        dataPromise = dataSource.getData(dataSourceParams, event)
                            .then(function (data) {
                                if (transformFunction) {
                                    data = $injector.invoke(transformFunction, null, {data: data});
                                }
                                return data;
                            })
                            .finally(function () {
                                $rootScope.$broadcast('_dataLoadFinished', {source: config});
                            });
                    }
                    else {
                        dataPromise = $q.when({}); //Empty data object if no dataSource is present
                    }

                    return dataPromise;
                },
                load: function (config, event) {
                    var promiseResult = this.loadInternal(config, event);

                    if(config.onError) {
                        return promiseResult.catch(function(error) {
                            //Check the dataSource's onError
                            var errorHandler = config.onError;
                            switch(errorHandler.perform) {
                                case 'message':
                                    $ionicPopup.alert({
                                        title: $translate.instant('error'),
                                        subTitle: $translate.instant(errorHandler.value)
                                    });
                                    return $q.reject({ message: errorHandler.value, error: error});
                                case 'transition':
                                    $injector.invoke(['_globalRouter', function(_globalRouter){
                                        _globalRouter.goToState(errorHandler.value, event);
                                    }]);
                                    return $q.reject(error);
                                case 'function':
                                    return $q.when($injector.invoke(errorHandler.value, null, { _error: error, _event: event }));
                                default:
                                    var message = 'Unsupported perform for dataSource onError: ' + errorHandler.perform;
                                    console.error(message);
                                    return $q.reject(message);
                            }
                        });
                    }
                    else {
                        return promiseResult;
                    }
                }
            }
        }];
    });