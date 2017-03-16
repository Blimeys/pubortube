var mainApp = angular.module('mainApp', []);


mainApp.factory('jsonQueryStations', ['$filter', '$http', function($filter,$http){
  var station = {};
  return {
    stationData: function(){
    return $http.get('tubeUsers.json')
      .then(function(results){
        var currentStation = "waterloo";
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
}]);

mainApp.factory('busyFinder', ['jsonQueryStations', 'timeConverter', function(jsonQueryStations, timeConverter){
  var stationResult = {};
  return {
    generator: function(){
    var stationResult = jsonQueryStations.stationData().then(function(result){
    var findthetime = timeConverter.getTime();
    var Average = "Average";
    console.log(result);
    console.log("Current local time: " + findthetime);
    console.log("Station selected: " + result.station.Station);
    console.log("Passenger count at the station: " + result.station[findthetime]);
    console.log("Average passenger count: " + result.station.Average)
    var actualLevel = result.station[findthetime];
    var averageLevel = result.station.Average;
    function whatToDoNow(){
    var whatToDo = "";
     if (actualLevel>averageLevel){
      return whatToDo = "pub";
    } else{
      return whatToDo = "home";
    }
    }

    stationResult.actualLevel = actualLevel;
    stationResult.averageLevel = averageLevel;
    stationResult.stationSelected = result.station.Station;
    stationResult.whatToDo = whatToDoNow();
  });
    return {
      stationResult: stationResult
      }
  }
};
}])


mainApp.controller('stuff', ['$scope', 'busyFinder', function($scope, busyFinder){
 var dataResult = busyFinder.generator();
 console.log(dataResult);
 var whatNow = dataResult.stationResult;
 $scope.testing = whatNow;
}]);
