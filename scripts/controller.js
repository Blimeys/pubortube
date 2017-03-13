var mainApp = angular.module('mainApp', []);


mainApp.factory('jsonQueryStations', ['$filter', '$http', function($filter,$http){
  var station = {};
  return {
    stationData: function(){
    return $http.get('tubeUsers.json')
      .then(function(results){
        var currentStation = "canada";
        return {station: $filter('filter')(results.data, {Station: currentStation })[0]};
  });
      return {
        station: station
      }
  }
}
}]);
mainApp.factory('timeConverter', [function(){
  var currentTime = "";
  var getTimeConverter = function findTimeStringIt (){
            var hour = new Date().getHours();
        var minute = new Date().getMinutes();
        if (minute<16){
          var minuteLower = 0;
          var minuteUpper = 15;
          if (minuteLower === 0){
            var currentTime = hour.toString() + minuteLower.toString() + "0-" + hour.toString() + minuteUpper.toString();
            return currentTime;
          } else {
          var currentTime = hour.toString() + minuteLower.toString() + "-" + hour.toString() + minuteUpper.toString();
          return currentTime;
          }
        } else if (minute>15 && minute<31){
          var minuteLower = 16;
          var minuteUpper = 30;
          var currentTime = hour.toString() + minuteLower.toString() + "-" + hour.toString() + minuteUpper.toString();
          return currentTime;
        } else if (minute>30 && minute<46){
          var minuteLower = 31;
          var minuteUpper = 45;
          var currentTime = hour.toString() + minuteLower.toString() + "-" + hour.toString() + minuteUpper.toString();
          return currentTime;
        } else if (minute>45 && minute<=59){
          var minuteLower = 46;
          var minuteUpper = 59;
          var currentTime = hour.toString() + minuteLower.toString() + "-" + hour.toString() + minuteUpper.toString();
          return currentTime;
        }
  }


  return {
    getTime: function timeData(){
      return getTimeConverter();

    }
  }

}])


mainApp.controller('stuff', ['$scope', 'jsonQueryStations', 'timeConverter', function($scope,jsonQueryStations, timeConverter){
  $scope.stationResult = jsonQueryStations.stationData().then(function(result){
    var findthetime = timeConverter.getTime();
    var Average = "Average";
    console.log(findthetime);
    console.log(result.station[findthetime]);
    console.log(result.station.Station);
    var actualLevel = result.station[findthetime];
    var averageLevel = result.station.Average;
    $scope.stationSelected = result.station.Station;
    $scope.currentTraffic = "this is the current passenger count: " + actualLevel;
    $scope.averageTraffic = "this is the average passenger count: " + averageLevel;
    var whatToDo = "";
     if (actualLevel>averageLevel){
      return $scope.whatToDo = "Go to the pub";
    } else{
      return $scope.whatToDo = "Go home";
    }
    return $scope.whatToDo = whatToDo;
  });
}]);
