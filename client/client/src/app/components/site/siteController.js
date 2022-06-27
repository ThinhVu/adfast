/**
 * Created by Chip Bom on 1/3/2017.
 */

myApp.controller('siteController', ['$scope', 'siteService', 'authenticateService', '$cookies',
	function ($scope, siteService, authenticateService, $cookies) {

		$scope.currentTab = 3;
		//Danh sách các danh mục
		$scope.category = [
			'Giáo dục'
			, 'Tin tức'
			, 'Thương mại điện tử'
			, 'Mỹ phẩm và chăm sóc sắc đẹp'
			, 'Thời trang'
			, 'Đời sống gia đình'
			, 'Video'
			, 'Tài chính'
			, 'Thực phẩm- nhà hàng'
			, 'Game'
			, 'Tìm việc'
			, 'Sức khỏe'
			, 'Xổ số'
			, 'Âm nhạc'
			, 'Bất động sản'
			, 'Hẹn hò qua mạng'
			, 'Du lịch'
			, 'Phương tiện đi lại'
			, 'Người làm marketing'
			, 'Di động'
		];

		$scope.choosingCategory = [];//Các danh mục đã chọn dưỡi dạng Object
		$scope.chosen = [];//Các danh mục đã chọn dưới dạng Array để stringify

		//Hàm khi thêm danh mục
		$scope.tagAdded = function (tag) {
			$scope.chosen.push(tag.text);
		};

		//Hàng khi xoá danh muc
		$scope.tagRemoved = function (tag) {
			//Gọi hàm remove bên common function
			$scope.chosen.remove(tag.text);
		};


		//Khai báo đối tượng siteInformation gồm thông tin người dùng và thông tin các site
		$scope.siteInformation = {
			siteGet: {},
			userInformation: {}
		};
		$scope.filterObject = {
			url: '',
			name: ''
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

		//Start get thông tin các trang web đã đăng ký
		$scope.getSite = function () {
			siteService.getSite(successCallback, errorCallback)
		};
		//function khi get thành công
		function successCallback(response) {
			console.log("Thành công, Thông tin: " + JSON.stringify(response));
			$scope.siteInformation.siteGet = response.data.data;
		}

		//function khi get thất bại
		function errorCallback(error) {
			validateErr(error, () => {
				console.log("Đã có lỗi, thông tin lỗi: " + JSON.stringify(error));
			});
		}

		//End get thông tin các trang web

		//Start tạo trang web mới
		$scope.createSite = function () {
			if (!validateUsername("#usr")) {
				return
			}
			// if  return
			// }(!validateUsername("#category")) {

			if (!validateUrl("#domain")) {
				return
			}

			siteService.createSite({
				name: $scope.name,
				url: $scope.url,
				category: $scope.chosen.toString(),
				isActive: $scope.isActive,
				maxPhone: $scope.maxPhone
			}, createSiteSuccess, createSiteError)
		};

		//Tạo trang mới thành công
		function createSiteSuccess() {
			$('#myModal').modal('hide');
			AlertMessage("1", "Tạo website thành công");
			$scope.getSite();
		}

		//Tạo trang mới thất bại
		function createSiteError(error) {
			validateErr(error, () => {
				console.log("Tạo website không thành công" + JSON.stringify(error));
				AlertMessage("0", error.data.message);
			});
		}

		//End tạo trang web mới

		//Bind dữ liệu lên dialog

		//Khai báo đối tượng dialog
		$scope.current = {
			name: '',
			url: '',
			category: '',
			isActive: '',
			maxPhone: ''
		};

		$scope.clipboardScript =
			"<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js'></script>" +
			"<script src='http://api.adfast.tech:8585/elpis.loader.js'></script>" +
			"<script>" +
			"window.addEventListener('onload',function () {" +
                "Elpis.Runner.start();" +
			"});" +
			"</script>";

		$scope.copyScript = function (text) {
			let $temp = $("<input>");
			$("body").append($temp);
			$temp.val(text).select();
			document.execCommand("copy");
			$temp.remove();
			AlertMessage("1", "Copy mã script thành công");
		};

		//Bắt đầu hàm binding
		$scope.bindingSite = function (i) {
			$scope.current = $scope.siteInformation.siteGet[i];
			// {
			//   name: $scope.siteInformation.siteGet[i].name,
			//   url: $scope.siteInformation.siteGet[i].url,
			//   category: $scope.siteInformation.siteGet[i].category,
			//   isActive: $scope.siteInformation.siteGet[i].isActive,
			//   maxPhone: $scope.siteInformation.siteGet[i].maxPhone
			// };
		};

		//Xoá textbox dialog khi modal bị tắt đi
		$('#siteInfoModal').on('hidden.bs.modal', function () {
			$scope.current = {
				id: '',
				name: '',
				url: '',
				category: '',
				isActive: '',
				maxPhone: ''
			};
		});
		//End bind

		//Start delete Site
		$scope.deleteSite = function (site) {
			let strContent = "<h4>Bạn có muốn xoá trang: <span style='color: darkred;font-weight: bold'>" +
				site.name + "</span> ?</h4>";
			bootbox.confirm(strContent, function (result) {
				if (result) {
					let site_id = site._id;
					siteService.deleteSite(site_id, deleteSuccess, deleteErr);
				}
			})
		};

		//Xoá thành công
		function deleteSuccess() {
			AlertMessage("1", "Xoá website thành công");
			$scope.getSite();
		}

		//Xoá thất bại
		function deleteErr(error) {
			validateErr(error, () => {
				AlertMessage("0", error.data.error);
				console.log("Xoá website không thành công" + JSON.stringify(error));
			});
		}

		//End delete site


		//Start thay đổi trạng thái
		$scope.active = function (_id, action) {
			let data = {
				_id: _id,
				action: action
			};
			siteService.changeActiveStatus(data, activeSuccess, activeErr);
		};
		//Sửa thành công
		function activeSuccess(response) {
			$('#siteInfoModal').modal('hide');
			AlertMessage("1", response.data.message);
			$scope.getSite();
		}

		//Sửa thất bại
		function activeErr(error) {
			validateErr(error, () => {
				AlertMessage("0", error.data.error);
				console.log("Sửa trạng thái không thành công" + JSON.stringify(error));
			});
		}

		//End thay đổi max phone

		//Start thay đổi trạng thái
		$scope.changeMaxPhone = function (site) {
			let data = {
				_id: site._id,
				maxPhone: site.maxPhone
			};
			siteService.changeMaxPhone(data, activeSuccess, activeErr);
		};

		//End thay đổi max phone
	}
]);