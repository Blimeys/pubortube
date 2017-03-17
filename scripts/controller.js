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
    getTime: function(){
      return getTimeConverter();

    }
  }
}]);

mainApp.factory('statusFinder', ['jsonQueryStations', 'timeConverter', function(jsonQueryStations, timeConverter){
  var findTheTime = timeConverter.getTime();
  var pub = "pub";
  var home = "home";
  var generator = function(){
      return jsonQueryStations.stationData().then(function(result){
      console.log("Current local time: " + findTheTime);
      console.log("Station selected: " + result.station.Station);
      console.log("Passenger count at the station: " + result.station[findTheTime]);
      console.log("Average passenger count: " + result.station.Average)
      if (result.station[findTheTime]>result.station.Average){
        return pub;
        } else{
        return home;
        }

      });
    }
  return {
    status: function(){
      return generator();
    }
    }
}])


mainApp.controller('stuff', ['$scope', 'statusFinder', function($scope, statusFinder){
 var data = statusFinder.status();
 $scope.testing = data;
}])
