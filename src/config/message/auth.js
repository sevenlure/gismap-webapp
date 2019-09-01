const loginFail = 'Thông tin đăng nhập không chính xác'

const register = {
  fullname: 'Thông tin chưa hợp lệ.',

  comparePassword: 'Mật khẩu xác nhận chưa giống mật khẩu.',
  passwordRequired: 'Vui lòng nhâp mật khẩu.',
  passwordMin: 'Độ dài tối thiểu 8 ký tự',
  passwordMax: 'Độ dài tối đa 32 ký tự',
  passwordConfirmRequied: 'Vui lòng nhập mật khẩu xác nhận.',

  phoneRequired: 'Vui lòng nhập số điện thoại.',
  phoneOnlyNumber: 'Chỉ đuợc nhập số.',
  phoneLen: 'Số điện thoại độ dài từ 10 đến 13 số.',
  phoneExist: 'Số điện thoại đã được đăng ký',

  emailRequired: 'Email là thông tin bắt buộc.',
  emailValid: 'Chưa đúng định dạng email.',

  addressLen: 'Địa chỉ có độ dài từ 10 đến 200.'
}
export default {
  loginFail,
  register
}
