import fetch from './fetch'

const SLUG = '/auth'
const SLUG_ME = '/me'
export function login(data) {
  // console.log(data, 'data')
  return fetch.post(SLUG, {
    ...data
  })
}

export function changePassWord(data) {
  return fetch.patch(`${SLUG_ME}/change-password`, data)
}

export default {
  changePassWord,
  login
}
