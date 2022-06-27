!function(A){"use strict";A.module("angular-preload-image",[]),A.module("angular-preload-image").factory("preLoader",function(){return function(e,a,r){A.element(new Image).bind("load",function(){a()}).bind("error",function(){r()}).attr("src",e)}}),A.module("angular-preload-image").directive("preloadImage",["preLoader",function(A){return{restrict:"A",terminal:!0,priority:100,link:function(e,a,r){e.default=r.defaultImage||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=",r.$observe("ngSrc",function(){var a=r.ngSrc;r.$set("src",e.default),A(a,function(){r.$set("src",a)},function(){void 0!=r.fallbackImage&&r.$set("src",r.fallbackImage)})})}}}]),A.module("angular-preload-image").directive("preloadBgImage",["preLoader",function(A){return{restrict:"A",link:function(e,a,r){void 0!=r.preloadBgImage&&(e.default=r.defaultImage||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=",r.$observe("preloadBgImage",function(){a.css({"background-image":'url("'+e.default+'")'}),A(r.preloadBgImage,function(){a.css({"background-image":'url("'+r.preloadBgImage+'")'})},function(){void 0!=r.fallbackImage&&a.css({"background-image":'url("'+r.fallbackImage+'")'})})}))}}}])}(angular);