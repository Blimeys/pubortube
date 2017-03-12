var mainApp = angular.module('mainApp', []);


mainApp.factory('jsonQueryStations', ['$filter', '$http', function($filter,$http){
  var station = {};
  return {
    stationData: function(){
    return $http.get('tubeUsers.json')
      .then(function(results){
        var currentStation = "Baker Street";
        return {station: $filter('filter')(results.data, {Station: currentStation })[0]};
  });
      return {
        station: station
      }
  }
}
}]);

mainApp.controller('stuff', ['$scope', 'jsonQueryStations', function($scope,jsonQueryStations){
  $scope.testCtr = 'Test World';
  $scope.stationResult = jsonQueryStations.stationData().then(function(result){
    console.log(result.station);
  });
}]);
