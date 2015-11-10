'use strict';

angular.module('sgb-screen-collapse-detail', ['megazord'])
    .controller('sgb-screen-collapse-detail-controller', ['$scope', '_router', '_screen', '_screenParams', '_data', function ($scope, _router, _screen, _screenParams, _data) {
        _screen.initialize($scope, _screenParams);
			$scope.data = _data;
   			$scope.collapses = $scope.data.collapse;
   			   		
    }]);