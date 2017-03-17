var stationStatus = angular.module('stationStatus', []);



stationStatus.controller('stuff', ['$scope', 'statusFinder', 'timeConverter', function($scope, statusFinder,timeConverter) {
    var findTheTime = timeConverter.getTime();
    statusFinder.status().then(function(result) {
        if (result.station[findTheTime] > result.station.Average) {
            $scope.testing = "Station is busy";
        } else {
            $scope.testing = "Station is quiet";
        }
    });
}])
