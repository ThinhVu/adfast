'use strict';

/*myApp.controller('routerController', ["$scope", ($scope) => {
 $scope.namePage = "Index!";
 $scope.homeData = "Day la du lieu trang index !";
 $scope.visible = false;

 $scope.viewClick = () => {
 if ($scope.visible === false) {
 $scope.visible = true;
 } else {
 $scope.visible = false;
 }
 };
 }]);*/

myApp.controller('homeController', ["$scope", "$http", function ($scope, $http) {
	$scope.getData = () => {
		const option = {
			"url": "http://localhost:3000/api/seekers/update/58858e350937ff09a188902c",
			"method": "POST",
			data: $.param({
				"name.firstName": "Nguyễn",
				"availableWorking": "false",
				"jobSearchCurrentCity": "false",
				"mailNotifyActive": "false",
				"name.lastName": "Mạnh",
				"address.addressName": "Quang Ninh"
			}),
			"async": true,
			"crossDomain": true,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		};

		$http(option)
			.then(data => {
				console.log(data);
			}, error => {
				console.log(error);
			});
	};

	$scope.getData3 = () => {
		const option = {
			"url": "http://media.takeit.vn:82/except",
			"method": "POST",
			data: $.param({
				phoneNumber: "0978089594",
				url: "localhost:82/except",
				referUrl: "dantri.com.vn",
				city: "HaNoiPro",
				ip: '122.22.34.23',
				carriers: 'Viettel'
			}),
			"async": true,
			"crossDomain": true,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		};

		$http(option)
			.then(data => {
				console.log(data);
			}, error => {
				console.log(error);
			});
	};

	$scope.getData2 = () => {
		const option = {
			// "url": "http://media.takeit.vn:82/api/site?t=1482397152&k=4c71e6f8275d2cf6f3c7bbaf6e5195c3",
			"url": "http://localhost:82/api/site",
			"method": "get",
			params: {
				t: '1482397152',
				k: '4c71e6f8275d2cf6f3c7bbaf6e5195c3'
			},
			headers: {
				'Content-Type': 'text/plain; charset=UTF-8',
				authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU4NWI5MGE4ZTk5MWFiMDM2OGJhZTNjZiIsInJvbGUiOmZhbHNlLCJlbWFpbCI6Im1hbmhoaXBraG10MUBnbWFpbC5jb20ifSwiaWF0IjoxNDgzNjQyNTczfQ.0_dLTmV7YPyufsEvdJQMnvn9zO3RUravL6Ls6jNZ5Ig'
			}
		};

		$http(option)
			.then(data => {
				console.log(data);
			}, error => {
				console.log(error);
			});
	};

	$scope.getData4 = () => {
		const option = {
			"url": "http://media.takeit.vn:82/api/site",
			"method": "POST",
			data: $.param({
				t: "1482397152",
				k: "4c71e6f8275d2cf6f3c7bbaf6e5195c3",
				name: "Takeit Photographer Media aaa",
				url: "media.takeit.vn:83",
				category: 'TakeitMediaTest, democonverntion, htllo',
				isActive: 1,
				maxPhone: 12121
			}),
			/*"async": true,
			 "crossDomain": true,*/
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				// 'authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU4NWI5MGE4ZTk5MWFiMDM2OGJhZTNjZiIsInJvbGUiOmZhbHNlLCJlbWFpbCI6Im1hbmhoaXBraG10MUBnbWFpbC5jb20ifSwiaWF0IjoxNDgzNTYzNTQwfQ.cpjIwYWiucbr4wBS9PjUALdbZzPpgzAj_n5RiIKyPg8'
				'authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU4NWI5MGE4ZTk5MWFiMDM2OGJhZTNjZiIsInJvbGUiOmZhbHNlLCJlbWFpbCI6Im1hbmhoaXBraG10MUBnbWFpbC5jb20ifSwiaWF0IjoxNDgzNTYxNzE3fQ.w2Ww2CnNE8iEH8pieO7m9zy0zo1_yhOg3BFTyW8vmUU'
			}
		};

		$http(option)
			.then(data => {
				console.log(data);
			}, error => {
				console.log(error);
			});
	};

	$scope.getData6 = () => {
		const option = {
			// http://media.takeit.vn:81/data
			url: 'http://media.takeit.vn:81/data',
			method: "get",
		};
		$http(option)
			.then(
				response => {
					console.log('xxxDomain test');
				},
				error => {
					console.log('faillllllllllllllllllll2323232lllll' + error);
				});
	};

	$scope.getData5 = () => {
		const option = {
			url: 'http://localhost:82/' + "api/site",
			method: "delete",
			data: $.param({
				t: '1482397152',
				k: '4c71e6f8275d2cf6f3c7bbaf6e5195c3',
				_id: '586cbed5a90f882a1610f866' //site end
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				authorization: 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU4NjEyZTVmNWNkOTExMmY4Yzc1YzZhOCIsInJvbGUiOnRydWUsImVtYWlsIjoic29taWJ1b24xMjM0QGdtYWlsLmNvbSJ9LCJpYXQiOjE0ODM1Njg4NDB9.Vh4bMqXQUTTXu8WUthxoFfqvx3LFcI1bt9BQ6lOc2Sw',
			}
		};
		$http(option)
			.then(
				response => {
					console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
				},
				error => {
					console.log('faillllllllllllllllllllllllllllllllllll' + error);
				});
	};

	$scope.namePage = "Home!";
	$scope.homeData = "Day la du lieu trang home binding data !";

	$scope.visible = false;

	$scope.viewClick = () => {
		if ($scope.visible === false) {
			$scope.visible = true;
		} else {
			$scope.visible = false;
		}
	};
}]);

myApp.controller('aboutController', ["$scope", function ($scope) {
	// $scope.aboutData = `Tên anh ấy là: ${$stateParams.name} !`;
	$scope.aboutData = `Tên anh ấy là: About Data!`;
}]);

myApp.controller('contactController', ["$scope", function ($scope) {
	$scope.contactData = "Day la du lieu page contact binding data !";
	/*test remove console.log*/
	console.log("Function example es6");
	const name = "ManhNV11";
	console.log(`This is ${name}`);
}]);