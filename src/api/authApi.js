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
export default {
  login,
  changePassword
}
