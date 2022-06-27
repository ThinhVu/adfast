/**
 * config send email
 * Create by: ManhNV
 */
'use strict';

import nodeMailer from 'nodemailer';
import sha512 from 'crypto-js/sha512';

import config from '../config/environment';
import constants from '../components/app/constants/constant';

export function sendEmailActiveUser(user) {
	return new Promise((resolve, reject) => {
		const timeStampNow = Math.floor(new Date().valueOf() / 1000);
		const keyPass = sha512(`${config.email.keyValidateSendMail}${timeStampNow}`).toString();
		const domainRequest = config.domain === "http://localhost:8585" ? config.domain : 'http://adfast.tech';
		const hrefParam = `${domainRequest}/active-account?t=${timeStampNow}` +
			`&k=${keyPass}&chkdeauth=f18932czz124567${user._id}1234x34678334`;
		const mailOptions = {
			from: `"WeMobile-CRM. 👥" <${config.email.smtpConfig.auth.user}>`, // sender address
			to: user.email, // list of receivers
			subject: 'Kích hoạt tài khoản ✔', // Subject line
			text: 'Xin chào đây là hòm thư tự động kích hoạt tài khoản 🐴', // plaintext body
			html: `<div>
						<h2>Đây là thư kích hoạt email tự động gửi từ hòm thư của WeMobile 🐴</h2>
						<p style="font-weight: bold;font-style: italic;">Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của chúng tôi, để 
						kích hoạt tài khoản bạn vui lòng kích vào đường link bên dưới
						 </p>
						 <a href="${hrefParam}">${hrefParam}</a>
						<p style="color: red;font-style: italic;">Chú ý: Email kích hoạt này có thời gian hợp lệ trong vòng 3 
						ngày!</p>
					</div>`

		};
		let transporter = nodeMailer.createTransport(config.email.smtpConfig);
		transporter.sendMail(mailOptions, function (error) {
			if (error) {
				reject({error: constants.error.user_active_error});
			} else {
				resolve(constants.success.send_email_success)
			}
		});
	})
}

export function sendEmailForgotPassword(newPassword, email) {
	return new Promise((resolve, reject) => {
		const mailOptions = {
			from: `"AddFast Phone Solution. 👥" <${config.email.smtpConfig.auth.user}>`, // sender address
			to: email, // list of receivers
			subject: 'Mật khẩu mới ✔', // Subject line
			text: 'Xin chào đây là hòm thư thay đổi mật khẩu 🐴', // plaintext body
			html: `<div>
				<h2>Hòm thư thay đổi mật khẩu tự động gửi từ AdFast 🐴</h2>
				<p style="font-weight: bold;font-style: italic;font-size: 20px;">Mật khẩu của bạn được thay đổi mới là: 
					<span style="color:red;font-size: 24px">${newPassword}</span>
				 </p>
				<p style="color: red;font-style: italic;">Chú ý: Bạn nên thay đổi lại mật khẩu mới ngay sau lần đăng nhập mới!
				</p>
			</div>`
		};
		let transporter = nodeMailer.createTransport(config.email.smtpConfig);
		transporter.sendMail(mailOptions, function (error) {
			if (error) reject({error: constants.error.system_forgot_error});
			resolve({message: constants.success.user_reset_pass_success});
		});
	})
}