(function(){
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('home',{
      url: '/',
      templateUrl: 'src/templates/home.template.html'
    })

    .state('categories',{
      url: '/categories',
      templateUrl: 'src/templates/main-categories.template.html',
      controller: 'CategoriesListController as categoriesList',
      resolve: {
        items: ['MenuDataService', function(MenuDataService){
          return MenuDataService.getAllCategories().then(function (items){
            return items.data;
          });
        }]
      }
    })

    .state('categories.itemDetail',{
      url: '/item-detail/{itemshort}',
      templateUrl: 'src/templates/main-items.template.html',
      controller: 'ItemDetailController as itemDetail',
      resolve: {
        item: ['$stateParams','MenuDataService',function($stateParams,MenuDataService){
          return MenuDataService.getItemsForCategory($stateParams.itemshort).
          then(function (item){
            return item.data["menu_items"];
          });
        }]
      }
    });
  }

})();
