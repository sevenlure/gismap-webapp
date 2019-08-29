import fetch from './fetch'

const SLUG = '/otp'

export function fotgotPassword(phone) {
  // console.log(data, 'data')
  return fetch.post(`${SLUG}/forgot-password`, {
    phone: phone
  })
}

export function register(phone) {
  // console.log(data, 'data')
  return fetch.post(`${SLUG}/register`, {
    phone: phone
  })
}

export default {
  fotgotPassword,
  register
}
