/**
 * Created by Chip Bom on 1/5/2017.
 */
myApp.directive('headerTemplate', function () {
  return {
    templateUrl: 'app/shared/template/headerTemplate.html'
  }
}).directive('sidebarTemplate', function () {
  return {
    templateUrl: 'app/shared/template/sidebarTemplate.html'
  }
}).directive('footerTemplate', function () {
  return {
    templateUrl: 'app/shared/template/footerTemplate.html'
  }
}).directive('whiteFooterTemplate', function () {
  return {
    templateUrl: 'app/shared/template/whiteFooterTemplate.html'
  }
}).directive('changePasDialog', function () {
  return {
    templateUrl: 'app/shared/template/changePasswordDialog.html',
    controller: 'changePassword'
  }
}).directive('toggleMenu', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.bind('click', function ($event) {
        $("#wrapper").toggleClass("toggled");
      });
    }
  }
}).directive('isActiveCheckBox', function () {
  return {
    restrict: 'C',
    link: function (scope, element, attr) {
      element.bind('click', function ($event) {
        $event.preventDefault();
        let _id = attr.siteId;
        let active = attr.isActive == 'true' ? "deactive" : "active";
        scope.active(_id, active);
      });
    }
  }
}).directive('number', function () {
  return {
    restrict: 'C',
    link: function (scope, element) {
      element.bind('keypress', function ($event) {
        let keyCode = $event.which;
        if (!($event.shiftKey == false && (keyCode == 46 || keyCode == 8 || keyCode == 37 || keyCode == 39 ||
          (keyCode >= 48 && keyCode <= 57)))) {
          $event.preventDefault();
        }
      });
    }
  }
});