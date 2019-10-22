import fetch from './fetch'

const SLUG = '/general/org-structure'

export function getInfo() {
  return fetch.get(`${SLUG}`)
}

export function updateInfo(data) {
  return fetch.put(`${SLUG}`, data)
}

export default {
  getInfo,
  updateInfo
}
