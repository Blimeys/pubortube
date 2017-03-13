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
  $scope.testCtr = 'Test World';
  $scope.stationResult = jsonQueryStations.stationData().then(function(result){
    console.log(result.station);
  });
  $scope.hour = new Date().getHours().toString() + new Date().getMinutes().toString();
  $scope.minute = new Date().getMinutes().toString();
/*  $scope.timeNow = timeConverter.getTimeConverter().then(function(timeresult){
    console.log(timeresult.currentTime);*/
    var findthetime = timeConverter.getTime();
  $scope.timeNow = console.log(findthetime);
}]);
