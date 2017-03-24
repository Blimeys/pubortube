var stationStatus = angular.module('stationStatus', []);



stationStatus.controller('stationEntry', ['$scope', 'jsonQueryStations', 'timeConverter', function($scope, jsonQueryStations, timeConverter) {
  $scope.getStation = function () {
    var findTheTime = timeConverter.getTime();
    $scope.noStation = "";
    jsonQueryStations.stationData($scope.selectedStation).then(function(result){
          if ($scope.selectedStation == null || $scope.selectedStation == undefined){
            $scope.noStation = "Please enter a station name";
          } else if (result.station[findTheTime] > result.station.Average) {
            $scope.stationName = result.station.Station;
            $scope.stationResults = result.station.Station + " is busy, go to the pub";
            $scope.icon = "typcn typcn-beer";
            console.log(result.station);
          } else if (result.station[findTheTime] <= result.station.Average){
            $scope.stationName = result.station.Station;
            $scope.stationResults = result.station.Station + " is quiet, go home";
            $scope.icon = "typcn typcn-home";
            console.log(result.station);
            }
        else {
            console.log(result.station);
        }
      }
    )
  }

}])

