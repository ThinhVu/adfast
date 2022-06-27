/**
 * Created by Chip Bom on 12/26/2016.
 */
myApp.service('loginService', ['$http', function ($http) {

	return {
		Login: function (userEmail, userPassword, successCallback, errorCallback) {
			const newAuthentication = getNewKeyAndTimeStamp();
			const option = {
				url: api.url + "login",
				method: "POST",
				data: $.param({
					k: newAuthentication.k,
					t: newAuthentication.t,
					email: userEmail,
					password: userPassword
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			};
			$http(option).then((response) => {
				successCallback(response);
			}, error => {
				errorCallback(error);
			});
		},
		Forgot: function (email, successCallback, errorCallback) {
			const newAuthentication = getNewKeyAndTimeStamp();
			const option = {
				url: api.url + "api/user/forgot-password",
				method: "POST",
				data: $.param({
					k: newAuthentication.k,
					t: newAuthentication.t,
					email: email,
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			};
			$http(option).then((response) => {
				successCallback(response);
			}, error => {
				errorCallback(error);
			});
		}
	}

}]);