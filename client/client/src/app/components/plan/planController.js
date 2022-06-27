/**
 * Created by Chip Bom on 1/5/2017.
 */
myApp.controller('planController', ['$scope', 'authenticateService', 'planService', '$cookies',
  function ($scope, authenticateService, planService, $cookies) {

    $scope.currentTab = 4;
    $scope.siteInformation = {
      planGet: {},
      userInformation: {}
    };

    //Gọi service lấy thông tin người dùng
    authenticateService.getUserInformation()
    .then(response => {
      $scope.$apply(function () {
        $scope.siteInformation.userInformation = response;
      });
      $cookies.put('userInfo', JSON.stringify(response));
    })
    .catch(error => {
      //TODO Xử lý khi get thông tin người dùng thất bại
    });

    //Gọi service lấy thông tin gói cước
    planService.getPlan(getSuccess, getError);

    function getSuccess(response) {
      $scope.siteInformation.planGet = response.data.data;
    }

    function getError(error) {
      validateErr(error, () => {
        console.log("Đã có lỗi, thông tin lỗi: " + JSON.stringify(error));
      });
    }

    //End lấy thông tin gói cước

    //Start Binding gói cước
    $scope.currentPlan = {};
    $scope.bindPlan = function (plan) {
      $scope.currentPlan = plan;
    };
    //End
  }
]);
