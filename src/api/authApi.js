import fetch from './fetch'

const SLUG = '/auth'
function login(data) {
  console.log(data, 'data')
  return fetch.post(SLUG, {
    ...data
  })
}

export default {
  login
}
