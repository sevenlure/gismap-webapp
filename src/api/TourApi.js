import fetch from './fetch'

const SLUG = '/tours'
export function getListTour(query) {
  return fetch.get(`${SLUG}`, {
    params: {
      ...query
    }
  })
}

export default {
  getListTour
}
