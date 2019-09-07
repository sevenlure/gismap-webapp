import fetch from './fetch'

const SLUG = '/tour'
export function getListTour(query) {
  return fetch.get(`${SLUG}/popular`, {
    params: {
      ...query
    }
  })
}

export function getListTourSearch({
  from,
  to,
  // date,
  // timeSlot,
  typeSeat,
  pageSize = 30
}) {
  return fetch.get(`${SLUG}/query`, {
    params: {
      from,
      to,
      // date,
      // timeSlot,
      typeSeat,
      pageSize
    }
  })
}

export default {
  getListTour,
  getListTourSearch
}
