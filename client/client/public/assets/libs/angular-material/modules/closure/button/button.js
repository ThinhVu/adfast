function MdAnchorDirective(t){return{restrict:"E",link:function(e,n){t(n)}}}function MdButtonDirective(t,e,n,i){function o(t){return angular.isDefined(t.href)||angular.isDefined(t.ngHref)||angular.isDefined(t.ngLink)||angular.isDefined(t.uiSref)}function u(t,e){if(o(e))return'<a class="md-button" ng-transclude></a>';var n="undefined"==typeof e.type?"button":e.type;return'<button class="md-button" type="'+n+'" ng-transclude></button>'}function a(u,a,r){e(a),t.attach(u,a),n.expectWithoutText(a,"aria-label"),o(r)&&angular.isDefined(r.ngDisabled)&&u.$watch(r.ngDisabled,function(t){a.attr("tabindex",t?-1:0)}),a.on("click",function(t){r.disabled===!0&&(t.preventDefault(),t.stopImmediatePropagation())}),a.hasClass("md-no-focus")||(u.mouseActive=!1,a.on("mousedown",function(){u.mouseActive=!0,i(function(){u.mouseActive=!1},100)}).on("focus",function(){u.mouseActive===!1&&a.addClass("md-focused")}).on("blur",function(t){a.removeClass("md-focused")}))}return{restrict:"EA",replace:!0,transclude:!0,template:u,link:a}}goog.provide("ngmaterial.components.button"),goog.require("ngmaterial.core"),MdButtonDirective.$inject=["$mdButtonInkRipple","$mdTheming","$mdAria","$timeout"],MdAnchorDirective.$inject=["$mdTheming"],angular.module("material.components.button",["material.core"]).directive("mdButton",MdButtonDirective).directive("a",MdAnchorDirective),ngmaterial.components.button=angular.module("material.components.button");