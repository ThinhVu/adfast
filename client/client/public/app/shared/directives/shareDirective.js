"use strict";myApp.directive("headerTemplate",function(){return{templateUrl:"app/shared/template/headerTemplate.html"}}).directive("sidebarTemplate",function(){return{templateUrl:"app/shared/template/sidebarTemplate.html"}}).directive("footerTemplate",function(){return{templateUrl:"app/shared/template/footerTemplate.html"}}).directive("whiteFooterTemplate",function(){return{templateUrl:"app/shared/template/whiteFooterTemplate.html"}}).directive("changePasDialog",function(){return{templateUrl:"app/shared/template/changePasswordDialog.html",controller:"changePassword"}}).directive("toggleMenu",function(){return{restrict:"A",link:function(e,t){t.bind("click",function(e){$("#wrapper").toggleClass("toggled")})}}}).directive("isActiveCheckBox",function(){return{restrict:"C",link:function(e,t,r){t.bind("click",function(t){t.preventDefault();var i=r.siteId,n="true"==r.isActive?"deactive":"active";e.active(i,n)})}}}).directive("number",function(){return{restrict:"C",link:function(e,t){t.bind("keypress",function(e){var t=e.which;0==e.shiftKey&&(46==t||8==t||37==t||39==t||t>=48&&t<=57)||e.preventDefault()})}}});