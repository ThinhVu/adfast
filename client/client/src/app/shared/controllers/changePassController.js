/**
 * Created by Chip Bom on 1/12/2017.
 */
/**
 * Created by Chip Bom on 1/11/2017.
 */
myApp.controller('changePassword', ['$scope', 'userService',
  function ($scope, userService) {


    $scope.changePassword = function () {

      console.log($scope.captcha);
      if (!validateReEnterPassword('#pass','#reEnter')){
        return
      }

      userService.changePassword({
        oldPassword: $scope.userCurentPass,
        newPassword: $scope.userNewPass
      }, changeSuccess, errCallback)
    };

    function changeSuccess(response) {
      AlertMessage('1', "Đổi mật khẩu thành công");
      console.log("Thành công, Thông tin: " + JSON.stringify(response));
      $scope.siteInformation.siteGet = response.data.data;
    }

    function errCallback(error) {
      AlertMessage('0', error.data.error  );
      validateErr(error, () => {
        console.log("Đã có lỗi, thông tin lỗi: " + JSON.stringify(error));
      });
    }
  }
]);