(function (){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath','https://davids-restaurant.herokuapp.com')
.directive('foundItems',FoundItemsDirective);


function FoundItemsDirective(){
  var ddo = {
    templateUrl : 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController(){
  var list = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var list = this;

  list.itemName = "";

  list.getMatchedItems = function(searchTerm){
    if (searchTerm.length==0){
      list.found=[];
    }
    else{
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

      promise.then(function(response){
        list.found = response;
      })
      .catch(function(error){
        console.log("Something went terribly wrong!");
      });
    }
  };

  list.removeItem = function(itemIndex){
    list.found.splice(itemIndex,1);
  };
}


MenuSearchService.$inject = ['$http','ApiBasePath'];
function MenuSearchService($http,ApiBasePath){
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    return $http({
      method: "GET",
      url: (ApiBasePath + '/menu_items.json'),
    })
    .then(function (response){
      var temp = response.data['menu_items'];
      var foundItems = [];
        for(var i=0;i<temp.length;i++){
          if (temp[i].description.toLowerCase().indexOf(searchTerm)!==-1){
            foundItems.push(temp[i]);
          }
        }
      return foundItems;
    });
  };
}

})();
