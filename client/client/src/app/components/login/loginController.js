/**
 * Created by Chip Bom on 12/26/2016.
 */

myApp.controller('loginController', ['$scope', '$http', 'loginService', '$cookies', '$location',
	function ($scope, $http, loginService, $cookies, $location) {

		//function Login với scope-service để gọi bên html
		$scope.Login = function () {
			//Gọi service Login
			$('.loading').fadeIn(300);
			loginService.Login($scope.email, $scope.password, LoginSuccess, LoginError);
		};

		$scope.showForgotDialog = function () {
			$('#forgotPassword').modal('show');
		};

		$scope.forgotPassword = function () {
			$('.loading').fadeIn(300);
			loginService.Forgot($scope.forgotEmail, forgotSuccess, forgotErr)
		};

		function forgotSuccess(response) {
			$('.loading').fadeOut(300);
			AlertMessage(1, 'Vui lòng kiểm tra email để lấy lại mật khẩu');
		}

		function forgotErr(err) {
			$('.loading').fadeOut(300);
			AlertMessage(0, err.data.error);
		}

		//Function khi login thành công
		function LoginSuccess(response) {
			$('.loading').fadeOut(300);
			console.log("Thành công, Thông tin: " + JSON.stringify(response.data));

			//Lưu lại token vào cookies
			$cookies.put('token', response.data.token);

			//Hiện thông báo đăng nhập thành công
			AlertMessage(1, 'Đăng nhập thành công');
			$location.path('/site')
		}


		//Function khi login thất bại
		function LoginError(error) {
			$('.loading').fadeOut(300);
			console.log("Đã có lỗi, thông tin lỗi: " + JSON.stringify(error));
			AlertMessage(0, error.data.error, 7000);
		}


	}
]);