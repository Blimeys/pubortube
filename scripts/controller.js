var stationStatus = angular.module('stationStatus', []);



stationStatus.controller('currentStatus', ['$scope', 'statusFinder', 'timeConverter', function($scope, statusFinder,timeConverter) {
    var findTheTime = timeConverter.getTime();
    statusFinder.status().then(function(result) {
        if (result.station[findTheTime] > result.station.Average) {
            $scope.testing = "Station is busy";
        } else {
            $scope.testing = "Station is quiet";
        }
    });

}])

stationStatus.controller('sendStation', ['$scope', function($scope){

}])



stationStatus.controller('autoComplete', ['$scope', function($scope){
  $scope.getStation = function(selectedStation){
    console.log(selectedStation);
  }
}])
