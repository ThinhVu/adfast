!function(e,t,r){"use strict";function n(e,r,n,a,i,o){function s(o,s,m){function g(t,n,i,s,m){var u=++y,v=a.now(),g=n-t,p=l(o.mdDiameter),w=p-c(p),h=i||r.easeFn,M=s||r.duration;n===t?k.attr("d",d(n,p,w,m)):I=f(function r(){var n=e.Math.max(0,e.Math.min(a.now()-v,M));k.attr("d",d(h(n,t,g,M),p,w,m)),u===y&&n<M&&(I=f(r))})}function $(){g(P,q,r.easeFnIndeterminate,r.durationIndeterminate,D),D=(D+q)%100;var e=P;P=-q,q=-e}function C(){F||(F=i($,r.durationIndeterminate+50,0,!1),$(),s.addClass(M).removeAttr("aria-valuenow"))}function x(){F&&(i.cancel(F),F=null,s.removeClass(M))}var I,F,b=s[0],A=t.element(b.querySelector("svg")),k=t.element(b.querySelector("path")),P=r.startIndeterminate,q=r.endIndeterminate,D=0,y=0;n(s),s.toggleClass(h,m.hasOwnProperty("disabled")),o.mdMode===w&&C(),o.$on("$destroy",function(){x(),I&&v(I)}),o.$watchGroup(["value","mdMode",function(){var e=b.disabled;return e===!0||e===!1?e:t.isDefined(s.attr("disabled"))}],function(e,t){var r=e[1],n=e[2],a=t[2];if(n!==a&&s.toggleClass(h,!!n),n)x();else if(r!==p&&r!==w&&(r=w,m.$set("mdMode",r)),r===w)C();else{var i=u(e[0]);x(),s.attr("aria-valuenow",i),g(u(t[0]),i)}}),o.$watch("mdDiameter",function(e){var t=l(e),r=c(t),n=t/2+"px",a={width:t+"px",height:t+"px"};A[0].setAttribute("viewBox","0 0 "+t+" "+t),A.css(a).css("transform-origin",n+" "+n+" "+n),s.css(a),k.css("stroke-width",r+"px")})}function d(e,t,r,n){var a,i=3.5999,o=n||0,s=t/2,d=r/2,u=o*i,l=e*i,c=m(s,d,u),f=m(s,d,l+u),v=l<0?0:1;return a=l<0?l>=-180?0:1:l<=180?0:1,"M"+c+"A"+d+","+d+" 0 "+a+","+v+" "+f}function m(t,r,n){var a=(n-90)*g;return t+r*e.Math.cos(a)+","+(t+r*e.Math.sin(a))}function u(t){return e.Math.max(0,e.Math.min(t||0,100))}function l(e){var t=r.progressSize;if(e){var n=parseFloat(e);return e.lastIndexOf("%")===e.length-1&&(n=n/100*t),n}return t}function c(e){return r.strokeWidth/100*e}var f=e.requestAnimationFrame||e.webkitRequestAnimationFrame||t.noop,v=e.cancelAnimationFrame||e.webkitCancelAnimationFrame||e.webkitCancelRequestAnimationFrame||t.noop,g=e.Math.PI/180,p="determinate",w="indeterminate",h="_md-progress-circular-disabled",M="md-mode-indeterminate";return{restrict:"E",scope:{value:"@",mdDiameter:"@",mdMode:"@"},template:'<svg xmlns="http://www.w3.org/2000/svg"><path fill="none"/></svg>',compile:function(e,r){if(e.attr({"aria-valuemin":0,"aria-valuemax":100,role:"progressbar"}),t.isUndefined(r.mdMode)){var n=t.isDefined(r.value),a=n?p:w;r.$set("mdMode",a)}else r.$set("mdMode",r.mdMode.trim());return s}}}function a(){function e(e,t,r,n){return r*e/n+t}function r(e,t,r,n){var a=(e/=n)*e,i=a*e;return t+r*(6*i*a+-15*a*a+10*i)}var n={progressSize:50,strokeWidth:10,duration:100,easeFn:e,durationIndeterminate:500,startIndeterminate:3,endIndeterminate:80,easeFnIndeterminate:r,easingPresets:{linearEase:e,materialEase:r}};return{configure:function(e){return n=t.extend(n,e||{})},$get:function(){return n}}}t.module("material.components.progressCircular",["material.core"]),n.$inject=["$window","$mdProgressCircular","$mdTheming","$mdUtil","$interval","$log"],t.module("material.components.progressCircular").directive("mdProgressCircular",n),t.module("material.components.progressCircular").provider("$mdProgressCircular",a)}(window,window.angular);