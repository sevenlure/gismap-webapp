import fetch from './fetch'

const SLUG_DEPARTURE = '/departure'
export function getListDepartureAll(query) {
  return fetch.get(`${SLUG_DEPARTURE}/getAll`, {
    params: {
      ...query
    }
  })
}

const SLUG_PROMOTION = '/promotion'
export function getListPromotionAll(query) {
  return fetch.get(`${SLUG_PROMOTION}/getAll`, {
    params: {
      ...query
    }
  })
}

const SLUG_OTHER = '/other'
export function getLisTypeSeat(query) {
  return fetch.get(`${SLUG_OTHER}/typeSeat`, {
    params: {
      ...query
    }
  })
}

export function getListTimeSlot(query) {
  return fetch.get(`${SLUG_OTHER}/timeSlot`, {
    params: {
      ...query
    }
  })
}

export default {
  getListDepartureAll,
  getLisTypeSeat,
  getListTimeSlot,
  getListPromotionAll
}
