import fetch from './fetch'

const SLUG = '/coso'

export function getList({ page, pageSize, ...querySearch }) {
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
