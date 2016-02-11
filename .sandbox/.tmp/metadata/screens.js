exports.screens = {
    sandbox: {
        type: 'sgb-screen-collapse-detail',
        default: true,
        dataSource: {
            type: 'sgb-datasource-function',
            params: {
                data: function ($http) {
                    return $http.get('data.js')
                        .then(function (result) {
                        var data;
                        return eval(result.data);
                    });
                }
            }
        },
        params: {}
    }
};
