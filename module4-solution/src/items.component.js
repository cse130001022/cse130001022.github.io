(function () {
  'use strict';

  angular.module('data')
  .component('itemss',{
    templateUrl: 'src/templates/items.template.html',
    bindings: {
      items: '<'
    }
  });

})();
