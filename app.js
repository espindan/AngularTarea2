//Angular.js app definition
var app = angular.module('east',[ ]);

app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.factory('WeatherData',['$http', '$q', function($http, $q) {

    var URL   = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=San%20Jose,cr&mode=json&units=metric&cnt=3';

    //Metodos publicos que retorna el factry
    return{

        /*
         * Returna TODAS las camisas
         */
        getAll : function(){

            var defer = $q.defer();//

            $http({
                method:'GET',
                url:URL,
                dataType: 'jsonp',
                headers: {'Content-Type': 'application/json'}
            }).
                success(function(data, status, headers, config){
                    defer.resolve(data);
                }).
                error(function(data, status, headers, config){
                    defer.reject(data);
                });

            return defer.promise;
        }
    }

}]);

//Controller
app.controller('OrigamyCtrl', ['$scope', 'WeatherData', function($scope, WeatherData){

    //Cargando datos ...
    $scope.loading = true;
    $scope.loaded = false;

    //Carga los datos del factory
    WeatherData.getAll().then( function(data){

        //Cuando los recive los guarda en un arreglo de tshirts
        $scope.WeatherListData = data;
        console.log(data);

        //Oculta el cargando ...
        $scope.loading = false;
        $scope.loaded = true;

    });


}]);

