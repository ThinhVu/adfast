!function(e,r,o){"use strict";!function(){function e(e,o,n){function a(e,r){try{r&&e.css(u(r))}catch(e){n.error(e.message)}}function s(e){var r=c(e);return i(r)}function i(r,n){n=n||!1;var t=e.PALETTES[r.palette][r.hue];return t=n?t.contrast:t.value,o.supplant("rgba({0}, {1}, {2}, {3})",[t[0],t[1],t[2],t[3]||r.opacity])}function u(e){var o={},n=e.hasOwnProperty("color");return r.forEach(e,function(e,r){var t=c(e),a=r.indexOf("background")>-1;o[r]=i(t),a&&!n&&(o.color=i(t,!0))}),o}function l(o){return r.isDefined(e.THEMES[o.split("-")[0]])}function c(o){var n=o.split("-"),t=r.isDefined(e.THEMES[n[0]]),a=t?n.splice(0,1)[0]:e.defaultTheme();return{theme:a,palette:h(n,a),hue:m(n,a),opacity:n[2]||1}}function h(r,n){var a=r.length>1&&t.indexOf(r[1])!==-1,s=r[0].replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();if(a&&(s=r[0]+"-"+r.splice(1,1)),t.indexOf(s)===-1){var i=e.THEMES[n].colors[s];if(!i)throw new Error(o.supplant("mdColors: couldn't find '{palette}' in the palettes.",{palette:s}));s=i.name}return s}function m(r,n){var t=e.THEMES[n].colors;if("hue"===r[1]){var a=parseInt(r.splice(2,1)[0],10);if(a<1||a>3)throw new Error(o.supplant("mdColors: 'hue-{hueNumber}' is not a valid hue, can be only 'hue-1', 'hue-2' and 'hue-3'",{hueNumber:a}));if(r[1]="hue-"+a,!(r[0]in t))throw new Error(o.supplant("mdColors: 'hue-x' can only be used with [{availableThemes}], but was used with '{usedTheme}'",{availableThemes:Object.keys(t).join(", "),usedTheme:r[0]}));return t[r[0]].hues[r[1]]}return r[1]||t[r[0]in t?r[0]:"primary"].hues.default}return t=t||Object.keys(e.PALETTES),{applyThemeColors:a,getThemeColor:s,hasTheme:l}}function o(e,o,t,a){return{restrict:"A",require:["^?mdTheme"],compile:function(s,i){function u(){var e=i.mdColors,t=e.indexOf("::")>-1,a=!!t||n.test(i.mdColors);i.mdColors=e.replace("::","");var s=r.isDefined(i.mdColorsWatch);return!t&&!a&&(!s||o.parseAttributeBoolean(i.mdColorsWatch))}var l=u();return function(o,n,s,i){var u=i[0],c={},h=function(r){"string"!=typeof r&&(r=""),s.mdColors||(s.mdColors="{}");var n=a(s.mdColors)(o);return u&&Object.keys(n).forEach(function(o){var t=n[o];e.hasTheme(t)||(n[o]=(r||u.$mdTheme)+"-"+t)}),m(n),n},m=function(e){if(!r.equals(e,c)){var o=Object.keys(c);c.background&&!o.color&&o.push("color"),o.forEach(function(e){n.css(e,"")})}c=e},d=r.noop;u&&(d=u.registerChanges(function(r){e.applyThemeColors(n,h(r))})),o.$on("$destroy",function(){d()});try{l?o.$watch(h,r.bind(this,e.applyThemeColors,n),!0):e.applyThemeColors(n,h())}catch(e){t.error(e.message)}}}}}o.$inject=["$mdColors","$mdUtil","$log","$parse"],e.$inject=["$mdTheming","$mdUtil","$log"];var n=/^{((\s|,)*?["'a-zA-Z-]+?\s*?:\s*?('|")[a-zA-Z0-9-.]*('|"))+\s*}$/,t=null;r.module("material.components.colors",["material.core"]).directive("mdColors",o).service("$mdColors",e)}()}(window,window.angular);