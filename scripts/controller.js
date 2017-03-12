var mainApp = angular.module('mainApp', []);


mainApp.controller('stuff', ['$scope', function($scope){
  $scope.testCtr = 'Test World';
}]);
