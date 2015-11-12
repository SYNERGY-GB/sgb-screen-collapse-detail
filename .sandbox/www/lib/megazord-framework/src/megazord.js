'use strict';

/**
 * @ngdoc module
 * @name megazord
 *
 * @description
 * This is the module for the framework stuff.
 */
angular.module('megazord', ['ngLodash', 'pascalprecht.translate']);

require('./router');
require('./screenDirective');
require('./templateDirective');
require('./screen');
require('./dataLoader');