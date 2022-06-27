!function(e,t,n){"use strict";function o(e,n,o){return{restrict:"E",link:function(i,a){a.addClass("_md"),n(a),e(function(){function e(){a.toggleClass("md-content-overflow",r.scrollHeight>r.clientHeight)}var n,r=a[0].querySelector("md-dialog-content");r&&(n=r.getElementsByTagName("img"),e(),t.element(n).on("load",e)),i.$on("$destroy",function(){o.destroy(a)})})}}}function i(e){function o(e,t){return{template:['<md-dialog md-theme="{{ dialog.theme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">','  <md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">','    <h2 class="md-title">{{ dialog.title }}</h2>','    <div ng-if="::dialog.mdHtmlContent" class="md-dialog-content-body" ','        ng-bind-html="::dialog.mdHtmlContent"></div>','    <div ng-if="::!dialog.mdHtmlContent" class="md-dialog-content-body">',"      <p>{{::dialog.mdTextContent}}</p>","    </div>",'    <md-input-container md-no-float ng-if="::dialog.$type == \'prompt\'" class="md-prompt-input-container">','      <input ng-keypress="dialog.keypress($event)" md-autofocus ng-model="dialog.result"              placeholder="{{::dialog.placeholder}}">',"    </md-input-container>","  </md-dialog-content>","  <md-dialog-actions>",'    <md-button ng-if="dialog.$type === \'confirm\' || dialog.$type === \'prompt\'"               ng-click="dialog.abort()" class="md-primary md-cancel-button">',"      {{ dialog.cancel }}","    </md-button>",'    <md-button ng-click="dialog.hide()" class="md-primary md-confirm-button" md-autofocus="dialog.$type===\'alert\'">',"      {{ dialog.ok }}","    </md-button>","  </md-dialog-actions>","</md-dialog>"].join("").replace(/\s\s+/g,""),controller:function(){var n="prompt"==this.$type;n&&this.initialValue&&(this.result=this.initialValue),this.hide=function(){e.hide(!n||this.result)},this.abort=function(){e.cancel()},this.keypress=function(n){n.keyCode===t.KEY_CODE.ENTER&&e.hide(this.result)}},controllerAs:"dialog",bindToController:!0}}function i(e,o,i,l,d,c,s,m,u,g,f){function p(e){b(e),e.contentElement&&(e.restoreContentElement=k(e))}function h(e,t,n,o){if(o){if(o.mdHtmlContent=o.htmlContent||n.htmlContent||"",o.mdTextContent=o.textContent||n.textContent||o.content||n.content||"",o.mdHtmlContent&&!g.has("$sanitize"))throw Error("The ngSanitize module must be loaded in order to use htmlContent.");if(o.mdHtmlContent&&o.mdTextContent)throw Error("md-dialog cannot have both `htmlContent` and `textContent`")}}function C(e,n,o,a){function r(){n[0].querySelector(".md-actions")&&u.warn("Using a class of md-actions is deprecated, please use <md-dialog-actions>.")}function l(){function e(){var e=n[0].querySelector(".dialog-close");if(!e){var t=n[0].querySelectorAll(".md-actions button, md-dialog-actions button");e=t[t.length-1]}return e}if(o.focusOnOpen){var t=i.findFocusTarget(n)||e()||d;t.focus()}}t.element(c[0].body).addClass("md-dialog-is-showing");var d=n.find("md-dialog");if(d.hasClass("ng-cloak")){var s="$mdDialog: using `<md-dialog ng-cloak >` will affect the dialog opening animations.";u.warn(s,n[0])}return y(o),E(d,o),T(e,n,o),$(n,o),w(n,o).then(function(){S(n,o),r(),l()})}function v(e,n,o){function i(){return A(n,o)}function l(){t.element(c[0].body).removeClass("md-dialog-is-showing"),o.contentElement?(o.reverseContainerStretch(),o.restoreContentElement()):n.remove(),o.$destroy||o.origin.focus()}return o.deactivateListeners(),o.unlockScreenReader(),o.hideBackdrop(o.$destroy),a&&a.parentNode&&a.parentNode.removeChild(a),r&&r.parentNode&&r.parentNode.removeChild(r),o.$destroy?l():i().then(l)}function b(e){if(!e.theme&&(e.theme=f.defaultTheme(),e.targetEvent&&e.targetEvent.target)){var n=t.element(e.targetEvent.target);e.theme=(n.controller("mdTheme")||{}).$mdTheme||e.theme}}function k(e){function n(e){var t=e.parentNode,n=e.nextElementSibling;return function(){n?t.insertBefore(e,n):t.appendChild(e)}}var o=e.contentElement,i=null;return t.isString(o)?(o=document.querySelector(o),i=n(o)):(o=o[0]||o,i=document.contains(o)?n(o):function(){o.parentNode.removeChild(o)}),e.element=t.element(o),e.skipCompile=!0,i}function y(e){function o(e,o){var i=t.element(e||{});if(i&&i.length){var a={top:0,left:0,height:0,width:0},r=t.isFunction(i[0].getBoundingClientRect);return t.extend(o||{},{element:r?i:n,bounds:r?i[0].getBoundingClientRect():t.extend({},a,i[0]),focus:t.bind(i,i.focus)})}}function i(e,n){return t.isString(e)&&(e=c[0].querySelector(e)),t.element(e||n)}e.origin=t.extend({element:null,bounds:null,focus:t.noop},e.origin||{}),e.parent=i(e.parent,m),e.closeTo=o(i(e.closeTo)),e.openFrom=o(i(e.openFrom)),e.targetEvent&&(e.origin=o(e.targetEvent.target,e.origin))}function $(n,o){var a=t.element(s),r=i.debounce(function(){x(n,o)},60),d=[],c=function(){var t="alert"==o.$type?e.hide:e.cancel;i.nextTick(t,!0)};if(o.escapeToClose){var m=o.parent,u=function(e){e.keyCode===l.KEY_CODE.ESCAPE&&(e.stopPropagation(),e.preventDefault(),c())};n.on("keydown",u),m.on("keydown",u),d.push(function(){n.off("keydown",u),m.off("keydown",u)})}if(a.on("resize",r),d.push(function(){a.off("resize",r)}),o.clickOutsideToClose){var g,f=n,p=function(e){g=e.target},h=function(e){g===f[0]&&e.target===f[0]&&(e.stopPropagation(),e.preventDefault(),c())};f.on("mousedown",p),f.on("mouseup",h),d.push(function(){f.off("mousedown",p),f.off("mouseup",h)})}o.deactivateListeners=function(){d.forEach(function(e){e()}),o.deactivateListeners=null}}function T(e,t,n){n.disableParentScroll&&(n.restoreScroll=i.disableScrollAround(t,n.parent)),n.hasBackdrop&&(n.backdrop=i.createBackdrop(e,"md-dialog-backdrop md-opaque"),d.enter(n.backdrop,n.parent)),n.hideBackdrop=function(e){n.backdrop&&(e?n.backdrop.remove():d.leave(n.backdrop)),n.disableParentScroll&&(n.restoreScroll(),delete n.restoreScroll),n.hideBackdrop=null}}function E(e,t){var n="alert"===t.$type?"alertdialog":"dialog",l=e.find("md-dialog-content"),d=e.attr("id"),c="dialogContent_"+(d||i.nextUid());e.attr({role:n,tabIndex:"-1"}),0===l.length&&(l=e,d&&(c=d)),l.attr("id",c),e.attr("aria-describedby",c),t.ariaLabel?o.expect(e,"aria-label",t.ariaLabel):o.expectAsync(e,"aria-label",function(){var e=l.text().split(/\s+/);return e.length>3&&(e=e.slice(0,3).concat("...")),e.join(" ")}),a=document.createElement("div"),a.classList.add("md-dialog-focus-trap"),a.tabIndex=0,r=a.cloneNode(!1);var s=function(){e.focus()};a.addEventListener("focus",s),r.addEventListener("focus",s),e[0].parentNode.insertBefore(a,e[0]),e.after(r)}function S(e,t){function n(e){for(;e.parentNode;){if(e===document.body)return;for(var t=e.parentNode.children,i=0;i<t.length;i++)e===t[i]||N(t[i],["SCRIPT","STYLE"])||t[i].setAttribute("aria-hidden",o);n(e=e.parentNode)}}var o=!0;n(e[0]),t.unlockScreenReader=function(){o=!1,n(e[0]),t.unlockScreenReader=null}}function x(e,t){var n="fixed"==s.getComputedStyle(c[0].body).position,o=t.backdrop?s.getComputedStyle(t.backdrop[0]):null,a=o?Math.min(c[0].body.clientHeight,Math.ceil(Math.abs(parseInt(o.height,10)))):0,r={top:e.css("top"),height:e.css("height")};return e.css({top:(n?i.scrollTop(t.parent):0)+"px",height:a?a+"px":"100%"}),function(){e.css(r)}}function w(e,t){t.parent.append(e),t.reverseContainerStretch=x(e,t);var n=e.find("md-dialog"),o=i.dom.animator,a=o.calculateZoomToOrigin,r={transitionInClass:"md-transition-in",transitionOutClass:"md-transition-out"},l=o.toTransformCss(a(n,t.openFrom||t.origin)),d=o.toTransformCss("");return n.toggleClass("md-dialog-fullscreen",!!t.fullscreen),o.translate3d(n,l,d,r).then(function(e){return t.reverseAnimate=function(){return delete t.reverseAnimate,t.closeTo?(r={transitionInClass:"md-transition-out",transitionOutClass:"md-transition-in"},l=d,d=o.toTransformCss(a(n,t.closeTo)),o.translate3d(n,l,d,r)):e(d=o.toTransformCss(a(n,t.origin)))},t.clearAnimate=function(){return delete t.clearAnimate,n.removeClass([r.transitionOutClass,r.transitionInClass].join(" ")),o.translate3d(n,d,o.toTransformCss(""),{})},!0})}function A(e,t){return t.reverseAnimate().then(function(){t.contentElement&&t.clearAnimate()})}function N(e,t){if(t.indexOf(e.nodeName)!==-1)return!0}return{hasBackdrop:!0,isolateScope:!0,onCompiling:p,onShow:C,onShowing:h,onRemove:v,clickOutsideToClose:!1,escapeToClose:!0,targetEvent:null,contentElement:null,closeTo:null,openFrom:null,focusOnOpen:!0,disableParentScroll:!0,autoWrap:!0,fullscreen:!1,transformTemplate:function(e,t){function n(e){return t.autoWrap&&!/<\/md-dialog>/g.test(e)?"<md-dialog>"+(e||"")+"</md-dialog>":e||""}return'<div class="md-dialog-container" tabindex="-1">'+n(e)+"</div>"}}}o.$inject=["$mdDialog","$mdConstant"],i.$inject=["$mdDialog","$mdAria","$mdUtil","$mdConstant","$animate","$document","$window","$rootElement","$log","$injector","$mdTheming"];var a,r;return e("$mdDialog").setDefaults({methods:["disableParentScroll","hasBackdrop","clickOutsideToClose","escapeToClose","targetEvent","closeTo","openFrom","parent","fullscreen","contentElement"],options:i}).addPreset("alert",{methods:["title","htmlContent","textContent","content","ariaLabel","ok","theme","css"],options:o}).addPreset("confirm",{methods:["title","htmlContent","textContent","content","ariaLabel","ok","cancel","theme","css"],options:o}).addPreset("prompt",{methods:["title","htmlContent","textContent","initialValue","content","placeholder","ariaLabel","ok","cancel","theme","css"],options:o})}o.$inject=["$$rAF","$mdTheming","$mdDialog"],i.$inject=["$$interimElementProvider"],t.module("material.components.dialog",["material.core","material.components.backdrop"]).directive("mdDialog",o).provider("$mdDialog",i)}(window,window.angular);