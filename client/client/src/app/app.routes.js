/**
 * Created by Chip Bom on 12/26/2016.
 */
'use strict';

myApp.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/'); //url invalid => redirect page /

    $stateProvider.state('index', {
      url: '/',
      templateUrl: 'app/components/home/homeView.html',
      resolve: {
        authenticate: function (authenticateService) {
          return authenticateService.checkCookieExists("/");
        }
      },

      data: {pageTitle: 'Trang chủ'}
    }).state('intro', {
      url: '/product',
      templateUrl: 'app/components/introducing/introView.html',

      data: {pageTitle: 'Giới thiệu'}
    }).state('rules', {
      url: '/rules',
      templateUrl: 'app/components/rules/rulesView.html',

      data: {pageTitle: 'Giới thiệu'}
    })/*.state('price', {
      url: '/price',
      templateUrl: 'app/components/priceshow/priceView.html',
      controller: 'priceShowController',

      data: {pageTitle: 'Báo giá'}
    })*/.state('login', {
      url: '/login',
      templateUrl: 'app/components/login/loginView.html',
      controller: 'loginController',
      resolve: {
        authenticate: function (authenticateService) {
          return authenticateService.checkCookieExists();
        }
      },
      data: {pageTitle: 'Đăng nhập'}
    }).state('Đăng xuất', {
      url: '/logout',
      resolve: {
        location: function ($cookies, $location) {
          $cookies.remove('token');
          $cookies.remove('userInfo');
          $location.path('/');
        }
      },
      data: {pageTitle: 'Đang đăng xuất'}
    }).state('register', {
      url: '/register',
      templateUrl: 'app/components/register/registerView.html',
      controller: 'registerController',
      data: {pageTitle: 'Đăng ký'}
    }).state('siteManagement', {
      url: '/site',
      templateUrl: 'app/components/site/siteView.html',
      controller: 'siteController',
      resolve: {
        authenticate: function (authenticateService) {
          return authenticateService.checkAuthenticate();
        }
      },

      data: {pageTitle: 'Quản lý website'}
    }).state('Gói cước', {
      url: '/plan',
      templateUrl: 'app/components/plan/planView.html',
      controller: 'planController',
      resolve: {
        authenticate: function (authenticateService) {
          return authenticateService.checkAuthenticate();
        }
      },

      data: {pageTitle: 'Thông tin gói cước'}
    }).state('Giao dịch', {
      url: '/transaction',
      templateUrl: 'app/components/transaction/transactionView.html',
      controller: 'transactionController',
      resolve: {
        authenticate: function (authenticateService) {
          return authenticateService.checkAuthenticate();
        }
      },
      data: {pageTitle: 'Thống kê giao dịch'}
    }).state('Truy cập', {
      url: '/traffic',
      templateUrl: 'app/components/traffic/trafficView.html',
      controller: 'trafficController',
      resolve: {
        authenticate: function (authenticateService) {
          return authenticateService.checkAuthenticate();
        }
      },
      data: {pageTitle: 'Thống kê truy cập'}
    }).state('Người dùng', {
      url: '/user',
      templateUrl: 'app/components/user/userPasswordView.html',
      controller: "userController",
      data: {pageTitle: 'Thống kê truy cập'}
    });


    $locationProvider.html5Mode(true);
  }
);