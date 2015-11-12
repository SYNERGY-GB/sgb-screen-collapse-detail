export var screens : Megazord.ContainerScreenList = {
  sandbox: {
    type: 'sgb-screen-collapse-detail',
    default: true,
    dataSource: {
      type: 'sgb-datasource-function',
      params: {
        data: function ($http) {
          //This is run on angular
          return $http.get('data.js')
            .then(function (result) {
              var data;
              return eval(result.data);
            });
        }
      }
    },
    params: {title: "screen_title",}
  }
};
