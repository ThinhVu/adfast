/**
 * Created by Chip Bom on 12/30/2016.
 */
myApp.service('registerService', ['$http', function ($http) {

	return {
		Register: function (data, successCallback, errorCallback) {
			const newKeyAndTime = getNewKeyAndTimeStamp();
			const option = {
				url: api.url + "api/user" ,
				method: "POST",
				data: $.param({
					k: newKeyAndTime.k,
					t: newKeyAndTime.t,
					username: data.username,
					email: data.email,
					password: data.password,
					phone: data.phone
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