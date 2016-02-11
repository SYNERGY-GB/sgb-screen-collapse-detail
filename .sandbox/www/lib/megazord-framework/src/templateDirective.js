'use strict';

angular.module('megazord')
    /**
     * @ngdoc directive
     * @name mzTemplate
     * @module megazord
     * @restrict E
     * @scope
     * @param {String|function(Object)} templateType The name of the template to load. If a function is given, the function
     * will be called with the object provided in the `bindTo` parameter (if any), and the result of the call will be
     * used as the template name. If the value starts with an `@`, the template will be looked for in the screen's
     * template directory; otherwise it will be looked for in the application's template directory.
     * @param {Object} screenParams The screen's parameters. This must be the same object injected via `_screenParams`.
     * @param {Object} bindTo Data object to bind the template to.
     * @param {Object} params Any additional parameters you may wish to pass to the template.
     *
     * @description
     *
     * The `mzTemplate` directive can be used to dynamically switch a template for a portion of a screen. This enables
     * a higher level of customization for the final user of the screen, while keeping the screen's internals isolated.
     *
     */
    .directive('mzTemplate',[function() {
        return {
            restrict: 'E',
            template: '<ng-include src="_templateUrl"/>',
            scope: {
                templateType: '=',
                screenParams: '=',
                bindTo: '=', //Can be optional
                params: '=' //Can be optional
            },
            link : function (scope) {

                scope.$watch('templateType', function(templateUrl) {

                    if (!templateUrl) return; 

                    var templateType = templateUrl;
                    var bindToModel = scope.bindTo;
                    var templateName;
                    var screenType; 

                    if(!templateType) {
                        console.error('Must specify templateType attribute in mzTemplate directive.');
                        return;
                    }
                    if(!scope.screenParams) {
                        console.error('Must specify screenParams attribute in mzTemplate directive.');
                        return;
                    }

                    if(typeof templateType === 'function') {
                        //It's ok not to check for truthy bindToModel since it's optional.
                        templateName = templateType(bindToModel);
                    }
                    else {
                        templateName = templateType;
                    }

                    var prefix;
                    if (scope.screenParams.screenType.indexOf('@') == 0) {
                        screenType  = scope.screenParams.screenType.slice(1, scope.screenParams.screenType.length);
                        prefix = 'screens';
                    } else {
                        screenType = scope.screenParams.screenType;
                        prefix = 'lib'
                    }


                    if(templateName.indexOf('@') == 0) {
                        scope._templateUrl = prefix + '/' + screenType + '/templates/' + templateName.slice(1, templateName.length) + '.html';
                    }
                    else {
                        scope._templateUrl = 'templates/' + templateName;
                    }

                })
            }
        };
    }]);
