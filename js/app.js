// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var GOTapp = angular.module('GOTapp', ['ionic', 'ngRoute', 'ngSanitize'])

.run(function($ionicPlatform,$rootScope,$location) {

  $rootScope.goHome = function(){
      //You can access this route anywhere in the application as it is in the rootScope
      $location.path('/list')
  };

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

GOTapp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/list',
    {
      controller: 'ListController',
      templateUrl: 'partials/list.html'
    })
    .when('/details/:itemId',{
      controller: 'DetailsController',
      templateUrl: 'partials/details.html'
    }) //:itemId stores a variable
    .otherwise({redirectTo: '/list'});
}]);

GOTapp.controller('ListController', function($scope, $http, $ionicLoading){
$scope.loadChars =function(){
  $ionicLoading.show(); //start spinner
  $http.get("http://www.anapioficeandfire.com/api/characters?page=45&pageSize=10") //request for the API
  .success(function(response){
    console.log(response);

    $scope.chars = response;

    $scope.newHouse = [];
    for(var i=0; i<response.length; i++){
      $scope.newHouse.push(response[i].allegiances[0].substring(44,47));//slice up the entire string so you only get the number at the end
    }
    console.log($scope.newHouse);

    $ionicLoading.hide(); //hides the ionic loader
  })
  .finally(function(){
    $scope.$broadcast('scroll.refreshComplete')
  });
}

$scope.loadChars();
});

//dont forget to add minification syntax
GOTapp.controller('DetailsController', ['$scope', '$http', '$ionicLoading', '$routeParams', function($scope, $http, $ionicLoading, $routeParams){

  $ionicLoading.show();
  //console.log($routeParams.itemId)

  $http.get("http://www.anapioficeandfire.com/api/characters?page=45&pageSize=10")
  .success(function(response){
    $scope.charDetail = response[$routeParams.itemId];
    $scope.charDetail.largeImage = $scope.charDetail.url.substring(48,52);

    $ionicLoading.hide();
  });
}]);
