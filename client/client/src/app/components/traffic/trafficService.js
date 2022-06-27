/**
 * Created by Chip Bom on 1/5/2017.
 */
myApp.service('trafficService', ['$http', '$cookies', function ($http, $cookies) {
  this.getTraffic = function (data, successCallback, errorCallback) {
    const newKeyAndTime = getNewKeyAndTimeStamp();
    let accessToken = $cookies.get('token');
    let option = {
      url: api.url + "traffic",
      method: "GET",
      params: {
        t: newKeyAndTime.t,
        k: newKeyAndTime.k,
        start: data.start,
        count: data.count,
        action: data.action,
        'site-name': data.site,
        carrier: data.carrier
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: 'bearer ' + accessToken
      }
    };
    $http(option).then((response) => {
      successCallback(response, data.start);
    }, error => {
      errorCallback(error);
    });
  }

  this.getAllTraffic = function (successCallback, errorCallback) {
    const newKeyAndTime = getNewKeyAndTimeStamp();
    let accessToken = $cookies.get('token');
    let option = {
      url: api.url + "traffic",
      method: "GET",
      params: {
        t: newKeyAndTime.t,
        k: newKeyAndTime.k,
        action: 'export-all'
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
  }
}]);
