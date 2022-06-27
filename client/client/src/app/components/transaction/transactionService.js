/**
 * Created by Chip Bom on 1/5/2017.
 */
myApp.service('transactionService', ['$http', '$cookies', function ($http, $cookies) {
  this.getTransaction = function (successCallback, errorCallback) {
    const newKeyAndTime = getNewKeyAndTimeStamp();
    let accessToken = $cookies.get('token');
    const option = {
      url: api.url + "api/transaction",
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
  }
}]);
