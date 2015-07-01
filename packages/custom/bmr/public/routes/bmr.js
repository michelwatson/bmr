'use strict';

angular.module('mean.bmr').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('bmr example page', {
      url: '/bmr/example',
      templateUrl: 'bmr/views/index.html'
    });
  }
]);
