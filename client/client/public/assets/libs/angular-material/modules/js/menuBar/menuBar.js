!function(e,t,n){"use strict";function o(e,n,o,r,i,s,a,l){this.$element=o,this.$attrs=r,this.$mdConstant=i,this.$mdUtil=a,this.$document=s,this.$scope=e,this.$rootScope=n,this.$timeout=l;var d=this;t.forEach(u,function(e){d[e]=t.bind(d,d[e])})}function r(e,n){return{restrict:"E",require:"mdMenuBar",controller:"MenuBarController",compile:function(o,r){return r.ariaRole||o[0].setAttribute("role","menubar"),t.forEach(o[0].children,function(n){if("MD-MENU"==n.nodeName){n.hasAttribute("md-position-mode")||(n.setAttribute("md-position-mode","left bottom"),n.querySelector("button, a, md-button").setAttribute("role","menuitem"));var o=e.nodesToArray(n.querySelectorAll("md-menu-content"));t.forEach(o,function(e){e.classList.add("md-menu-bar-menu"),e.classList.add("md-dense"),e.hasAttribute("width")||e.setAttribute("width",5)})}}),o.find("md-menu-item").addClass("md-in-menu-bar"),function(e,t,o,r){t.addClass("_md"),n(e,t),r.init()}}}}function i(){return{restrict:"E",compile:function(e,t){t.role||e[0].setAttribute("role","separator")}}}function s(e,t,n){this.$element=t,this.$attrs=n,this.$scope=e}function a(e,n){return{controller:"MenuItemController",require:["mdMenuItem","?ngModel"],priority:210,compile:function(o,r){function i(e,n,r){r=r||o,r instanceof t.element&&(r=r[0]),r.hasAttribute(e)||r.setAttribute(e,n)}function s(n){var r=e.prefixer(n);t.forEach(r,function(e){if(o[0].hasAttribute(e)){var t=o[0].getAttribute(e);d[0].setAttribute(e,t),o[0].removeAttribute(e)}})}var a=r.type,u="md-in-menu-bar";if("checkbox"!=a&&"radio"!=a||!o.hasClass(u))i("role","menuitem",o[0].querySelector("md-button, button, a"));else{var l=o[0].textContent,d=t.element('<md-button type="button"></md-button>'),c='<md-icon md-svg-src="'+n.mdChecked+'"></md-icon>';d.html(l),d.attr("tabindex","0"),o.html(""),o.append(t.element(c)),o.append(d),o.addClass("md-indent").removeClass(u),i("role","checkbox"==a?"menuitemcheckbox":"menuitemradio",d),s("ng-disabled")}return function(e,t,n,o){var r=o[0],i=o[1];r.init(i)}}}}t.module("material.components.menuBar",["material.core","material.components.icon","material.components.menu"]),o.$inject=["$scope","$rootScope","$element","$attrs","$mdConstant","$document","$mdUtil","$timeout"],t.module("material.components.menuBar").controller("MenuBarController",o);var u=["handleKeyDown","handleMenuHover","scheduleOpenHoveredMenu","cancelScheduledOpen"];o.prototype.init=function(){var e=this.$element,t=this.$mdUtil,o=this.$scope,r=this,i=[];e.on("keydown",this.handleKeyDown),this.parentToolbar=t.getClosest(e,"MD-TOOLBAR"),i.push(this.$rootScope.$on("$mdMenuOpen",function(t,n){r.getMenus().indexOf(n[0])!=-1&&(e[0].classList.add("md-open"),n[0].classList.add("md-open"),r.currentlyOpenMenu=n.controller("mdMenu"),r.currentlyOpenMenu.registerContainerProxy(r.handleKeyDown),r.enableOpenOnHover())})),i.push(this.$rootScope.$on("$mdMenuClose",function(o,i,s){var a=r.getMenus();if(a.indexOf(i[0])!=-1&&(e[0].classList.remove("md-open"),i[0].classList.remove("md-open")),e[0].contains(i[0])){for(var u=i[0];u&&a.indexOf(u)==-1;)u=t.getClosest(u,"MD-MENU",!0);u&&(s.skipFocus||u.querySelector("button:not([disabled])").focus(),r.currentlyOpenMenu=n,r.disableOpenOnHover(),r.setKeyboardMode(!0))}})),o.$on("$destroy",function(){for(r.disableOpenOnHover();i.length;)i.shift()()}),this.setKeyboardMode(!0)},o.prototype.setKeyboardMode=function(e){e?this.$element[0].classList.add("md-keyboard-mode"):this.$element[0].classList.remove("md-keyboard-mode")},o.prototype.enableOpenOnHover=function(){if(!this.openOnHoverEnabled){var e=this;e.openOnHoverEnabled=!0,e.parentToolbar&&(e.parentToolbar.classList.add("md-has-open-menu"),e.$mdUtil.nextTick(function(){t.element(e.parentToolbar).on("click",e.handleParentClick)},!1)),t.element(e.getMenus()).on("mouseenter",e.handleMenuHover)}},o.prototype.handleMenuHover=function(e){this.setKeyboardMode(!1),this.openOnHoverEnabled&&this.scheduleOpenHoveredMenu(e)},o.prototype.disableOpenOnHover=function(){this.openOnHoverEnabled&&(this.openOnHoverEnabled=!1,this.parentToolbar&&(this.parentToolbar.classList.remove("md-has-open-menu"),t.element(this.parentToolbar).off("click",this.handleParentClick)),t.element(this.getMenus()).off("mouseenter",this.handleMenuHover))},o.prototype.scheduleOpenHoveredMenu=function(e){var n=t.element(e.currentTarget),o=n.controller("mdMenu");this.setKeyboardMode(!1),this.scheduleOpenMenu(o)},o.prototype.scheduleOpenMenu=function(e){var t=this,o=this.$timeout;e!=t.currentlyOpenMenu&&(o.cancel(t.pendingMenuOpen),t.pendingMenuOpen=o(function(){t.pendingMenuOpen=n,t.currentlyOpenMenu&&t.currentlyOpenMenu.close(!0,{closeAll:!0}),e.open()},200,!1))},o.prototype.handleKeyDown=function(e){var n=this.$mdConstant.KEY_CODE,o=this.currentlyOpenMenu,r=o&&o.isOpen;this.setKeyboardMode(!0);var i,s,a;switch(e.keyCode){case n.DOWN_ARROW:o?o.focusMenuContainer():this.openFocusedMenu(),i=!0;break;case n.UP_ARROW:o&&o.close(),i=!0;break;case n.LEFT_ARROW:s=this.focusMenu(-1),r&&(a=t.element(s).controller("mdMenu"),this.scheduleOpenMenu(a)),i=!0;break;case n.RIGHT_ARROW:s=this.focusMenu(1),r&&(a=t.element(s).controller("mdMenu"),this.scheduleOpenMenu(a)),i=!0}i&&(e&&e.preventDefault&&e.preventDefault(),e&&e.stopImmediatePropagation&&e.stopImmediatePropagation())},o.prototype.focusMenu=function(e){var t=this.getMenus(),n=this.getFocusedMenuIndex();n==-1&&(n=this.getOpenMenuIndex());var o=!1;if(n==-1?(n=0,o=!0):(e<0&&n>0||e>0&&n<t.length-e)&&(n+=e,o=!0),o)return t[n].querySelector("button").focus(),t[n]},o.prototype.openFocusedMenu=function(){var e=this.getFocusedMenu();e&&t.element(e).controller("mdMenu").open()},o.prototype.getMenus=function(){var e=this.$element;return this.$mdUtil.nodesToArray(e[0].children).filter(function(e){return"MD-MENU"==e.nodeName})},o.prototype.getFocusedMenu=function(){return this.getMenus()[this.getFocusedMenuIndex()]},o.prototype.getFocusedMenuIndex=function(){var e=this.$mdUtil,t=e.getClosest(this.$document[0].activeElement,"MD-MENU");if(!t)return-1;var n=this.getMenus().indexOf(t);return n},o.prototype.getOpenMenuIndex=function(){for(var e=this.getMenus(),t=0;t<e.length;++t)if(e[t].classList.contains("md-open"))return t;return-1},o.prototype.handleParentClick=function(e){var n=this.querySelector("md-menu.md-open");n&&!n.contains(e.target)&&t.element(n).controller("mdMenu").close()},r.$inject=["$mdUtil","$mdTheming"],t.module("material.components.menuBar").directive("mdMenuBar",r),t.module("material.components.menuBar").directive("mdMenuDivider",i),s.$inject=["$scope","$element","$attrs"],t.module("material.components.menuBar").controller("MenuItemController",s),s.prototype.init=function(e){var t=this.$element,n=this.$attrs;this.ngModel=e,"checkbox"!=n.type&&"radio"!=n.type||(this.mode=n.type,this.iconEl=t[0].children[0],this.buttonEl=t[0].children[1],e&&this.initClickListeners())},s.prototype.clearNgAria=function(){var e=this.$element[0],n=["role","tabindex","aria-invalid","aria-checked"];t.forEach(n,function(t){e.removeAttribute(t)})},s.prototype.initClickListeners=function(){function e(){if("radio"==a){var e=s.ngValue?i.$eval(s.ngValue):s.value;return r.$modelValue==e}return r.$modelValue}function n(e){e?l.off("click",d):l.on("click",d)}var o=this,r=this.ngModel,i=this.$scope,s=this.$attrs,a=(this.$element,this.mode);this.handleClick=t.bind(this,this.handleClick);var u=this.iconEl,l=t.element(this.buttonEl),d=this.handleClick;s.$observe("disabled",n),n(s.disabled),r.$render=function(){o.clearNgAria(),e()?(u.style.display="",l.attr("aria-checked","true")):(u.style.display="none",l.attr("aria-checked","false"))},i.$$postDigest(r.$render)},s.prototype.handleClick=function(e){var t,n=this.mode,o=this.ngModel,r=this.$attrs;"checkbox"==n?t=!o.$modelValue:"radio"==n&&(t=r.ngValue?this.$scope.$eval(r.ngValue):r.value),o.$setViewValue(t),o.$render()},a.$inject=["$mdUtil","$$mdSvgRegistry"],t.module("material.components.menuBar").directive("mdMenuItem",a)}(window,window.angular);