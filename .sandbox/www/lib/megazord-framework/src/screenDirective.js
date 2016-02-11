'use strict';

angular.module('megazord')
/**
 * @ngdoc directive
 * @name mzScreen
 * @module megazord
 * @restrict A
 * @element ion-view
 *
 * @description
 *
 * The `mzScreen` directive is used to mark an element as the root of a screen. It will usually be placed
 * as an attribute of an `ionView` directive.
 */
    .directive('mzScreen', ['lodash', function(_){
       return {
           restrict: 'A',
           link: function(scope, el, attrs) {
               //Simply add the screen type and screen instance name as classes to the element.
               var screenName = _.last(scope._screenParams.screenName.split('.'));
               var screenType = scope._screenParams.screenType;
               el.addClass(screenType);
               el.addClass(screenName);
           }
       }
    }]);
