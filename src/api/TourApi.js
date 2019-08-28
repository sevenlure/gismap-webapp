import fetch from './fetch'

const SLUG = '/tour'
export function getListTour(query) {
  return fetch.get(`${SLUG}/popular`, {
    params: {
      ...query
    }
  })
}

export default {
  getListTour
}
