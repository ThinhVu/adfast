function MdSwitch(e,t,n,a,i,r,o){function d(e,d){var l=c.compile(e,d).post;return e.addClass("md-dragging"),function(e,d,c,s){function m(t){v&&v(e)||(t.stopPropagation(),d.addClass("md-dragging"),$={width:h.prop("offsetWidth")})}function g(e){if($){e.stopPropagation(),e.srcEvent&&e.srcEvent.preventDefault();var t=e.pointer.distanceX/$.width,a=s.$viewValue?1+t:t;a=Math.max(0,Math.min(1,a)),h.css(n.CSS.TRANSFORM,"translate3d("+100*a+"%,0,0)"),$.translate=a}}function u(t){if($){t.stopPropagation(),d.removeClass("md-dragging"),h.css(n.CSS.TRANSFORM,"");var a=s.$viewValue?$.translate<.5:$.translate>.5;a&&p(!s.$viewValue),$=null,e.skipToggle=!0,o(function(){e.skipToggle=!1},1)}}function p(t){e.$apply(function(){s.$setViewValue(t),s.$render()})}s=s||t.fakeNgModel();var v=null;null!=c.disabled?v=function(){return!0}:c.ngDisabled&&(v=a(c.ngDisabled));var h=angular.element(d[0].querySelector(".md-thumb-container")),f=angular.element(d[0].querySelector(".md-container"));i(function(){d.removeClass("md-dragging")}),l(e,d,c,s),v&&e.$watch(v,function(e){d.attr("tabindex",e?-1:0)}),r.register(f,"drag"),f.on("$md.dragstart",m).on("$md.drag",g).on("$md.dragend",u);var $}}var c=e[0];return{restrict:"E",priority:210,transclude:!0,template:'<div class="md-container"><div class="md-bar"></div><div class="md-thumb-container"><div class="md-thumb" md-ink-ripple md-ink-ripple-checkbox></div></div></div><div ng-transclude class="md-label"></div>',require:"?ngModel",compile:d}}goog.provide("ngmaterial.components.switch"),goog.require("ngmaterial.components.checkbox"),goog.require("ngmaterial.core"),MdSwitch.$inject=["mdCheckboxDirective","$mdUtil","$mdConstant","$parse","$$rAF","$mdGesture","$timeout"],angular.module("material.components.switch",["material.core","material.components.checkbox"]).directive("mdSwitch",MdSwitch),ngmaterial.components.switch=angular.module("material.components.switch");