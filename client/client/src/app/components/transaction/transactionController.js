/**
 * Created by Chip Bom on 1/5/2017.
 */
myApp.controller('transactionController', ['$scope', 'authenticateService', 'transactionService', '$cookies',
  function ($scope, authenticateService, transactionService, $cookies) {

    $scope.currentTab = 5;
    $scope.siteInformation = {
      transactionGet: {},
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

    //Gọi service lấy thông tin giao dịch
    transactionService.getTransaction(getSuccess, getError);

    function getSuccess(response) {
      $scope.siteInformation.transactionGet = response.data.data;
    }

    function getError(error) {
      validateErr(error, () => {
        console.log("Đã có lỗi, thông tin lỗi: " + JSON.stringify(error));
      });
    }

    //End lấy thông tin giao dịch


    //Lọc theo ngày
    //Đối tượng để chọn
    $scope.startDate = "";
    $scope.endDate = "";
    //Đối tượng để lọc
    $scope.filter = {
      startDate: "",
      endDate: ""
    };
    $scope.changeFilterValue = function () {
      $scope.filter = {
        startDate: $scope.startDate,
        endDate: $scope.endDate
      };
    };
    $scope.removeFilter = function () {
      $scope.startDate = "";
      $scope.endDate = "";
      $scope.changeFilterValue();
    };
    $scope.filterByDate = function (filter) {
      return function (trans) {
        if (filter.endDate == "" || filter.startDate == "") return true;
        let transDate = moment(trans.createdAt).valueOf();
        let endDate = moment(filter.endDate, 'DD-MM-YYYY').valueOf() + 86399999;
        let startDate = moment(filter.startDate, 'DD-MM-YYYY').valueOf();
        return transDate >= startDate && transDate <= endDate;
      };
    };
    //End lọc theo ngày
  }
]);
