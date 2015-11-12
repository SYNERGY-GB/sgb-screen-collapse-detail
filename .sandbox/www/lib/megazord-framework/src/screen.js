'use strict';

angular.module('megazord')

/**
 * @ngdoc provider
 * @name _screenProvider
 * @module megazord
 * @description Screen initialization and utility service.
 *
 *
 */
.provider('_screen', function() {
    /**
     * @ngdoc service
     * @name _screen
     * @module megazord
     * @description
     * Utility functions for screens.
     */
    this.$get = ['lodash', function(_) {
        return {

            /**
             * @ngdoc method
             * @name _screen#initialize
             * @param $scope {scope} The screen's scope.
             * @param _screenParams The screen's parameters.
             */
            initialize: function($scope, _screenParams) {
                $scope._screenParams = _screenParams;
                _.defaults(_screenParams, { title: _screenParams.screenName });
            }
        };
    }];
});