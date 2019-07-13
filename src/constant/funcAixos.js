import fetch from 'src/api/fetch'

export function setAuthorizationforHeader(token) {
  fetch.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
