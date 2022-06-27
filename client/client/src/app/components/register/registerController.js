/**
 * Created by Chip Bom on 12/30/2016.
 */
myApp.controller('registerController', ['$scope', '$http', 'registerService',
	function ($scope, $http, registerService) {

		//register Function khai báo qua scope-service để gọi bên html
		$scope.RegisterUser = function () {

			$('.loading').fadeIn(300);
			// if (validateUsername('#usr') == false) {
			// 	return;
			// }
			// if (!validateReEnterPassword('#passRegister', '#reEnterRegister')) {
			// 	return
			// }
			// if (!validatePassLength('#passRegister', '#reEnterRegister')) {
			// 	return
			// }
			let registerInfomation = {
				username: $scope.username,
				email: $scope.email,
				phone: $scope.phone,
				password: $scope.password
			};
			//Gọi service Register
			registerService.Register(registerInfomation, successCallback, errorCallback);
		};

		//function khi đăng ký thành công
		function successCallback(response) {
      $('.loading').fadeOut(300);
			console.log("Thành công, Thông tin: " + JSON.stringify(response));
			AlertMessage(1, 'Đăng ký thành công! Vui lòng kiểm tra hòm thư email để kích hoạt tài khoản');
		}

		//function khi đăng ký thất bại
		function errorCallback(error) {
      $('.loading').fadeOut(300);
			console.log("Đã có lỗi, thông tin lỗi: " + JSON.stringify(error));
			AlertMessage(0, 'Đăng ký thất bại: ' + error.data.error.message);
		}
	}
]);