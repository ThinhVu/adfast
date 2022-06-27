/**
 * Created by Chip Bom on 12/26/2016.
 */
let myApp = angular.module("myApp",
	["ui.router", 'ngCookies', 'ngTagsInput', 'angular-toArrayFilter', 'angularUtils.directives.dirPagination','vcRecaptcha']);
myApp.run(['$rootScope', '$state', '$stateParams',
	function ($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}]);