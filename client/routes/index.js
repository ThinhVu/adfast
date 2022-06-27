let express = require('express');
let router = express.Router();
let path = require('path');
let request = require('request');

router.get('/demo', function (req, res) {
		if (process.env.NODE_ENV === "development")
			res.sendFile(path.join(__dirname, "../client/src/public/demo.html"));
		else res.sendFile(path.join(__dirname, "../client/public/public/demo.html"));
	}
);

router.get('/demo1', function (req, res) {
		if (process.env.NODE_ENV === "development")
			res.sendFile(path.join(__dirname, "../client/src/public/demo1.html"));
		else res.sendFile(path.join(__dirname, "../client/public/public/demo1.html"));
	}
);

router.get('/demo2', function (req, res) {
		if (process.env.NODE_ENV === "development")
			res.sendFile(path.join(__dirname, "../client/src/public/demo2.html"));
		else res.sendFile(path.join(__dirname, "../client/public/public/demo2.html"));
	}
);
// router.get('/', function (req, res) {
//     if (process.env.NODE_ENV === "development")
//       res.sendFile(path.join(__dirname, "../client/src/app/components/home/homeView.html"));
//     else res.sendFile(path.join(__dirname, "../client/src/app/components/home/homeView.html"));
//   }
// );
router.get('/active-account', function (req, res) {
	const options = {
		method: 'GET',
		url: 'http://api.adfast.tech:8585/api/user/email-active',
		qs: {
			t: req.query.t,
			k: req.query.k,
			chkdeauth: req.query.chkdeauth
		}
	};

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		else {
			if (response.statusCode == 404 || response.statusCode == 400) {
				res.render('public/activeAccountSuccess.html', {
					demo: 'time-out',
					title: 'Kích hoạt thất bại',
				});
			} else {
				res.render('public/activeAccountSuccess.html', {
					demo: 'ok',
					title: 'Kích hoạt thành công',
				});
			}
		}
	});
});
/* GET home page. */
router.get('/*', function (req, res, next) {
	if (process.env.NODE_ENV === "development") {
		res.sendFile(path.join(__dirname, "../client/src/index.view.html"));
	} else {
		res.sendFile(path.join(__dirname, "../client/public/index.view.html"));
	}
});
module.exports = router;

