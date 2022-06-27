/**
 * Created by Chip Bom on 12/30/2016.
 */

function validateUsername(elementParam) {
	let target = $(elementParam);
	let text = target.val();
	let parentClass = target.closest("div");
	if (text == null || text == "") {
		parentClass.addClass("has-error");
		return false;
	}
	else {
		parentClass.removeClass("has-error");
		return true;
	}
}

function validateUrl(element) {
	let regUrl = /^https?:\/\/[\w-]+\.\w+(.\w+.\w{0,7})?\/$/g;
	let target = $(element);
	let text = target.val();
	let parentClass = target.closest("div");
	if (!regUrl.test(text)) {
		parentClass.addClass("has-error");
		return false;
	}
	else {
		parentClass.removeClass("has-error");
		return true;
	}
}

function validatePassLength(element) {
	let target = $(element);
	let text = target.val();
	let parentClass = target.closest("div");
	if (text.length < 6) {
		parentClass.addClass("has-error");
		return false;
	}
	else {
		parentClass.removeClass("has-error");
		return true;
	}
}


function validateReEnterPassword(pass, re_enter_pass) {
	let passElement = $(pass);
	let rePass = $(re_enter_pass);
	let parentClass = rePass.closest("div");
	if (passElement.val() != rePass.val()) {
		let $temp = $("<p>Xác nhận mật khẩu không chính xác</p>");
		$temp.addClass('.error-Password');
		parentClass.addClass("has-error");
		parentClass.append($temp);
		setTimeout(function () {
			$temp.remove();
		}, 2000);
		return false;
	}
	else {
		parentClass.removeClass("has-error");
		return true;
	}
}

function validateErr(data, next) {
	if (data.status == 403) {
		alert("vui lòng đăng nhập lại");
		eraseCookie('userInfo');
		eraseCookie('token');
		location.href = "/";
	}
	if (data.status == 498) {
		alert("vui lòng đăng nhập lại");
		//Thực hiện xoá cookie
		eraseCookie('userInfo');
		eraseCookie('token');
		location.href = "/";
	}
	next();
}