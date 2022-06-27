var ___ = {};
// contanst
___.Config = {
	StopReportInMilis: 60000,
	SuccessUrl: 'http://api.adfast.tech:8585/report/success',
	ErrorUrl: 'http://api.adfast.tech:8585/report/error',
	CookieKey: 'lastReport',
};
___.Libs = {
	MobileDetect: 'https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.3.5/mobile-detect.min.js',
	Base64: 'https://cdnjs.cloudflare.com/ajax/libs/Base64/1.0.0/base64.min.js',
	Ng: 'http://api.adfast.tech:8585/elpis.ng.js'
};
___.head = document.head || document.getElementsByTagName('head')[0];
___.isFunc = function (x) {
	return typeof(x) === 'function'
};
___.getCookie = function (key) {
	var name = key + '=';
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		while (cookie.charAt(0) == ' ') {
			cookie = cookie.substring(1);
		}
		if (cookie.indexOf(name) == 0) {
			return cookie.substring(name.length, cookie.length);
		}
	}
};
___.setCookie = function (key, value) {
	var date = new Date();
	date.setTime(date.getTime() + ___.Config.StopReportInMilis);
	var expires = "expires=" + date.toUTCString();
	document.cookie = key + "=" + value + ";" + expires + ";path=/";
};
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
___.newXhr = function (cf) {
	cf = cf || {};
	var xhr;
	if (typeof XMLHttpRequest !== 'undefined') {
		xhr = new XMLHttpRequest();
	} else {
		var versions = [
			"MSXML2.XmlHttp.5.0",
			"MSXML2.XmlHttp.4.0",
			"MSXML2.XmlHttp.3.0",
			"MSXML2.XmlHttp.2.0",
			"Microsoft.XmlHttp"
		];
		for (var i = 0, len = versions.length; i < len; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			}
			catch (e) {
			}
		}
	}
	function onTimeOut(e) {
		cf.error && cf.error(xhr);
	}

	function onReadyStateChange() {
		if (xhr.readyState < 4) return;
		if (xhr.status === 0 || 400 <= xhr.status) {
			cf.error && cf.error(xhr);
		} else {
			cf.success && cf.success(xhr.response, xhr.statusText, xhr);
		}
	}

	xhr.timeOut = cf.timeOut;
	xhr.withCredentials = cf.withCredentials;
	xhr.onreadystatechange = onReadyStateChange;
	xhr.ontimeout = onTimeOut;
	return xhr;
};
___.ajax = function (cf) {
	typeof cf.data !== 'string' && (cf.data = JSON.stringify(cf.data));
	var xhr = ___.newXhr(cf);
	xhr.open(cf.method, cf.url);
	// must call setRequestHeader() after open(), but before send(
	xhr.setRequestHeader("Content-Type", cf.contentType || 'text/plain;charset=UTF-8');
	xhr.send(cf.data);
};
___.jsonp = function (src, success, err) {
	var el = document.createElement("script");
	el.type = "text\/javascript";
	el.onerror = err;
	___.head.appendChild(el);
	switch (typeof success) {
		case null:
			el.src = src;
			break;
		case 'string':
			el.src = src + '=' + success;
			break;
		case 'function':
			var fName = '_' + new Date().getTime();
			window[fName] = success;
			el.src = src + '=' + fName;
			break;
		default:
			throw 'success is not null, string or function.'
			break;
	}
};
___.getLocation = function (invoke, after) {
	___.jsonp('https://geoip-db.com/json/geoip.php?jsonp', function (recv) {
		___.Location = recv;
	});
	setTimeout(invoke, after);
};
___.ASCII = {
	_map: {
		a: 'àáảãạăằắẳẵặâầấẩẫậ',
		e: 'èéẻẽẹêềếểễệ',
		i: 'ìíỉĩị',
		o: 'òóỏõọôồốổỗộơờớởỡợ',
		u: 'ùúủũụ',
		d: 'đ',
		A: 'ÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬ',
		E: 'ÈÉẺẼẸÊỀẾỂỄỆ',
		I: 'ÌÍỈĨỊ',
		O: 'ÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢ',
		U: 'UÙÚỦŨỤ',
		D: 'Đ'
	},
	nC: function (x) {
		for (var k in this._map)
			if (this._map[k].includes(x))
				return k;
		return x;
	},
	nS: function (x) {
		var r = '';
		for (var i = 0, l = x.length; i < l; ++i)
			r += this.nC(x[i]);
		return r;
	},
	nO: function (x) {
		for (var p in x)
			x[p] = this.nomalize(x[p]);
		return x;
	},
	dc: function (x) {
		var cx = {};
		for (var p in x) {
			switch (typeof x[p]) {
				case 'object' :
					cx[p] = this.dc(x[p]);
					break;
				default :
					cx[p] = x[p];
					break;
			}
		}
		return cx;
	},
	nomalize: function (x) {
		switch (typeof(x)) {
			case 'string' :
				return this.nS(x);
			case 'object' :
				return this.nO(this.dc(x));
			default :
				return x;
		}
	}
};
___.Script = {
	lastCode: -1,
	loads: function (cf) {
		var srcs = [];
		for (var _i = 0; _i < cf.srcs.length; ++_i) {
			cf.srcs[_i] && srcs.push(cf.srcs[_i]);
		}
		this.loadCount = 0;
		this.totalRequired = srcs.length;
		this.callback = cf.callback;
		for (var i = 0; i < srcs.length; i++) {
			this.writeScript(srcs[i]);
		}
	},
	loaded: function (evt) {
		this.loadCount++;
		if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
	},
	writeScript: function (src) {
		var self = this;
		var s = document.createElement('script');
		s.type = "text/javascript";
		s.async = true;
		s.src = src;
		s.addEventListener('load', function (e) {
			self.loaded(e);
		}, false);
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(s);
	}
};

___.MobileDetect = {
	os: function () {
		return 'Unknown'
	},
	mobile: function () {
		return 'Unknown'
	}
}

___.Msisdn = {
	detect: function () {
		console.log('unloaded');
	}
};

___.Report = {
	success: function (data) {
		var _s = this;
		_s.payload = {
			phone: data.phone || '',
			carrier: data.carrier || '',
			url: document.location.href || '',
			referrer: document.referrer || '',
			os: ___.MobileDetect.os(),
			mobile: ___.MobileDetect.mobile(),
			city: ''
		};
		var send = function () {
			try {
				var loc = ___.Location;
				loc && (_s.payload.city = loc.city);
				___.ASCII.nomalize(_s.payload);
				___.ajax({
					url: ___.Config.SuccessUrl,
					method: 'POST',
					data: JSON.stringify({r: btoa(JSON.stringify(_s.payload))}),
					success: function () {
						___.setCookie(___.Config.CookieKey, '*');
					}
				});
			} catch (ex) {
				___.Report.error({
					src: '___.Report.success.catch',
					msg: ex.message
				});
			}
		};
		___.getLocation(send, 5000);
	},
	error: function (data) {
		data.url = window.location.href;
		___.ajax({
			url: ___.Config.ErrorUrl,
			method: 'POST',
			data: JSON.stringify(data)
		});
	}
};

// backward compatity
var Elpis = {
	Runner: {
		start: function () {
			___.Script.loads({
				srcs: [___.Libs.MobileDetect, ___.isFunc(btoa) ? null : ___.Libs.Base64],
				callback: function () {
					try {
						MobileDetect && (___.MobileDetect = new MobileDetect(window.navigator.userAgent));
						if (___.MobileDetect.phone() && !___.getCookie(___.Config.CookieKey)) {
							___.Script.loads({
								srcs: [___.Libs.Ng],
								callback: function () {
									___.Msisdn.detect();
								}
							});
						}
					} catch (ex) {
						___.Report.error({src: '___.Runner.start', msg: ex.message});
					}
				}
			});
		}
	}
};