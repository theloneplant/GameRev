var app = angular.module('app', []);

app.controller('MainController', function($scope) {
   $scope.header = { url: '/header' };
   $scope.footer = { url: '/footer' };
})