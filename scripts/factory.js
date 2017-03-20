var stationStatus = angular.module('stationStatus');

stationStatus.factory('jsonQueryStations', ['$filter', '$http', function($filter,$http){
  var station = {};
  return {
    stationData: function(selectedStation){
    return $http.get('tubeUsers.json')
      .then(function(results){
        var selectedStation = "waterloo";
        console.log(selectedStation);
        return {station: $filter('filter')(results.data, {Station: selectedStation })[0]};
  });
      return {
        station: station
      }
  }
}
}]);

stationStatus.factory('timeConverter', [function(){
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

stationStatus.factory('statusFinder', ['jsonQueryStations', function(jsonQueryStations, timeConverter){
   var generator = function(){
      return jsonQueryStations.stationData()
   }
   return {
    status: function(){
      return generator();
    }
   }
}])
