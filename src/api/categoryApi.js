import fetch from './fetch'

const SLUG_DEPARTURE = '/departure'
export function getListDepartureAll(query) {
  return fetch.get(`${SLUG_DEPARTURE}/getAll`, {
    params: {
      ...query
    }
  })
}

export default {
  getListDepartureAll
}
