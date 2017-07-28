(function (){
  'use strict';

  angular.module('data')
  .controller('ItemDetailController',ItemDetailController);

  ItemDetailController.$inject = ['item','$stateParams'];
  function ItemDetailController(item,$stateParams){
    var itemDetail = this;
    itemDetail.item = item;
    itemDetail.itemshort = $stateParams.itemshort;
  }

})();
