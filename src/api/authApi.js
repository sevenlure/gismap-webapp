import fetch from './fetch'

const SLUG = '/auth'

export function login(data) {
  // console.log(data, 'data')
  return fetch.post(SLUG, {
    ...data
  })
}
export function authFotgotPassword({ phone, otp }) {
  // console.log(data, 'data')
  return fetch.post(`${SLUG}/forgot-password`, {
    phone,
    otp
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

export function UpdateUserInfo({ email, name, phone, address }, token) {
  // console.log(data, 'data')
  return fetch.post(
    `${SLUG}/updateInfo`,
    {
      email,
      name,
      phone,
      address
    },
    {
      headers: { token: token }
    }
  )
}

export function UpdatePasswordUserWithToken({ oldPassword, newPassword }, token) {
  // console.log(data, 'data')
  return fetch.post(
    `${SLUG}/change-password-by-token`,
    {
      oldPassword,
      newPassword
    },
    {
      headers: { token: token }
    }
  )
}
export default {
  login,
  changePassword,
  registerUser,
  UpdateUserInfo,
  UpdatePasswordUserWithToken
}
