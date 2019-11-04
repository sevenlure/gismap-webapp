import fetch from './fetch'

const SLUG = '/workingTicket'

export function getList({ page = 1, pageSize = 100, ...querySearch }) {
  return fetch.get(`${SLUG}`, {
    params: {
      page,
      pageSize,
      ...querySearch
    }
  })
}

export default {
  getList
}
