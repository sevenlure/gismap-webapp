import fetch from './fetch'

const SLUG = '/coso'

export function getList({ page, pageSize }) {
  return fetch.get(`${SLUG}`, {
    params: {
      page,
      pageSize
    }
  })
}

export default {
  getList
}
