'use strict';

/* jshint -W098 */
angular.module('mean.bmr').controller('BmrController', ['$scope', 'Global', 'Bmr',
  function($scope, Global, Bmr) {
    $scope.global = Global;
    $scope.package = {
      name: 'bmr'
    };
  }
]);
