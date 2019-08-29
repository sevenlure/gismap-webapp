import fetch from './fetch'

const SLUG = '/auth'

export function login(data) {
  // console.log(data, 'data')
  return fetch.post(SLUG, {
    ...data
  })
}

export function changePassword({ phone, secret, newPassword }) {
  // console.log(data, 'data')
  return fetch.post(`${SLUG}/change-password`, {
    phone,
    secret,
    newPassword
  })
}

export function registerUser({ email, name, phone, address, password, otp }) {
  // console.log(data, 'data')
  return fetch.post(`${SLUG}/register`, {
    email,
    name,
    phone,
    address,
    password,
    otp
  })
}
export default {
  login,
  changePassword,
  registerUser
}
