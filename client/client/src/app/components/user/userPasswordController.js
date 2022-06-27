/**
 * Created by Chip Bom on 1/11/2017.
 */
myApp.controller('userController', ['$scope', 'userService', 'authenticateService', '$cookies',
  function ($scope, userService, authenticateService, $cookies) {


    $scope.currentTab = 7;
    $scope.siteInformation = {
      userInformation: {}
    };

    //Gọi service lấy thông tin người dùng
    authenticateService.getUserInformation()
    .then(response => {
      //apply để binding trong hidden element. Nếu ko sẽ gặp một vài trường hợp ko bind được
      $scope.$apply(function () {
        $scope.siteInformation.userInformation = response;
      });
      $cookies.put('userInfo', JSON.stringify(response));
    })
    .catch(error => {
      //TODO Xử lý khi get thông tin người dùng thất bại
    });

    $scope.changePassword = function () {

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