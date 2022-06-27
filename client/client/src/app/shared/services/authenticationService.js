/**
 * Created by Chip Bom on 1/3/2017.
 */
myApp.service("authenticateService", ['$q', '$http', '$cookies', '$location', function ($q, $http, $cookies, $location) {
  "use strict";
  return {
    checkAuthenticate: function () {
      let deferred = $q.defer();

      let accessToken = $cookies.get('token');
      const option = {
        url: api.url + 'api/authenticate',
        headers: {
          authorization: 'bearer ' + accessToken
        }
      };
      $http.get(option.url, {
        header: option.headers
      }).then(
        (data) => {
          return deferred.resolve(data);
        },
        error => {
          $cookies.remove('token');
          location.href = '/';
        }
      );
      return deferred.promise;
    },


    checkCookieExists: (home) => {

      let accessToken = $cookies.get('token');
      if (accessToken) {
        $location.path(defaultPage);
      }
      else {
        if (!home)
        $location.path(loginPage);
      }

    },

    getUserInformation: () => {
      return new Promise((resolve, reject) => {
        let userInfo = $cookies.get('userInfo');
        // if (userInfo) {//Todo kiểm tra user info tồn tại trong cookies
        //   resolve(JSON.parse(userInfo));
        // } else {
        let accessToken = $cookies.get('token');
        const newKeyAndTime = getNewKeyAndTimeStamp();
        const option = {
          url: api.url + "api/user/profile",
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
        $http(option).then(
          response => {
            // console.log(response.data.data);
            resolve(response.data.data);
          },
          error => {
            reject(error);
          }
        );
        // }//End else
      });//End Promise
    }//End object function
  }
}]);