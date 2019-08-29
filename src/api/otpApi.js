import fetch from './fetch'

const SLUG = '/otp'

export function forgotPasswordSendOTP(phone) {
  return fetch.post(`${SLUG}/forgot-password`, {
    phone: phone
  })
}

export default {
  forgotPasswordSendOTP
}
