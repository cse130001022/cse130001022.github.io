(function(){

'use strict';

angular.module('LunchCheck',[])
.controller('LunchCheckController',LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope){
  $scope.menu ="";
  $scope.message = "";

  $scope.checkif = function(){
    if ($scope.menu==""){
      $scope.message = "Please enter data first";
    }
    else{
      var menu_list = $scope.menu.split(',');
      if (menu_list.length<=3){
        $scope.message = "Enjoy!";
      }
      else{
        $scope.message = "Too much!";
      }
    }
  };
};


})();
