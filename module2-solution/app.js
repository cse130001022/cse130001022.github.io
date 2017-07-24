(function(){
'use strict';

angular.module("ShoppingListCheckOff",[])
.controller("ToBuyController",ToBuyController)
.controller("AlreadyBoughtController",AlreadyBoughtController)
.service("ShoppingListCheckOffService",ShoppingListCheckOffService);

ToBuyController.$inject = ["ShoppingListCheckOffService"];

function ToBuyController(ShoppingListCheckOffService){
  var tblist = this;

  tblist.tbitems = ShoppingListCheckOffService.getToBuyList();

  tblist.buynow = function(itemIndex){
    ShoppingListCheckOffService.checkOff(itemIndex);
  };
}

AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];

function AlreadyBoughtController(ShoppingListCheckOffService){
  var ablist = this;

  ablist.abitems = ShoppingListCheckOffService.getBoughtList();

}

function ShoppingListCheckOffService(){
  var service = this;

  var to_buy = [{name:"Candy",quantity:"10 packets"},
  {name:"Chocolate",quantity:"10 bars"},
  {name:"Ice cream",quantity:"10 scoops"},
  {name:"Sweet",quantity:"10 boxes"},
  {name:"Soft Drink",quantity:"10 bottles"}];

  var bought = [];

  service.getToBuyList = function(){
    return to_buy;
  };

  service.getBoughtList = function(){
    return bought;
  };

  service.checkOff = function(itemIndex){
    var tempItem = to_buy[itemIndex];
    to_buy.splice(itemIndex,1);
    bought.push(tempItem);
  };


}

})();
