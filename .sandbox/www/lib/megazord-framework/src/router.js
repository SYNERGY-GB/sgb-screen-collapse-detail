'use strict';

/**
 * @ngdoc type
 * @name _router.Event
 * @module megazord
 * @description An event that is handled by a router.
 *
 * @property {String} name - The name of the event.
 * @property {Object} params - The parameters that will be passed to the target DataSource and Screen.
 */

/**
 * @ngdoc overview
 * @name routing
 */
angular.module('megazord')

    .factory('_routerState', function() {
        return {
            lastEvents: { }
        }
    })
    /**
     * @ngdoc provider
     * @name _globalRouterProvider
     * @module megazord
     * @description
     *
     * Allows the configuration of the router service.
     */
    .provider('_globalRouter', function () {
        var routes = null;

        /**
         * @ngdoc method
         * @name _globalRouterProvider#routes
         *
         * @param value {Object} Routing object that will be used in the application.
         */
        this.routes = function (value) {
            routes = value;
        };

        this.$get = ['$state', '$injector', '$ionicHistory', 'lodash', '_dataLoader', '_routerState', function ($state, $injector, $ionicHistory, _, _dataLoader, _routerState) {

            /**
             * @ngdoc service
             * @name _globalRouter
             * @module megazord
             *
             * @description
             *
             * Allows for triggering of event that cause a screen transition.
             */
            return {

                /**
                 * @ngdoc method
                 * @name _globalRouter#fireEvent
                 *
                 * @description
                 * Triggers a state transition. The application will lookup in the routing table
                 * to find the state to transition to, given the event that triggered the transition.
                 *
                 * If there is no entry in the routing table for the current state and event, an error
                 * will be logged and no state transition will occur.
                 *
                 * @param event {_globalRouter.Event} The event that will generate a transition.
                 */
                fireEvent: function (event) {
                    return this.fireEventInternal(event);
                },

                fireEventInternal: function(event) {
                    var currentState = $state.current;
                    var currentStateName = currentState.name;

                    var currentStateRoutes = routes[currentStateName];
                    if (!currentStateRoutes) {
                        console.error('No routes found for screen "' + currentStateName + '".');
                        return;
                    }
                    var state = currentStateRoutes[event.name];

                    if (!state) {
                        console.error('No route found for event "' + event.name + '" in screen "' + currentStateName + '"');
                        return;
                    }

                    return this.goToState(state, event);
                },

                fireConnectorEvent: function(event, dataConnector) {
                    var self = this;
                    var promise = _dataLoader.loadConnector(dataConnector, event);
                    if(dataConnector.resolveTransition) {
                        return $injector.invoke(dataConnector.resolveTransition, null, { _result: promise, _event: event })
                            .then(function(newEvent) {
                                self.fireEventInternal(newEvent);
                            })
                    }
                    else {
                        return promise.then(function() { self.fireEventInternal(event); });
                    }
                },

                /**
                 * @ngdoc method
                 * @name _globalRouter#goToState
                 *
                 * @description
                 * Triggers a state transition, bypassing the application's routing table.
                 *
                 * @param stateName The name of the state to transition into.
                 * @param event The event that will be passed to the state.
                 */
                goToState: function (stateName, event) {
                    var state = $state.get(stateName);
                    if (!state) {
                        console.error('State not found: "' + stateName + '"');
                        return;
                    }
                    var disableBack = state.disableBack;

                    //Data source invocation was moved to _dataLoader.

                    if (disableBack) {
                        $ionicHistory.nextViewOptions({disableBack: true});
                    }

                    _routerState.lastEvents[stateName] = event;

                    console.log('Transitioning...');

                    return $state.go(stateName);
                },

                createContextual: function(dataConnectors) {
                    return _.defaults({
                        fireEvent: function(event) {
                            if(dataConnectors) {
                                var connector = dataConnectors[event.name];
                                if(connector) {
                                    return this.fireConnectorEvent(event, connector);
                                }
                            }
                            return this.fireEventInternal(event);
                        }
                    }, this);
                }
            }
        }];
    });