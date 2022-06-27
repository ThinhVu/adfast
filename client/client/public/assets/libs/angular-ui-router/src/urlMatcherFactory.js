function UrlMatcher(e,t,r){function n(t,r,n,i){if(d.push(t),l[t])return l[t];if(!/^\w+([-.]+\w+)*(?:\[\])?$/.test(t))throw new Error("Invalid parameter name '"+t+"' in pattern '"+e+"'");if(h[t])throw new Error("Duplicate parameter name '"+t+"' in pattern '"+e+"'");return h[t]=new $$UMFP.Param(t,r,n,i),h[t]}function i(e,t,r,n){var i=["",""],a=e.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!t)return a;switch(r){case!1:i=["(",")"+(n?"?":"")];break;case!0:a=a.replace(/\/$/,""),i=["(?:/(",")|/)?"];break;default:i=["("+r+"|",")?"]}return a+i[0]+t+i[1]}function a(r,n){var i,a,o,u,s;return i=r[2]||r[3],s=t.params[i],o=e.substring(f,r.index),a=n?r[4]:r[4]||("*"==r[1]?".*":null),a&&(u=$$UMFP.type(a)||inherit($$UMFP.type("string"),{pattern:new RegExp(a,t.caseInsensitive?"i":void 0)})),{id:i,regexp:a,segment:o,type:u,cfg:s}}t=extend({params:{}},isObject(t)?t:{});var o,u=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,s=/([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,c="^",f=0,p=this.segments=[],l=r?r.params:{},h=this.params=r?r.params.$$new():new $$UMFP.ParamSet,d=[];this.source=e;for(var y,g,v;(o=u.exec(e))&&(y=a(o,!1),!(y.segment.indexOf("?")>=0));)g=n(y.id,y.type,y.cfg,"path"),c+=i(y.segment,g.type.pattern.source,g.squash,g.isOptional),p.push(y.segment),f=u.lastIndex;v=e.substring(f);var m=v.indexOf("?");if(m>=0){var $=this.sourceSearch=v.substring(m);if(v=v.substring(0,m),this.sourcePath=e.substring(0,f+m),$.length>0)for(f=0;o=s.exec($);)y=a(o,!0),g=n(y.id,y.type,y.cfg,"search"),f=u.lastIndex}else this.sourcePath=e,this.sourceSearch="";c+=i(v)+(t.strict===!1?"/?":"")+"$",p.push(v),this.regexp=new RegExp(c,t.caseInsensitive?"i":void 0),this.prefix=p[0],this.$$paramNames=d}function Type(e){extend(this,e)}function $UrlMatcherFactory(){function e(e){return null!=e?e.toString().replace(/(~|\/)/g,function(e){return{"~":"~~","/":"~2F"}[e]}):e}function t(e){return null!=e?e.toString().replace(/(~~|~2F)/g,function(e){return{"~~":"~","~2F":"/"}[e]}):e}function r(){return{strict:s,caseInsensitive:u}}function n(e){return isFunction(e)||isArray(e)&&isFunction(e[e.length-1])}function i(){for(;l.length;){var e=l.shift();if(e.pattern)throw new Error("You cannot override a type's .pattern at runtime.");angular.extend(f[e.name],o.invoke(e.def))}}function a(e){extend(this,e||{})}$$UMFP=this;var o,u=!1,s=!0,c=!1,f={},p=!0,l=[],h={string:{encode:e,decode:t,is:function(e){return null==e||!isDefined(e)||"string"==typeof e},pattern:/[^\/]*/},int:{encode:e,decode:function(e){return parseInt(e,10)},is:function(e){return isDefined(e)&&this.decode(e.toString())===e},pattern:/\d+/},bool:{encode:function(e){return e?1:0},decode:function(e){return 0!==parseInt(e,10)},is:function(e){return e===!0||e===!1},pattern:/0|1/},date:{encode:function(e){if(this.is(e))return[e.getFullYear(),("0"+(e.getMonth()+1)).slice(-2),("0"+e.getDate()).slice(-2)].join("-")},decode:function(e){if(this.is(e))return e;var t=this.capture.exec(e);return t?new Date(t[1],t[2]-1,t[3]):void 0},is:function(e){return e instanceof Date&&!isNaN(e.valueOf())},equals:function(e,t){return this.is(e)&&this.is(t)&&e.toISOString()===t.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:angular.toJson,decode:angular.fromJson,is:angular.isObject,equals:angular.equals,pattern:/[^\/]*/},any:{encode:angular.identity,decode:angular.identity,equals:angular.equals,pattern:/.*/}};$UrlMatcherFactory.$$getDefaultValue=function(e){if(!n(e.value))return e.value;if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(e.value)},this.caseInsensitive=function(e){return isDefined(e)&&(u=e),u},this.strictMode=function(e){return isDefined(e)&&(s=e),s},this.defaultSquashPolicy=function(e){if(!isDefined(e))return c;if(e!==!0&&e!==!1&&!isString(e))throw new Error("Invalid squash policy: "+e+". Valid policies: false, true, arbitrary-string");return c=e,e},this.compile=function(e,t){return new UrlMatcher(e,extend(r(),t))},this.isMatcher=function(e){if(!isObject(e))return!1;var t=!0;return forEach(UrlMatcher.prototype,function(r,n){isFunction(r)&&(t=t&&isDefined(e[n])&&isFunction(e[n]))}),t},this.type=function(e,t,r){if(!isDefined(t))return f[e];if(f.hasOwnProperty(e))throw new Error("A type named '"+e+"' has already been defined.");return f[e]=new Type(extend({name:e},t)),r&&(l.push({name:e,def:r}),p||i()),this},forEach(h,function(e,t){f[t]=new Type(extend({name:t},e))}),f=inherit(f,{}),this.$get=["$injector",function(e){return o=e,p=!1,i(),forEach(h,function(e,t){f[t]||(f[t]=new Type(e))}),this}],this.Param=function(e,t,r,i){function a(e){var t=isObject(e)?objectKeys(e):[],r=indexOf(t,"value")===-1&&indexOf(t,"type")===-1&&indexOf(t,"squash")===-1&&indexOf(t,"array")===-1;return r&&(e={value:e}),e.$$fn=n(e.value)?e.value:function(){return e.value},e}function u(t,r,n){if(t.type&&r)throw new Error("Param '"+e+"' has two type configurations.");return r?r:t.type?angular.isString(t.type)?f[t.type]:t.type instanceof Type?t.type:new Type(t.type):"config"===n?f.any:f.string}function s(){var t={array:"search"===i&&"auto"},n=e.match(/\[\]$/)?{array:!0}:{};return extend(t,n,r).array}function p(e,t){var r=e.squash;if(!t||r===!1)return!1;if(!isDefined(r)||null==r)return c;if(r===!0||isString(r))return r;throw new Error("Invalid squash policy: '"+r+"'. Valid policies: false, true, or arbitrary string")}function l(e,t,r,n){var i,a,o=[{from:"",to:r||t?void 0:""},{from:null,to:r||t?void 0:""}];return i=isArray(e.replace)?e.replace:[],isString(n)&&i.push({from:n,to:void 0}),a=map(i,function(e){return e.from}),filter(o,function(e){return indexOf(a,e.from)===-1}).concat(i)}function h(){if(!o)throw new Error("Injectable functions cannot be called at configuration time");var e=o.invoke(r.$$fn);if(null!==e&&void 0!==e&&!g.type.is(e))throw new Error("Default value ("+e+") for parameter '"+g.id+"' is not an instance of Type ("+g.type.name+")");return e}function d(e){function t(e){return function(t){return t.from===e}}function r(e){var r=map(filter(g.replace,t(e)),function(e){return e.to});return r.length?r[0]:e}return e=r(e),isDefined(e)?g.type.$normalize(e):h()}function y(){return"{Param:"+e+" "+t+" squash: '"+$+"' optional: "+m+"}"}var g=this;r=a(r),t=u(r,t,i);var v=s();t=v?t.$asArray(v,"search"===i):t,"string"!==t.name||v||"path"!==i||void 0!==r.value||(r.value="");var m=void 0!==r.value,$=p(r,m),w=l(r,v,m,$);extend(this,{id:e,type:t,location:i,array:v,squash:$,replace:w,isOptional:m,value:d,dynamic:void 0,config:r,toString:y})},a.prototype={$$new:function(){return inherit(this,extend(new a,{$$parent:this}))},$$keys:function(){for(var e=[],t=[],r=this,n=objectKeys(a.prototype);r;)t.push(r),r=r.$$parent;return t.reverse(),forEach(t,function(t){forEach(objectKeys(t),function(t){indexOf(e,t)===-1&&indexOf(n,t)===-1&&e.push(t)})}),e},$$values:function(e){var t={},r=this;return forEach(r.$$keys(),function(n){t[n]=r[n].value(e&&e[n])}),t},$$equals:function(e,t){var r=!0,n=this;return forEach(n.$$keys(),function(i){var a=e&&e[i],o=t&&t[i];n[i].type.equals(a,o)||(r=!1)}),r},$$validates:function(e){var t,r,n,i,a,o=this.$$keys();for(t=0;t<o.length&&(r=this[o[t]],n=e[o[t]],void 0!==n&&null!==n||!r.isOptional);t++){if(i=r.type.$normalize(n),!r.type.is(i))return!1;if(a=r.type.encode(i),angular.isString(a)&&!r.type.pattern.exec(a))return!1}return!0},$$parent:void 0},this.ParamSet=a}var $$UMFP;UrlMatcher.prototype.concat=function(e,t){var r={caseInsensitive:$$UMFP.caseInsensitive(),strict:$$UMFP.strictMode(),squash:$$UMFP.defaultSquashPolicy()};return new UrlMatcher(this.sourcePath+e+this.sourceSearch,extend(r,t),this)},UrlMatcher.prototype.toString=function(){return this.source},UrlMatcher.prototype.exec=function(e,t){function r(e){function t(e){return e.split("").reverse().join("")}function r(e){return e.replace(/\\-/g,"-")}var n=t(e).split(/-(?!\\)/),i=map(n,t);return map(i,r).reverse()}var n=this.regexp.exec(e);if(!n)return null;t=t||{};var i,a,o,u=this.parameters(),s=u.length,c=this.segments.length-1,f={};if(c!==n.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");var p,l;for(i=0;i<c;i++){for(o=u[i],p=this.params[o],l=n[i+1],a=0;a<p.replace.length;a++)p.replace[a].from===l&&(l=p.replace[a].to);l&&p.array===!0&&(l=r(l)),isDefined(l)&&(l=p.type.decode(l)),f[o]=p.value(l)}for(;i<s;i++){for(o=u[i],f[o]=this.params[o].value(t[o]),p=this.params[o],l=t[o],a=0;a<p.replace.length;a++)p.replace[a].from===l&&(l=p.replace[a].to);isDefined(l)&&(l=p.type.decode(l)),f[o]=p.value(l)}return f},UrlMatcher.prototype.parameters=function(e){return isDefined(e)?this.params[e]||null:this.$$paramNames},UrlMatcher.prototype.validates=function(e){return this.params.$$validates(e)},UrlMatcher.prototype.format=function(e){function t(e){return encodeURIComponent(e).replace(/-/g,function(e){return"%5C%"+e.charCodeAt(0).toString(16).toUpperCase()})}e=e||{};var r=this.segments,n=this.parameters(),i=this.params;if(!this.validates(e))return null;var a,o=!1,u=r.length-1,s=n.length,c=r[0];for(a=0;a<s;a++){var f=a<u,p=n[a],l=i[p],h=l.value(e[p]),d=l.isOptional&&l.type.equals(l.value(),h),y=!!d&&l.squash,g=l.type.encode(h);if(f){var v=r[a+1],m=a+1===u;if(y===!1)null!=g&&(c+=isArray(g)?map(g,t).join("-"):encodeURIComponent(g)),c+=v;else if(y===!0){var $=c.match(/\/$/)?/\/?(.*)/:/(.*)/;c+=v.match($)[1]}else isString(y)&&(c+=y+v);m&&l.squash===!0&&"/"===c.slice(-1)&&(c=c.slice(0,-1))}else{if(null==g||d&&y!==!1)continue;if(isArray(g)||(g=[g]),0===g.length)continue;g=map(g,encodeURIComponent).join("&"+p+"="),c+=(o?"&":"?")+(p+"="+g),o=!0}}return c},Type.prototype.is=function(e,t){return!0},Type.prototype.encode=function(e,t){return e},Type.prototype.decode=function(e,t){return e},Type.prototype.equals=function(e,t){return e==t},Type.prototype.$subPattern=function(){var e=this.pattern.toString();return e.substr(1,e.length-2)},Type.prototype.pattern=/.*/,Type.prototype.toString=function(){return"{Type:"+this.name+"}"},Type.prototype.$normalize=function(e){return this.is(e)?e:this.decode(e)},Type.prototype.$asArray=function(e,t){function r(e,t){function r(e,t){return function(){return e[t].apply(e,arguments)}}function n(e){return isArray(e)?e:isDefined(e)?[e]:[]}function i(e){switch(e.length){case 0:return;case 1:return"auto"===t?e[0]:e;default:return e}}function a(e){return!e}function o(e,t){return function(r){if(isArray(r)&&0===r.length)return r;r=n(r);var o=map(r,e);return t===!0?0===filter(o,a).length:i(o)}}function u(e){return function(t,r){var i=n(t),a=n(r);if(i.length!==a.length)return!1;for(var o=0;o<i.length;o++)if(!e(i[o],a[o]))return!1;return!0}}this.encode=o(r(e,"encode")),this.decode=o(r(e,"decode")),this.is=o(r(e,"is"),!0),this.equals=u(r(e,"equals")),this.pattern=e.pattern,this.$normalize=o(r(e,"$normalize")),this.name=e.name,this.$arrayMode=t}if(!e)return this;if("auto"===e&&!t)throw new Error("'auto' array mode is for query parameters only");return new r(this,e)},angular.module("ui.router.util").provider("$urlMatcherFactory",$UrlMatcherFactory),angular.module("ui.router.util").run(["$urlMatcherFactory",function(e){}]);