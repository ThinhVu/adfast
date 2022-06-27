!function(e,t,a){"use strict";t.module("material.components.datepicker",["material.core","material.components.icon","material.components.virtualRepeat"]),function(){function e(){return{template:function(e,t){var a=t.hasOwnProperty("ngIf")?"":'ng-if="calendarCtrl.isInitialized"',n='<div ng-switch="calendarCtrl.currentView" '+a+'><md-calendar-year ng-switch-when="year"></md-calendar-year><md-calendar-month ng-switch-default></md-calendar-month></div>';return n},scope:{minDate:"=mdMinDate",maxDate:"=mdMaxDate",dateFilter:"=mdDateFilter",_currentView:"@mdCurrentView"},require:["ngModel","mdCalendar"],controller:a,controllerAs:"calendarCtrl",bindToController:!0,link:function(e,t,a,n){var i=n[0],r=n[1];r.configureNgModel(i)}}}function a(e,a,n,r,l,s,d,o,c){s(e),this.$element=e,this.$scope=a,this.dateUtil=n,this.$mdUtil=r,this.keyCode=l.KEY_CODE,this.$$rAF=d,this.today=this.dateUtil.createDateAtMidnight(),this.ngModelCtrl=null,this.currentView=this._currentView||"month",this.SELECTED_DATE_CLASS="md-calendar-selected-date",this.TODAY_CLASS="md-calendar-date-today",this.FOCUSED_DATE_CLASS="md-focus",this.id=i++,this.displayDate=null,this.selectedDate=null,this.firstRenderableDate=null,this.lastRenderableDate=null,this.isInitialized=!1,this.width=0,this.scrollbarWidth=0,o.tabindex||e.attr("tabindex","-1");var h=t.bind(this,this.handleKeyEvent);t.element(document.body).on("keydown",h),a.$on("$destroy",function(){t.element(document.body).off("keydown",h)}),this.minDate&&this.minDate>c.firstRenderableDate?this.firstRenderableDate=this.minDate:this.firstRenderableDate=c.firstRenderableDate,this.maxDate&&this.maxDate<c.lastRenderableDate?this.lastRenderableDate=this.maxDate:this.lastRenderableDate=c.lastRenderableDate}a.$inject=["$element","$scope","$$mdDateUtil","$mdUtil","$mdConstant","$mdTheming","$$rAF","$attrs","$mdDateLocale"],t.module("material.components.datepicker").directive("mdCalendar",e);var n=340,i=0;a.prototype.configureNgModel=function(e){var t=this;t.ngModelCtrl=e,t.$mdUtil.nextTick(function(){t.isInitialized=!0}),e.$render=function(){var e=this.$viewValue;t.$scope.$broadcast("md-calendar-parent-changed",e),t.selectedDate||(t.selectedDate=e),t.displayDate||(t.displayDate=t.selectedDate||t.today)}},a.prototype.setNgModelValue=function(e){var t=this.dateUtil.createDateAtMidnight(e);return this.focus(t),this.$scope.$emit("md-calendar-change",t),this.ngModelCtrl.$setViewValue(t),this.ngModelCtrl.$render(),t},a.prototype.setCurrentView=function(e,a){var n=this;n.$mdUtil.nextTick(function(){n.currentView=e,a&&(n.displayDate=t.isDate(a)?a:new Date(a))})},a.prototype.focus=function(e){if(this.dateUtil.isValidDate(e)){var t=this.$element[0].querySelector(".md-focus");t&&t.classList.remove(this.FOCUSED_DATE_CLASS);var a=this.getDateId(e,this.currentView),n=document.getElementById(a);n&&(n.classList.add(this.FOCUSED_DATE_CLASS),n.focus(),this.displayDate=e)}else{var i=this.$element[0].querySelector("[ng-switch]");i&&i.focus()}},a.prototype.getActionFromKeyEvent=function(e){var t=this.keyCode;switch(e.which){case t.ENTER:return"select";case t.RIGHT_ARROW:return"move-right";case t.LEFT_ARROW:return"move-left";case t.DOWN_ARROW:return e.metaKey?"move-page-down":"move-row-down";case t.UP_ARROW:return e.metaKey?"move-page-up":"move-row-up";case t.PAGE_DOWN:return"move-page-down";case t.PAGE_UP:return"move-page-up";case t.HOME:return"start";case t.END:return"end";default:return null}},a.prototype.handleKeyEvent=function(e){var t=this;this.$scope.$apply(function(){if(e.which==t.keyCode.ESCAPE||e.which==t.keyCode.TAB)return t.$scope.$emit("md-calendar-close"),void(e.which==t.keyCode.TAB&&e.preventDefault());var a=t.getActionFromKeyEvent(e);a&&(e.preventDefault(),e.stopPropagation(),t.$scope.$broadcast("md-calendar-parent-action",a))})},a.prototype.hideVerticalScrollbar=function(e){function t(){var t=a.width||n,i=a.scrollbarWidth,l=e.calendarScroller;r.style.width=t+"px",l.style.width=t+i+"px",l.style.paddingRight=i+"px"}var a=this,i=e.$element[0],r=i.querySelector(".md-calendar-scroll-mask");a.width>0?t():a.$$rAF(function(){var n=e.calendarScroller;a.scrollbarWidth=n.offsetWidth-n.clientWidth,a.width=i.querySelector("table").offsetWidth,t()})},a.prototype.getDateId=function(e,t){if(!t)throw new Error("A namespace for the date id has to be specified.");return["md",this.id,t,e.getFullYear(),e.getMonth(),e.getDate()].join("-")},a.prototype.updateVirtualRepeat=function(){var e=this.$scope,t=e.$on("$md-resize-enable",function(){e.$$phase||e.$apply(),t()})}}(),function(){function e(){return{template:'<table aria-hidden="true" class="md-calendar-day-header"><thead></thead></table><div class="md-calendar-scroll-mask"><md-virtual-repeat-container class="md-calendar-scroll-container" md-offset-size="'+(i-n)+'"><table role="grid" tabindex="0" class="md-calendar" aria-readonly="true"><tbody md-calendar-month-body role="rowgroup" md-virtual-repeat="i in monthCtrl.items" md-month-offset="$index" class="md-calendar-month" md-start-index="monthCtrl.getSelectedMonthIndex()" md-item-size="'+n+'"></tbody></table></md-virtual-repeat-container></div>',require:["^^mdCalendar","mdCalendarMonth"],controller:a,controllerAs:"monthCtrl",bindToController:!0,link:function(e,t,a,n){var i=n[0],r=n[1];r.initialize(i)}}}function a(e,t,a,n,i,r){this.$element=e,this.$scope=t,this.$animate=a,this.$q=n,this.dateUtil=i,this.dateLocale=r,this.calendarScroller=e[0].querySelector(".md-virtual-repeat-scroller"),this.isInitialized=!1,this.isMonthTransitionInProgress=!1;var l=this;this.cellClickHandler=function(){var e=i.getTimestampFromNode(this);l.$scope.$apply(function(){l.calendarCtrl.setNgModelValue(e)})},this.headerClickHandler=function(){l.calendarCtrl.setCurrentView("year",i.getTimestampFromNode(this))}}a.$inject=["$element","$scope","$animate","$q","$$mdDateUtil","$mdDateLocale"],t.module("material.components.datepicker").directive("mdCalendarMonth",e);var n=265,i=45;a.prototype.initialize=function(e){this.items={length:this.dateUtil.getMonthDistance(e.firstRenderableDate,e.lastRenderableDate)+2},this.calendarCtrl=e,this.attachScopeListeners(),e.updateVirtualRepeat(),e.ngModelCtrl&&e.ngModelCtrl.$render()},a.prototype.getSelectedMonthIndex=function(){var e=this.calendarCtrl;return this.dateUtil.getMonthDistance(e.firstRenderableDate,e.displayDate||e.selectedDate||e.today)},a.prototype.changeSelectedDate=function(e){var t=this,a=t.calendarCtrl,n=a.selectedDate;a.selectedDate=e,this.changeDisplayDate(e).then(function(){var t=a.SELECTED_DATE_CLASS,i="month";if(n){var r=document.getElementById(a.getDateId(n,i));r&&(r.classList.remove(t),r.setAttribute("aria-selected","false"))}if(e){var l=document.getElementById(a.getDateId(e,i));l&&(l.classList.add(t),l.setAttribute("aria-selected","true"))}})},a.prototype.changeDisplayDate=function(e){if(!this.isInitialized)return this.buildWeekHeader(),this.calendarCtrl.hideVerticalScrollbar(this),this.isInitialized=!0,this.$q.when();if(!this.dateUtil.isValidDate(e)||this.isMonthTransitionInProgress)return this.$q.when();this.isMonthTransitionInProgress=!0;var t=this.animateDateChange(e);this.calendarCtrl.displayDate=e;var a=this;return t.then(function(){a.isMonthTransitionInProgress=!1}),t},a.prototype.animateDateChange=function(e){if(this.dateUtil.isValidDate(e)){var t=this.dateUtil.getMonthDistance(this.calendarCtrl.firstRenderableDate,e);this.calendarScroller.scrollTop=t*n}return this.$q.when()},a.prototype.buildWeekHeader=function(){for(var e=this.dateLocale.firstDayOfWeek,t=this.dateLocale.shortDays,a=document.createElement("tr"),n=0;n<7;n++){var i=document.createElement("th");i.textContent=t[(n+e)%7],a.appendChild(i)}this.$element.find("thead").append(a)},a.prototype.attachScopeListeners=function(){var e=this;e.$scope.$on("md-calendar-parent-changed",function(t,a){e.changeSelectedDate(a)}),e.$scope.$on("md-calendar-parent-action",t.bind(this,this.handleKeyEvent))},a.prototype.handleKeyEvent=function(e,t){var a=this.calendarCtrl,n=a.displayDate;if("select"===t)a.setNgModelValue(n);else{var i=null,r=this.dateUtil;switch(t){case"move-right":i=r.incrementDays(n,1);break;case"move-left":i=r.incrementDays(n,-1);break;case"move-page-down":i=r.incrementMonths(n,1);break;case"move-page-up":i=r.incrementMonths(n,-1);break;case"move-row-down":i=r.incrementDays(n,7);break;case"move-row-up":i=r.incrementDays(n,-7);break;case"start":i=r.getFirstDateOfMonth(n);break;case"end":i=r.getLastDateOfMonth(n)}i&&(i=this.dateUtil.clampDate(i,a.minDate,a.maxDate),this.changeDisplayDate(i).then(function(){a.focus(i)}))}}}(),function(){function e(e,t){var n=e('<md-icon md-svg-src="'+t.mdTabsArrow+'"></md-icon>')({})[0];return{require:["^^mdCalendar","^^mdCalendarMonth","mdCalendarMonthBody"],scope:{offset:"=mdMonthOffset"},controller:a,controllerAs:"mdMonthBodyCtrl",bindToController:!0,link:function(e,t,a,i){var r=i[0],l=i[1],s=i[2];s.calendarCtrl=r,s.monthCtrl=l,s.arrowIcon=n.cloneNode(!0),e.$watch(function(){return s.offset},function(e,t){e!==t&&s.generateContent()})}}}function a(e,t,a){this.$element=e,this.dateUtil=t,this.dateLocale=a,this.monthCtrl=null,this.calendarCtrl=null,this.offset=null,this.focusAfterAppend=null}e.$inject=["$compile","$$mdSvgRegistry"],a.$inject=["$element","$$mdDateUtil","$mdDateLocale"],t.module("material.components.datepicker").directive("mdCalendarMonthBody",e),a.prototype.generateContent=function(){var e=this.dateUtil.incrementMonths(this.calendarCtrl.firstRenderableDate,this.offset);this.$element.empty().append(this.buildCalendarForMonth(e)),this.focusAfterAppend&&(this.focusAfterAppend.classList.add(this.calendarCtrl.FOCUSED_DATE_CLASS),this.focusAfterAppend.focus(),this.focusAfterAppend=null)},a.prototype.buildDateCell=function(e){var t=this.monthCtrl,a=this.calendarCtrl,n=document.createElement("td");if(n.tabIndex=-1,n.classList.add("md-calendar-date"),n.setAttribute("role","gridcell"),e){n.setAttribute("tabindex","-1"),n.setAttribute("aria-label",this.dateLocale.longDateFormatter(e)),n.id=a.getDateId(e,"month"),n.setAttribute("data-timestamp",e.getTime()),this.dateUtil.isSameDay(e,a.today)&&n.classList.add(a.TODAY_CLASS),this.dateUtil.isValidDate(a.selectedDate)&&this.dateUtil.isSameDay(e,a.selectedDate)&&(n.classList.add(a.SELECTED_DATE_CLASS),n.setAttribute("aria-selected","true"));var i=this.dateLocale.dates[e.getDate()];if(this.isDateEnabled(e)){var r=document.createElement("span");r.classList.add("md-calendar-date-selection-indicator"),r.textContent=i,n.appendChild(r),n.addEventListener("click",t.cellClickHandler),a.displayDate&&this.dateUtil.isSameDay(e,a.displayDate)&&(this.focusAfterAppend=n)}else n.classList.add("md-calendar-date-disabled"),n.textContent=i}return n},a.prototype.isDateEnabled=function(e){return this.dateUtil.isDateWithinRange(e,this.calendarCtrl.minDate,this.calendarCtrl.maxDate)&&(!t.isFunction(this.calendarCtrl.dateFilter)||this.calendarCtrl.dateFilter(e))},a.prototype.buildDateRow=function(e){var t=document.createElement("tr");return t.setAttribute("role","row"),t.setAttribute("aria-label",this.dateLocale.weekNumberFormatter(e)),t},a.prototype.buildCalendarForMonth=function(e){var t=this.dateUtil.isValidDate(e)?e:new Date,a=this.dateUtil.getFirstDateOfMonth(t),n=this.getLocaleDay_(a),i=this.dateUtil.getNumberOfDaysInMonth(t),r=document.createDocumentFragment(),l=1,s=this.buildDateRow(l);r.appendChild(s);var d=this.offset===this.monthCtrl.items.length-1,o=0,c=document.createElement("td"),h=document.createElement("span");if(h.textContent=this.dateLocale.monthHeaderFormatter(t),c.appendChild(h),c.classList.add("md-calendar-month-label"),this.calendarCtrl.maxDate&&a>this.calendarCtrl.maxDate?c.classList.add("md-calendar-month-label-disabled"):(c.addEventListener("click",this.monthCtrl.headerClickHandler),c.setAttribute("data-timestamp",a.getTime()),c.setAttribute("aria-label",this.dateLocale.monthFormatter(t)),c.appendChild(this.arrowIcon.cloneNode(!0))),n<=2){c.setAttribute("colspan","7");var u=this.buildDateRow();if(u.appendChild(c),r.insertBefore(u,s),d)return r}else o=3,c.setAttribute("colspan","3"),s.appendChild(c);for(var m=o;m<n;m++)s.appendChild(this.buildDateCell());for(var p=n,f=a,g=1;g<=i;g++){if(7===p){if(d)return r;p=0,l++,s=this.buildDateRow(l),r.appendChild(s)}f.setDate(g);var D=this.buildDateCell(f);s.appendChild(D),p++}for(;s.childNodes.length<7;)s.appendChild(this.buildDateCell());for(;r.childNodes.length<6;){for(var C=this.buildDateRow(),y=0;y<7;y++)C.appendChild(this.buildDateCell());r.appendChild(C)}return r},a.prototype.getLocaleDay_=function(e){return(e.getDay()+(7-this.dateLocale.firstDayOfWeek))%7}}(),function(){function e(){return{template:'<div class="md-calendar-scroll-mask"><md-virtual-repeat-container class="md-calendar-scroll-container"><table role="grid" tabindex="0" class="md-calendar" aria-readonly="true"><tbody md-calendar-year-body role="rowgroup" md-virtual-repeat="i in yearCtrl.items" md-year-offset="$index" class="md-calendar-year" md-start-index="yearCtrl.getFocusedYearIndex()" md-item-size="'+n+'"></tbody></table></md-virtual-repeat-container></div>',require:["^^mdCalendar","mdCalendarYear"],controller:a,controllerAs:"yearCtrl",bindToController:!0,link:function(e,t,a,n){var i=n[0],r=n[1];r.initialize(i)}}}function a(e,t,a,n,i){this.$element=e,this.$scope=t,this.$animate=a,this.$q=n,this.dateUtil=i,this.calendarScroller=e[0].querySelector(".md-virtual-repeat-scroller"),this.isInitialized=!1,this.isMonthTransitionInProgress=!1;var r=this;this.cellClickHandler=function(){r.calendarCtrl.setCurrentView("month",i.getTimestampFromNode(this))}}a.$inject=["$element","$scope","$animate","$q","$$mdDateUtil"],t.module("material.components.datepicker").directive("mdCalendarYear",e);var n=88;a.prototype.initialize=function(e){this.items={length:this.dateUtil.getYearDistance(e.firstRenderableDate,e.lastRenderableDate)+1},this.calendarCtrl=e,this.attachScopeListeners(),e.updateVirtualRepeat(),e.ngModelCtrl&&e.ngModelCtrl.$render()},a.prototype.getFocusedYearIndex=function(){var e=this.calendarCtrl;return this.dateUtil.getYearDistance(e.firstRenderableDate,e.displayDate||e.selectedDate||e.today)},a.prototype.changeDate=function(e){if(!this.isInitialized)return this.calendarCtrl.hideVerticalScrollbar(this),this.isInitialized=!0,this.$q.when();if(this.dateUtil.isValidDate(e)&&!this.isMonthTransitionInProgress){var t=this,a=this.animateDateChange(e);return t.isMonthTransitionInProgress=!0,t.calendarCtrl.displayDate=e,a.then(function(){t.isMonthTransitionInProgress=!1})}},a.prototype.animateDateChange=function(e){if(this.dateUtil.isValidDate(e)){var t=this.dateUtil.getYearDistance(this.calendarCtrl.firstRenderableDate,e);this.calendarScroller.scrollTop=t*n}return this.$q.when()},a.prototype.handleKeyEvent=function(e,t){var a=this.calendarCtrl,n=a.displayDate;if("select"===t)this.changeDate(n).then(function(){a.setCurrentView("month",n),a.focus(n)});else{var i=null,r=this.dateUtil;switch(t){case"move-right":i=r.incrementMonths(n,1);break;case"move-left":i=r.incrementMonths(n,-1);break;case"move-row-down":i=r.incrementMonths(n,6);break;case"move-row-up":i=r.incrementMonths(n,-6)}if(i){var l=a.minDate?r.getFirstDateOfMonth(a.minDate):null,s=a.maxDate?r.getFirstDateOfMonth(a.maxDate):null;i=r.getFirstDateOfMonth(this.dateUtil.clampDate(i,l,s)),this.changeDate(i).then(function(){a.focus(i)})}}},a.prototype.attachScopeListeners=function(){var e=this;e.$scope.$on("md-calendar-parent-changed",function(t,a){e.changeDate(a)}),e.$scope.$on("md-calendar-parent-action",t.bind(e,e.handleKeyEvent))}}(),function(){function e(){return{require:["^^mdCalendar","^^mdCalendarYear","mdCalendarYearBody"],scope:{offset:"=mdYearOffset"},controller:a,controllerAs:"mdYearBodyCtrl",bindToController:!0,link:function(e,t,a,n){var i=n[0],r=n[1],l=n[2];l.calendarCtrl=i,l.yearCtrl=r,e.$watch(function(){return l.offset},function(e,t){e!==t&&l.generateContent()})}}}function a(e,t,a){this.$element=e,this.dateUtil=t,this.dateLocale=a,this.calendarCtrl=null,this.yearCtrl=null,this.offset=null,this.focusAfterAppend=null}a.$inject=["$element","$$mdDateUtil","$mdDateLocale"],t.module("material.components.datepicker").directive("mdCalendarYearBody",e),a.prototype.generateContent=function(){var e=this.dateUtil.incrementYears(this.calendarCtrl.firstRenderableDate,this.offset);this.$element.empty().append(this.buildCalendarForYear(e)),this.focusAfterAppend&&(this.focusAfterAppend.classList.add(this.calendarCtrl.FOCUSED_DATE_CLASS),this.focusAfterAppend.focus(),this.focusAfterAppend=null)},a.prototype.buildMonthCell=function(e,t){var a=this.calendarCtrl,n=this.yearCtrl,i=this.buildBlankCell(),r=new Date(e,t,1);i.setAttribute("aria-label",this.dateLocale.monthFormatter(r)),i.id=a.getDateId(r,"year"),i.setAttribute("data-timestamp",r.getTime()),this.dateUtil.isSameMonthAndYear(r,a.today)&&i.classList.add(a.TODAY_CLASS),this.dateUtil.isValidDate(a.selectedDate)&&this.dateUtil.isSameMonthAndYear(r,a.selectedDate)&&(i.classList.add(a.SELECTED_DATE_CLASS),i.setAttribute("aria-selected","true"));var l=this.dateLocale.shortMonths[t];if(this.dateUtil.isMonthWithinRange(r,a.minDate,a.maxDate)){var s=document.createElement("span");s.classList.add("md-calendar-date-selection-indicator"),s.textContent=l,i.appendChild(s),i.addEventListener("click",n.cellClickHandler),a.displayDate&&this.dateUtil.isSameMonthAndYear(r,a.displayDate)&&(this.focusAfterAppend=i)}else i.classList.add("md-calendar-date-disabled"),i.textContent=l;return i},a.prototype.buildBlankCell=function(){var e=document.createElement("td");return e.tabIndex=-1,e.classList.add("md-calendar-date"),e.setAttribute("role","gridcell"),e.setAttribute("tabindex","-1"),e},a.prototype.buildCalendarForYear=function(e){var t,a=e.getFullYear(),n=document.createDocumentFragment(),i=document.createElement("tr"),r=document.createElement("td");for(r.className="md-calendar-month-label",r.textContent=a,i.appendChild(r),t=0;t<6;t++)i.appendChild(this.buildMonthCell(a,t));n.appendChild(i);var l=document.createElement("tr");for(l.appendChild(this.buildBlankCell()),t=6;t<12;t++)l.appendChild(this.buildMonthCell(a,t));return n.appendChild(l),n}}(),function(){t.module("material.components.datepicker").config(["$provide",function(e){function t(){this.months=null,this.shortMonths=null,this.days=null,this.shortDays=null,this.dates=null,this.firstDayOfWeek=0,this.formatDate=null,this.parseDate=null,this.monthHeaderFormatter=null,this.weekNumberFormatter=null,this.longDateFormatter=null,this.msgCalendar="",this.msgOpenCalendar=""}t.prototype.$get=function(e,t){function a(e){if(!e)return"";var a=e.toLocaleTimeString(),n=e;return 0!=e.getHours()||a.indexOf("11:")===-1&&a.indexOf("23:")===-1||(n=new Date(e.getFullYear(),e.getMonth(),e.getDate(),1,0,0)),t("date")(n,"M/d/yyyy")}function n(e){return new Date(e)}function i(e){e=e.trim();var t=/^(([a-zA-Z]{3,}|[0-9]{1,4})([ \.,]+|[\/\-])){2}([a-zA-Z]{3,}|[0-9]{1,4})$/;return t.test(e)}function r(e){return g.shortMonths[e.getMonth()]+" "+e.getFullYear()}function l(e){return g.months[e.getMonth()]+" "+e.getFullYear()}function s(e){return"Week "+e}function d(e){return[g.days[e.getDay()],g.months[e.getMonth()],g.dates[e.getDate()],e.getFullYear()].join(" ")}for(var o=e.DATETIME_FORMATS.SHORTDAY.map(function(e){return e.substring(0,1)}),c=Array(32),h=1;h<=31;h++)c[h]=h;var u="Calendar",m="Open calendar",p=new Date(1880,0,1),f=new Date(p.getFullYear()+250,0,1),g={months:this.months||e.DATETIME_FORMATS.MONTH,shortMonths:this.shortMonths||e.DATETIME_FORMATS.SHORTMONTH,days:this.days||e.DATETIME_FORMATS.DAY,shortDays:this.shortDays||o,dates:this.dates||c,firstDayOfWeek:this.firstDayOfWeek||0,formatDate:this.formatDate||a,parseDate:this.parseDate||n,isDateComplete:this.isDateComplete||i,monthHeaderFormatter:this.monthHeaderFormatter||r,monthFormatter:this.monthFormatter||l,weekNumberFormatter:this.weekNumberFormatter||s,longDateFormatter:this.longDateFormatter||d,msgCalendar:this.msgCalendar||u,msgOpenCalendar:this.msgOpenCalendar||m,firstRenderableDate:this.firstRenderableDate||p,lastRenderableDate:this.lastRenderableDate||f};return g},t.prototype.$get.$inject=["$locale","$filter"],e.provider("$mdDateLocale",new t)}])}(),function(){t.module("material.components.datepicker").factory("$$mdDateUtil",function(){function e(e){return new Date(e.getFullYear(),e.getMonth(),1)}function a(e){return new Date(e.getFullYear(),e.getMonth()+1,0).getDate()}function n(e){return new Date(e.getFullYear(),e.getMonth()+1,1)}function i(e){return new Date(e.getFullYear(),e.getMonth()-1,1)}function r(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()}function l(e,t){return e.getDate()==t.getDate()&&r(e,t)}function s(e,t){var a=n(e);return r(a,t)}function d(e,t){var a=i(e);return r(t,a)}function o(e,t){return D((e.getTime()+t.getTime())/2)}function c(t){var a=e(t);return Math.floor((a.getDay()+t.getDate()-1)/7)}function h(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t)}function u(e,t){var n=new Date(e.getFullYear(),e.getMonth()+t,1),i=a(n);return i<e.getDate()?n.setDate(i):n.setDate(e.getDate()),n}function m(e,t){return 12*(t.getFullYear()-e.getFullYear())+(t.getMonth()-e.getMonth())}function p(e){return new Date(e.getFullYear(),e.getMonth(),a(e))}function f(e){return null!=e&&e.getTime&&!isNaN(e.getTime())}function g(e){f(e)&&e.setHours(0,0,0,0)}function D(e){var a;return a=t.isUndefined(e)?new Date:new Date(e),g(a),a}function C(e,t,a){var n=D(e),i=f(t)?D(t):null,r=f(a)?D(a):null;return(!i||i<=n)&&(!r||r>=n)}function y(e,t){return u(e,12*t)}function v(e,t){return t.getFullYear()-e.getFullYear()}function b(e,t,a){var n=e;return t&&e<t&&(n=new Date(t.getTime())),a&&e>a&&(n=new Date(a.getTime())),n}function $(e){if(e&&e.hasAttribute("data-timestamp"))return Number(e.getAttribute("data-timestamp"))}function M(e,t,a){var n=e.getMonth(),i=e.getFullYear();return(!t||t.getFullYear()<i||t.getMonth()<=n)&&(!a||a.getFullYear()>i||a.getMonth()>=n)}return{getFirstDateOfMonth:e,getNumberOfDaysInMonth:a,getDateInNextMonth:n,getDateInPreviousMonth:i,isInNextMonth:s,isInPreviousMonth:d,getDateMidpoint:o,isSameMonthAndYear:r,getWeekOfMonth:c,incrementDays:h,incrementMonths:u,getLastDateOfMonth:p,isSameDay:l,getMonthDistance:m,isValidDate:f,setDateTimeToMidnight:g,createDateAtMidnight:D,isDateWithinRange:C,incrementYears:y,getYearDistance:v,clampDate:b,getTimestampFromNode:$,isMonthWithinRange:M}})}(),function(){function a(e,a,i,r){return{template:function(t,a){var n=a.mdHideIcons,i=a.ariaLabel||a.mdPlaceholder,r="all"===n||"calendar"===n?"":'<md-button class="md-datepicker-button md-icon-button" type="button" tabindex="-1" aria-hidden="true" ng-click="ctrl.openCalendarPane($event)"><md-icon class="md-datepicker-calendar-icon" aria-label="md-calendar" md-svg-src="'+e.mdCalendar+'"></md-icon></md-button>',l="all"===n||"triangle"===n?"":'<md-button type="button" md-no-ink class="md-datepicker-triangle-button md-icon-button" ng-click="ctrl.openCalendarPane($event)" aria-label="{{::ctrl.dateLocale.msgOpenCalendar}}"><div class="md-datepicker-expand-triangle"></div></md-button>';return r+'<div class="md-datepicker-input-container" ng-class="{\'md-datepicker-focused\': ctrl.isFocused}"><input '+(i?'aria-label="'+i+'" ':"")+'class="md-datepicker-input" aria-haspopup="true" ng-focus="ctrl.setFocused(true)" ng-blur="ctrl.setFocused(false)"> '+l+'</div><div class="md-datepicker-calendar-pane md-whiteframe-z1"><div class="md-datepicker-input-mask"><div class="md-datepicker-input-mask-opaque"></div></div><div class="md-datepicker-calendar"><md-calendar role="dialog" aria-label="{{::ctrl.dateLocale.msgCalendar}}" md-current-view="{{::ctrl.currentView}}"md-min-date="ctrl.minDate"md-max-date="ctrl.maxDate"md-date-filter="ctrl.dateFilter"ng-model="ctrl.date" ng-if="ctrl.isCalendarOpen"></md-calendar></div></div>'},require:["ngModel","mdDatepicker","?^mdInputContainer","?^form"],scope:{minDate:"=mdMinDate",maxDate:"=mdMaxDate",placeholder:"@mdPlaceholder",currentView:"@mdCurrentView",dateFilter:"=mdDateFilter",isOpen:"=?mdIsOpen",debounceInterval:"=mdDebounceInterval"},controller:n,controllerAs:"ctrl",bindToController:!0,link:function(e,n,l,o){var c=o[0],h=o[1],u=o[2],m=o[3],p=a.parseAttributeBoolean(l.mdNoAsterisk);if(h.configureNgModel(c,u,r),u){var f=n[0].querySelector(".md-errors-spacer");f&&n.after(t.element("<div>").append(f)),u.setHasPlaceholder(l.mdPlaceholder),u.input=n,u.element.addClass(s).toggleClass(d,"calendar"!==l.mdHideIcons&&"all"!==l.mdHideIcons),u.label?p||l.$observe("required",function(e){u.label.toggleClass("md-required",!!e)}):i.expect(n,"aria-label",l.mdPlaceholder),e.$watch(u.isErrorGetter||function(){return c.$invalid&&(c.$touched||m&&m.$submitted)},u.setInvalid)}else if(m)var g=e.$watch(function(){return m.$submitted},function(e){e&&(h.updateErrorState(),g())})}}}function n(e,a,n,i,r,l,s,d,o,c,h,u){this.$window=i,this.dateLocale=d,this.dateUtil=o,this.$mdConstant=r,this.$mdUtil=s,this.$$rAF=c,this.documentElement=t.element(document.documentElement),this.ngModelCtrl=null,this.inputElement=a[0].querySelector("input"),this.ngInputElement=t.element(this.inputElement),this.inputContainer=a[0].querySelector(".md-datepicker-input-container"),this.calendarPane=a[0].querySelector(".md-datepicker-calendar-pane"),this.calendarButton=a[0].querySelector(".md-datepicker-button"),this.inputMask=t.element(a[0].querySelector(".md-datepicker-input-mask-opaque")),this.$element=a,this.$attrs=n,this.$scope=e,this.date=null,this.isFocused=!1,this.isDisabled,this.setDisabled(a[0].disabled||t.isString(n.disabled)),this.isCalendarOpen=!1,this.openOnFocus=n.hasOwnProperty("mdOpenOnFocus"),this.mdInputContainer=null,this.calendarPaneOpenedFrom=null,this.calendarPane.id="md-date-pane"+s.nextUid(),this.bodyClickHandler=t.bind(this,this.handleBodyClick),this.windowEventName=h.isIos||h.isAndroid?"orientationchange":"resize",this.windowEventHandler=s.debounce(t.bind(this,this.closeCalendarPane),100),this.windowBlurHandler=t.bind(this,this.handleWindowBlur),this.ngDateFilter=u("date"),this.leftMargin=20,this.topMargin=null,n.tabindex?(this.ngInputElement.attr("tabindex",n.tabindex),n.$set("tabindex",null)):n.$set("tabindex","-1"),l(a),l(t.element(this.calendarPane)),this.installPropertyInterceptors(),this.attachChangeListeners(),this.attachInteractionListeners();var m=this;e.$on("$destroy",function(){m.detachCalendarPane()}),n.mdIsOpen&&e.$watch("ctrl.isOpen",function(e){e?m.openCalendarPane({target:m.inputElement}):m.closeCalendarPane()})}n.$inject=["$scope","$element","$attrs","$window","$mdConstant","$mdTheming","$mdUtil","$mdDateLocale","$$mdDateUtil","$$rAF","$mdGesture","$filter"],a.$inject=["$$mdSvgRegistry","$mdUtil","$mdAria","inputDirective"],t.module("material.components.datepicker").directive("mdDatepicker",a);var i=3,r="md-datepicker-invalid",l="md-datepicker-open",s="_md-datepicker-floating-label",d="_md-datepicker-has-calendar-icon",o=500,c=368,h=360;n.prototype.configureNgModel=function(e,a,n){this.ngModelCtrl=e,this.mdInputContainer=a,this.$attrs.$set("type","date"),n[0].link.pre(this.$scope,{on:t.noop,val:t.noop,0:{}},this.$attrs,[e]);var i=this;i.ngModelCtrl.$formatters.push(function(e){if(e&&!(e instanceof Date))throw Error("The ng-model for md-datepicker must be a Date instance. Currently the model is a: "+typeof e);return i.date=e,i.inputElement.value=i.dateLocale.formatDate(e),i.mdInputContainer&&i.mdInputContainer.setHasValue(!!e),i.resizeInputElement(),i.updateErrorState(),e}),e.$viewChangeListeners.unshift(t.bind(this,this.updateErrorState))},n.prototype.attachChangeListeners=function(){var e=this;e.$scope.$on("md-calendar-change",function(t,a){e.setModelValue(a),e.date=a,e.inputElement.value=e.dateLocale.formatDate(a),e.mdInputContainer&&e.mdInputContainer.setHasValue(!!a),e.closeCalendarPane(),e.resizeInputElement(),e.updateErrorState()}),e.ngInputElement.on("input",t.bind(e,e.resizeInputElement));var a=t.isDefined(this.debounceInterval)?this.debounceInterval:o;e.ngInputElement.on("input",e.$mdUtil.debounce(e.handleInputEvent,a,e))},n.prototype.attachInteractionListeners=function(){var e=this,a=this.$scope,n=this.$mdConstant.KEY_CODE;e.ngInputElement.on("keydown",function(t){t.altKey&&t.keyCode==n.DOWN_ARROW&&(e.openCalendarPane(t),a.$digest())}),e.openOnFocus&&(e.ngInputElement.on("focus",t.bind(e,e.openCalendarPane)),t.element(e.$window).on("blur",e.windowBlurHandler),a.$on("$destroy",function(){t.element(e.$window).off("blur",e.windowBlurHandler)})),a.$on("md-calendar-close",function(){e.closeCalendarPane()})},n.prototype.installPropertyInterceptors=function(){var e=this;if(this.$attrs.ngDisabled){var t=this.$scope.$parent;t&&t.$watch(this.$attrs.ngDisabled,function(t){e.setDisabled(t)})}Object.defineProperty(this,"placeholder",{get:function(){return e.inputElement.placeholder},set:function(t){e.inputElement.placeholder=t||""}})},n.prototype.setDisabled=function(e){this.isDisabled=e,this.inputElement.disabled=e,this.calendarButton&&(this.calendarButton.disabled=e)},n.prototype.updateErrorState=function(e){var a=e||this.date;if(this.clearErrorState(),this.dateUtil.isValidDate(a)){if(a=this.dateUtil.createDateAtMidnight(a),this.dateUtil.isValidDate(this.minDate)){var n=this.dateUtil.createDateAtMidnight(this.minDate);this.ngModelCtrl.$setValidity("mindate",a>=n)}if(this.dateUtil.isValidDate(this.maxDate)){var i=this.dateUtil.createDateAtMidnight(this.maxDate);this.ngModelCtrl.$setValidity("maxdate",a<=i)}t.isFunction(this.dateFilter)&&this.ngModelCtrl.$setValidity("filtered",this.dateFilter(a))}else this.ngModelCtrl.$setValidity("valid",null==a);this.ngModelCtrl.$valid||this.inputContainer.classList.add(r)},n.prototype.clearErrorState=function(){this.inputContainer.classList.remove(r),["mindate","maxdate","filtered","valid"].forEach(function(e){this.ngModelCtrl.$setValidity(e,!0)},this)},n.prototype.resizeInputElement=function(){this.inputElement.size=this.inputElement.value.length+i},n.prototype.handleInputEvent=function(){var e=this.inputElement.value,t=e?this.dateLocale.parseDate(e):null;this.dateUtil.setDateTimeToMidnight(t);var a=""==e||this.dateUtil.isValidDate(t)&&this.dateLocale.isDateComplete(e)&&this.isDateEnabled(t);a&&(this.setModelValue(t),this.date=t),this.updateErrorState(t)},n.prototype.isDateEnabled=function(e){return this.dateUtil.isDateWithinRange(e,this.minDate,this.maxDate)&&(!t.isFunction(this.dateFilter)||this.dateFilter(e))},n.prototype.attachCalendarPane=function(){var e=this.calendarPane,a=document.body;e.style.transform="",this.$element.addClass(l),this.mdInputContainer&&this.mdInputContainer.element.addClass(l),t.element(a).addClass("md-datepicker-is-showing");var n=this.inputContainer.getBoundingClientRect(),i=a.getBoundingClientRect();(!this.topMargin||this.topMargin<0)&&(this.topMargin=(this.inputMask.parent().prop("clientHeight")-this.ngInputElement.prop("clientHeight"))/2);var r=n.top-i.top-this.topMargin,s=n.left-i.left-this.leftMargin,d=i.top<0&&0==document.body.scrollTop?-i.top:document.body.scrollTop,o=i.left<0&&0==document.body.scrollLeft?-i.left:document.body.scrollLeft,u=d+this.$window.innerHeight,m=o+this.$window.innerWidth;if(this.inputMask.css({position:"absolute",left:this.leftMargin+"px",top:this.topMargin+"px",width:n.width-1+"px",height:n.height-2+"px"}),s+h>m){if(m-h>0)s=m-h;else{s=o;var p=this.$window.innerWidth/h;e.style.transform="scale("+p+")"}e.classList.add("md-datepicker-pos-adjusted")}r+c>u&&u-c>d&&(r=u-c,e.classList.add("md-datepicker-pos-adjusted")),e.style.left=s+"px",e.style.top=r+"px",document.body.appendChild(e),this.$$rAF(function(){e.classList.add("md-pane-open")})},n.prototype.detachCalendarPane=function(){this.$element.removeClass(l),this.mdInputContainer&&this.mdInputContainer.element.removeClass(l),t.element(document.body).removeClass("md-datepicker-is-showing"),this.calendarPane.classList.remove("md-pane-open"),this.calendarPane.classList.remove("md-datepicker-pos-adjusted"),this.isCalendarOpen&&this.$mdUtil.enableScrolling(),this.calendarPane.parentNode&&this.calendarPane.parentNode.removeChild(this.calendarPane);
},n.prototype.openCalendarPane=function(t){if(!this.isCalendarOpen&&!this.isDisabled&&!this.inputFocusedOnWindowBlur){this.isCalendarOpen=this.isOpen=!0,this.calendarPaneOpenedFrom=t.target,this.$mdUtil.disableScrollAround(this.calendarPane),this.attachCalendarPane(),this.focusCalendar(),this.evalAttr("ngFocus");var a=this;this.$mdUtil.nextTick(function(){a.documentElement.on("click touchstart",a.bodyClickHandler)},!1),e.addEventListener(this.windowEventName,this.windowEventHandler)}},n.prototype.closeCalendarPane=function(){function t(){a.isCalendarOpen=a.isOpen=!1}if(this.isCalendarOpen){var a=this;a.detachCalendarPane(),a.ngModelCtrl.$setTouched(),a.evalAttr("ngBlur"),a.documentElement.off("click touchstart",a.bodyClickHandler),e.removeEventListener(a.windowEventName,a.windowEventHandler),a.calendarPaneOpenedFrom.focus(),a.calendarPaneOpenedFrom=null,a.openOnFocus?a.$mdUtil.nextTick(t):t()}},n.prototype.getCalendarCtrl=function(){return t.element(this.calendarPane.querySelector("md-calendar")).controller("mdCalendar")},n.prototype.focusCalendar=function(){var e=this;this.$mdUtil.nextTick(function(){e.getCalendarCtrl().focus()},!1)},n.prototype.setFocused=function(e){e||this.ngModelCtrl.$setTouched(),this.openOnFocus||this.evalAttr(e?"ngFocus":"ngBlur"),this.isFocused=e},n.prototype.handleBodyClick=function(e){if(this.isCalendarOpen){var t=this.$mdUtil.getClosest(e.target,"md-calendar");t||this.closeCalendarPane(),this.$scope.$digest()}},n.prototype.handleWindowBlur=function(){this.inputFocusedOnWindowBlur=document.activeElement===this.inputElement},n.prototype.evalAttr=function(e){this.$attrs[e]&&this.$scope.$parent.$eval(this.$attrs[e])},n.prototype.setModelValue=function(e){this.ngModelCtrl.$setViewValue(this.ngDateFilter(e,"yyyy-MM-dd"))}}()}(window,window.angular);