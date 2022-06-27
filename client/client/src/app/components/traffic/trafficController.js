/**
 * Created by Chip Bom on 1/5/2017.
 */
myApp.controller('trafficController', ['$scope', 'authenticateService', 'trafficService', '$cookies', 'siteService', '$location',
  function ($scope, authenticateService, trafficService, $cookies, siteService, $location) {


    $scope.currentCarrier = "";
    $scope.currentTab = 6;//Tab hienj tại
    $scope.siteInformation = {
      siteGet: [],//Thông tin site get về để hiện trong select box khi lọc
      trafficGet: [],//Thông tin traffic đã được get về
      userInformation: {},//Thông tin người dùng
      count: 0,//Tổng số traffic khi get về
      itemPerPage: $.urlParam('item') || "15"//Số lượng item mỗi trang trong pagination
    };
    $scope.currentSite = "";//Site hiện tại để lọc
    $scope.currentPage = 1;//Site hiện tại của dir-pagination

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

    //Gọi service lấy lại traffic khi lọc theo site
    $scope.getTraffic = function (site = "") {

      // TODO for url search
      // let searchObject = {
      //   item: $scope.siteInformation.itemPerPage
      // };
      // $location.search(searchObject);
      $scope.currentPage = 1;//Đưa pagination về trang đầu
      let siteAction;
      let countAction;

      //Kiểm tra site get
      if (site.trim() == "") {
        //Get tất cả site
        siteAction = {
          start: ($scope.currentPage - 1) * $scope.siteInformation.itemPerPage,
          action: 'filter-all',
          count: $scope.siteInformation.itemPerPage,
          carrier: ($scope.currentCarrier == "" ? undefined : $scope.currentCarrier)
        };
        countAction = {
          action: 'count-all',
          carrier: ($scope.currentCarrier == "" ? undefined : $scope.currentCarrier)
        }
      }
      else {
        //Get theo 1 site
        siteAction = {
          start: 0,
          action: 'filter-site',
          site: site.trim(),
          count: $scope.siteInformation.itemPerPage,
          carrier: ($scope.currentCarrier == "" ? undefined : $scope.currentCarrier)
        };
        countAction = {
          action: 'count-site',
          site: site.trim(),
          carrier: ($scope.currentCarrier == "" ? undefined : $scope.currentCarrier)
        }
      }
      //Lấy số lượng traffic khi lọc theo site
      trafficService.getTraffic(countAction, getTrafficCountSuccess, getError);

      //function klhi lấy số lượng site thành công
      function getTrafficCountSuccess(response) {
        $scope.siteInformation.count = response.data.data;

        // Gọi service lấy thông tin traffic
        trafficService.getTraffic(siteAction, getTrafficSuccess, getError);

      }

    };


    //Thưc hiện get Traffic lần đầu
    $scope.getTraffic();

    //Gọi service get site để binding trong selected box
    siteService.getSite(getSiteSuccessCallback, getError);

    //End lấy thông tin traffic


    //Page thay đổi
    $scope.pageChangeHandler = function (num) {
      //Get tiếp tham số từ (number-1)*2
      let numberToGet = (num - 1) * $scope.siteInformation.itemPerPage;
      if ($scope.siteInformation.trafficGet[numberToGet]._id) {
        return;
      }
      let data = {};
      if ($scope.currentSite.trim() == "") {
        data = {
          start: numberToGet,
          action: 'filter-all',
          count: $scope.siteInformation.itemPerPage,
          carrier: ($scope.currentCarrier == "" ? undefined : $scope.currentCarrier)
        };
      }
      else {
        data = {
          start: numberToGet,
          action: 'filter-site',
          site: $scope.currentSite.trim(),
          count: $scope.siteInformation.itemPerPage,
          carrier: ($scope.currentCarrier == "" ? undefined : $scope.currentCarrier)
        };
      }

      //get traffic mới push vào đối tượng traffic get
      trafficService.getTraffic(data, pushArray, getError);


    };

    $scope.exportData = function (type) {
      let id;
      if (!type) {
        id = 'exportable';
        let startItem = ($scope.currentPage - 1) * $scope.siteInformation.itemPerPage + 1;
        let endItem = ($scope.currentPage * $scope.siteInformation.itemPerPage) > $scope.siteInformation.count
          ? $scope.siteInformation.count : $scope.currentPage * $scope.siteInformation.itemPerPage;
        let dateTimeNow = moment().format('DD-MM-YYYY HH-mm-ss');
        let site = $scope.currentSite == "" ? "All Site" : $scope.currentSite.trim();
        let carrier = $scope.currentCarrier == "" ? "All Carrier" : $scope.currentCarrier;
        let excelString = "Report_" + site + "_" + carrier + "_" + startItem + "-" + endItem + "_" + dateTimeNow;

        let x = $('#' + id).tableExport(
          {
            formats: ["xlsx"],
            fileName: excelString,
          }
        );
        $('.btn.btn-default.xlsx').click();
        AlertMessage("1", 'Vui lòng đợi giây lát trong lúc chúng tôi chuẩn bị file');
        x.tableExport.remove();
      }
      else {
        let strContent = "<h4>Bạn có muốn xuất excel toàn bộ các bản ghi?</h4>";
        bootbox.confirm(strContent, confirmDialog);
        function confirmDialog(result) {
          if (result) {
            id = 'exportable-all';
            let data;
            trafficService.getAllTraffic(function (response) {
              data = response.data.data;
              let $table = $("<table></table>");
              let exportTable = $('#' + id).append($table);
              let $tableHead = $("<thead><tr><th>STT</th><th>Số điện thoại</th><th>Nhà mạng</th><th>Địa điểm</th><th>Url trang</th><th>Truy cập gần nhất</th> <th>Số lượt truy cập</th> </tr></thead>");
              $table.append($tableHead);
              let $tableBody = $("<tbody></tbody>");
              $tableBody.appendTo($table);
              for (let i = 0; i < data.length; i++) {
                let traffic = data[i];
                let $tr = $('<tr></tr>');
                $tr.appendTo($tableBody);
                $("<td>" + (i+1) + "</td>").appendTo($tr);
                $("<td>" + (traffic.phone==null?"":traffic.phone) + "</td>").appendTo($tr);
                $("<td>" + (traffic.carrier==null?"":traffic.carrier) + "</td>").appendTo($tr);
                $("<td>" + (traffic.city==null?"":traffic.city) + "</td>").appendTo($tr);
                $("<td>" + (traffic._site.name==null?"":traffic._site.name) + "</td>").appendTo($tr);
                $("<td>" + (moment(traffic.requestTime).format("DD-MM-YYYY HH:mm:ss")) + "</td>").appendTo($tr);
                $("<td>" + (traffic.accessNumber==null?"":traffic.accessNumber) + "</td>").appendTo($tr);
              }
              console.log($table);
              let dateTimeNow = moment().format('DD-MM-YYYY HH-mm-ss');
              let x = exportTable.tableExport(
                {
                  formats: ["xlsx"],
                  fileName: "Export All_" + dateTimeNow,
                }
              );
              $('.btn.btn-default.xlsx').click();
              AlertMessage("1", 'Vui lòng đợi giây lát trong lúc chúng tôi chuẩn bị file');
              $table.remove();
              x.tableExport.remove();
            }, getError)
          }
        }
      }

    };


    //Start callback function

    //function khi get site thành công
    function getSiteSuccessCallback(response) {
      console.log("Thành công, Thông tin: " + JSON.stringify(response));
      $scope.siteInformation.siteGet = response.data.data;
      // $scope.siteSelected.name = "Tất cả";
    }


    //Hàm để push đối tượng mới get về vào $scope.siteInformation.trafficGet
    function pushArray(response, num) {
      let currentPage = num / $scope.siteInformation.itemPerPage + 1;
      let data = response.data.data;
      for (let i = 0; i < data.length; i++) {
        let currentItem = (currentPage - 1) * $scope.siteInformation.itemPerPage + i;
        $scope.siteInformation.trafficGet[currentItem] = data[i];
      }

    }

    //Bắt đầu khi lấy số lượng thành công
    function getTrafficSuccess(response) {
      $scope.siteInformation.trafficGet = [];//Tạo mới đối tượng trafficGet
      $scope.siteInformation.trafficGet = response.data.data;//Gán đối tượng bằng dữ liệu get về
      let currentLength = $scope.siteInformation.trafficGet.length;//Số lượng site hiện tại

      //TODO comment this for test total-item attribute in dir-pagination
      let emptyObjectCount = $scope.siteInformation.count - currentLength;//Số lượng obbject rỗng cần thêm
      //
      //Push object rỗng vào array để pagination hiện thị đúng số trang
      for (let i = 0; i < emptyObjectCount; i++) {
        $scope.siteInformation.trafficGet.push({});//Push object rỗng
      }
    }

    //get error
    function getError(error) {
      $scope.siteInformation.trafficGet = [];
      validateErr(error, () => {
        console.log("Đã có lỗi, thông tin lỗi: " + JSON.stringify(error));
      });
    }
  }
]);
