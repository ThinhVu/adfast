/**
 * Created by Chip Bom on 1/12/2017.
 */
myApp.controller('dialogController', function ($scope, $http, userService, $compile) {
  $scope.changePasswordUrl = 'app/shared/template/changePasswordDialog.html';

  $scope.showDialog = function (url) {
    $('#changePassModal').modal('show');
  };

});