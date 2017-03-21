var stationStatus = angular.module('stationStatus', []);



stationStatus.controller('stationEntry', ['$scope', 'jsonQueryStations', 'timeConverter', function($scope, jsonQueryStations, timeConverter) {
  $scope.getStation = function () {
    var thisStation = $scope.selectedStation;
    var findTheTime = timeConverter.getTime();
    jsonQueryStations.stationData($scope.selectedStation).then(function(result){
          if (result.station[findTheTime] > result.station.Average) {
            $scope.stationName = result.station.Station + " is busy";
            console.log(result.station);
        } else if (result.station[findTheTime] <= result.station.Average){
            $scope.stationName = result.station.Station + " is quiet";
            console.log(result.station);
            }
        else {
            $scope.testing = "Cannot find station";
        }
      }
    )
  }

}])

stationStatus.directive('myStation', function(){
  return{
    restrict: 'E',
    templateUrl : 'goHome.html'
  }
})
