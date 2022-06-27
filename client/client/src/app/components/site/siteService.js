/**
 * Created by Chip Bom on 1/3/2017.
 */
myApp.service('siteService', ['$http', '$cookies', function ($http, $cookies) {

	this.getSite = function (successCallback, errorCallback) {
		const newKeyAndTime = getNewKeyAndTimeStamp();
		let accessToken = $cookies.get('token');
		const option = {
			url: api.url + "api/site",
			method: "GET",
			params: {
				t: newKeyAndTime.t,
				k: newKeyAndTime.k
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				authorization: 'bearer ' + accessToken
			}
		};
		$http(option).then((response) => {
			successCallback(response);
		}, error => {
			errorCallback(error);
		});
	};


	this.createSite = function (data, successCallback, errorCallback) {
		const newKeyAndTime = getNewKeyAndTimeStamp();
		let accessToken = $cookies.get('token');
		const option = {
			url: api.url + "api/site",
			method: "POST",
			data: $.param({
				t: newKeyAndTime.t,
				k: newKeyAndTime.k,
				name: data.name,
				url: data.url,
				category: data.category.toString(),
				isActive: "1",
				maxPhone: data.maxPhone
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				authorization: 'bearer ' + accessToken,
			}
		};
		$http(option)
			.then(
				response => {
					successCallback(response);
				},
				error => {
					errorCallback(error);
				});
	};

	this.deleteSite = function (id, successCallback, errorCallback) {
		const newKeyAndTime = getNewKeyAndTimeStamp();
		let accessToken = $cookies.get('token');
		const option = {
			url: api.url + "api/site",
			method: "DELETE",
			data: $.param({
				t: newKeyAndTime.t,
				k: newKeyAndTime.k,
				_id: id
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				authorization: 'bearer ' + accessToken,
			}
		};
		$http(option)
			.then(
				response => {
					successCallback(response);
				},
				error => {
					errorCallback(error);
				});
	};

	this.changeActiveStatus = (data, successCallback, errorCallback) => {
		let newKeyAndTime = getNewKeyAndTimeStamp();
		let accessToken = $cookies.get('token');
		const option = {
			url: api.url + "api/site",
			method: "PUT",
			data: $.param({
				t: newKeyAndTime.t,
				k: newKeyAndTime.k,
				action: data.action,
				_id: data._id
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				authorization: 'bearer ' + accessToken,
			}
		};
		$http(option).then(
			response => {
				successCallback(response);
			},
			error => {
				errorCallback(error);
			});
	};

	this.changeMaxPhone = (data, successCallback, errCallback) => {
		let newKeyAndTime = getNewKeyAndTimeStamp();
		let accessToken = $cookies.get('token');
		const option = {
			url: api.url + "api/site",
			method: "PUT",
			data: $.param({
				t: newKeyAndTime.t,
				k: newKeyAndTime.k,
				action: 'max-phone',
				_id: data._id,
				maxPhone: data.maxPhone
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				authorization: 'bearer ' + accessToken,
			}
		};
		$http(option).then(
			response => {
				successCallback(response);
			},
			error => {
				errCallback(error);
			});
	}
}]);