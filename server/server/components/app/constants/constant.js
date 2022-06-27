/**
 * Created by NguyenManh on 8/5/2016.
 * */
'use strict';

module.exports = Object.freeze({
	const_key: "fbaa80cbd1b313a80c5d8d8976d40922",
	error: {
		server_not_running: "Máy chủ trung gian đang có lỗi! Vui lòng thử lại trong giây lát!",
		expired_authenticate: 'Thời gian xác thực hết hạn. Vui lòng đăng nhập lại!',
		not_provide_token: 'Xác thực thất bại! Không cung cấp mã token!',
		token_fake_hacker: 'Xác thực thất bại! Người dùng đang cố truy cập trái phép!',
		login_system: 'Vui lòng đăng nhập hệ thống!',
		password_invalid: 'Mật khẩu cũ nhập không chính xác !',
		update_account_error: 'Cập nhật thông tin thất bại! Vui lòng kiểm tra lại các thông tin đầu vào!',
		authenticate_fail: 'Xác thực người dùng thất bại! Vui lòng thử lại!',
		register_account_fail: 'Đăng ký tài khoản thất bại. Vui lòng kiểm tra lại dữ liệu đầu vào!',
		delete_album_fail: 'Xóa album ảnh thất bại! Lỗi máy chủ trung gian!',
		delete_image_fail: 'Xóa ảnh thất bại! Lỗi máy chủ trung gian!',
		not_access_admin: 'Không có quyền truy cập chức năng này!',
		not_exist_account: 'Không tồn tại tài khoản này! Vui lòng kiểm tra lại!',
		user_active_error: 'Lỗi hệ thống tự động kích hoạt! Vui lòng liên hệ Adfast để kích hoạt sớm nhất!',
		system_forgot_error: 'Lỗi hệ thống tự động kích hoạt! Vui lòng liên hệ bộ phận support AdFast để được hỗ trợ!',
		plan_is_empty: 'Hiện tại bạn chưa có bảng giá chi tiết nào! Vui lòng thêm chi tiết bảng giá vào hệ thống!'
	},
	success: {
		update_password_success: 'Cập nhật mật khẩu thành công !',
		update_account_success: 'Cập nhật thông tin tài khoản thành công!',
		update_budget_success: 'Cập nhật giá trị tài khoản thành công!',
		delete_album_success: 'Xóa album thành công!',
		delete_image_success: 'Xóa ảnh thành công!',
		user_active_success: 'Kích hoạt tài khoản thành công! Vui lòng đăng nhập lại để hệ thống làm việc chính xác!',
		user_reset_pass_success: 'Reset mật khẩu thành công. Vui lòng kiểm tra email để nhận mật khẩu mới!',
		send_email_success: 'Đăng ký tài khoản thành công. Vui lòng kiểm tra hộp thư đên trong email đăng ký để kích' +
		' hoạt tài khoản, (bạn có thể kiểm tra thêm trong hòm thư Spam nếu không thấy email kích hoạt)!',
		active_user_success: 'Kích hoạt tài khoản thành công!',
		deactive_user_success: 'Hủy kích hoạt tài khoản thành công!',
		update_plan_success: 'Cập nhật thông tin bảng giá thành công!',
		delete_failure_success: 'Xóa thành công!'
	},
	warning: {
		password_length_invalid: 'Password phải có độ dài từ 6 ký tự!',
		email_invalid: 'Email không hợp lệ!',
		disconnected_db: 'Mất kết nối database!',
		invalid_param: 'Tham số thiếu hoặc không hợp lệ!',
		email_duplicate: 'Email này đã có người đăng ký!',
		email_not_exist: 'Email này không tồn tại trong hệ thống! Vui lòng kiểm tra lại!',
		password_incorrect: 'Mật khẩu nhập không chính xác!',
		not_create_user: 'Vui lòng đăng xuất để thực hiện tác vụ này!',
		user_lock_basic: 'Tài khoản này hiện đang bị khóa vì 1 lý do nào đó! Vui lòng liên hệ AdFast để kích hoạt lại!',
		user_lock_one_minutes: 'Tài khoản hiện đang bị khóa trong 1 phút. Vui lòng thử lại sau 1 phút hoặc liên hệ' +
		' AdFast để kích hoạt lại tài khoản trong thời gian sớm nhất',
		user_lock_remain_time: 'Tài khoản hiện đang bị khóa trong {0} phút. Vui lòng thử lại sau {1} phút hoặc' +
		' liên hệ AdFast để kích hoạt lại tài khoản trong thời gian sớm nhất',
		user_lock_exceeds_limit: 'Đăng nhập quá số lần cho phép, tài khoản của bạn bị khóa trong thời gian 30 phút! Vui' +
		' lòng liên hệ AdFast để kích hoạt lại tài khoản sớm nhất!',
		user_not_active: 'Tài khoản chưa được kích hoạt, Vui lòng kiểm tra mail đăng ký để kích hoạt hoặc liên hệ AdFast' +
		' để kích hoạt tài khoản sớm nhất!',
		url_invalid: 'Url không hợp lệ!'
	},
	transaction: {
		warning: {
			system_is_empty: 'Hệ thống hiện tại chưa có thông tin giao dịch nào!',
			is_empty: 'Hiện tại bạn chưa có thông tin giao dịch nào!',
			search_transaction_empty: 'Không tìm thấy giao dịch nào trong khoảng thời gian này!'
		}
	},
	package: {
		warning: {
			package_not_create: 'Gói cho người dùng này đã được tạo! Vui lòng chuyển sang chế độ cập nhật để thay đổi!',
			account_register_not_exist: 'Tài khoản bạn đăng ký không tồn tại trong hệ thống! Vui lòng kiểm tra lại!',
			plan_choice_not_exist: 'Gói bạn lựa chọn không tồn tại trong hệ thống'
		},
		error: {
			system_not_found_package: 'Hệ thống hiện chưa có gói đăng ký nào! Admin vui lòng kiểm tra lại!',
			user_not_register_package: 'Bạn hiện chưa đăng ký sử dụng gói dịch vụ nào! Vui lòng liên hệ bộ phận hỗ trợ ' +
			'để mua gói dịch vụ!',
			not_find_package: 'Không tìm thấy gói sử dụng cho tài khoản này!'
		},
		success: {
			register_plan_success: `Đăng ký mua gói {0} thành công!`,
			update_package_success: 'Cập nhật gói tài khoản thành công!'
		}
	},
	site: {
		warning: {
			site_url_has_register: 'Tên site hoặc url site lựa chọn của bạn đã có người đăng ký! Vui lòng kiểm tra lại!',
			user_not_register_site: 'Bạn chưa đăng ký site nhận diện nào trong hệ thống! Vui lòng tạo 1 site nhận diện mới!',
			system_not_register_site: 'Hệ thống chưa có site nào đăng ký!',
			not_exist_site_system: 'Không tồn tại site này trong hệ thống của bạn!',
		},
		error: {
			cannot_remove_site: 'Không thể xóa. Site này đã được sử dụng cho chiến dịch!',
			system_not_exist_site_active: 'Site kích hoạt không tồn tại trên hệ thống của bạn!',
			cannot_site_update: 'Không tìm thấy site để cập nhật!',
			max_phone_invalid: 'Số lượng phone lớn nhất phải lớn hơn lượng phone đã sử dụng!',
		},
		success: {
			remove_site_success: 'Xóa site thành công!',
			active_site_success: 'Kích hoạt site thành công!',
			deactive_site_success: 'Hủy kích hoạt site thành công!',
			update_subscribers_unlimited_success: 'Cập nhật giới hạn thuê bao thành công!'
		}
	},
	traffic: {
		warning: {
			cannot_find_traffic: 'Không tim thay lượng truy cập!',
			not_site_filter: 'Không tìm thấy site để lọc',
			not_found_traffic_from_this_site: 'Không tìm thấy lượng truy cập từ site này!',
			not_found_data_export: 'Khong tim thay du lieu xuất file!'
		}
	}
});