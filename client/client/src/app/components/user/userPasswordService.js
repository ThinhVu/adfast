/**
 * Created by Chip Bom on 1/11/2017.
 */
myApp.service('userService', ['$http', '$cookies', function ($http, $cookies) {

  this.changePassword = function (data, successCallback, errorCallback) {
    const newKeyAndTime = getNewKeyAndTimeStamp();
    let accessToken = $cookies.get('token');
    const option = {
      url: api.url + "api/user/change-pass",
      method: "PUT",
      data: $.param({
        t: newKeyAndTime.t,
        k: newKeyAndTime.k,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
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

}]);