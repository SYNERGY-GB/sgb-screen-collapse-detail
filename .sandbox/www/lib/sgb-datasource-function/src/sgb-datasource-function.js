'use strict';

angular.module('sgb-datasource-function', ['megazord'])
  .factory('sgb-datasource-function', ['$injector', '$q', function ($injector, $q) {
    return {
      getData: function (params) {
        if (!params.data || typeof params.data !== 'function') {
          throw new Error('You must define a data function if using sgb-datasource-function.');
        }

        var data = $injector.invoke(params.data);

        return $q.when(data);
      }
    };
  }]);
