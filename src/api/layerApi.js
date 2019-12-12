import fetch from './fetch'

const SLUG = '/layer'

export function getList({ page = 1, pageSize = 200, ...querySearch }) {
  return fetch.get(`${SLUG}`, {
    params: {
      page,
      pageSize,
      ...querySearch
    }
  })
}
export function getAllHanhChinh() {
  return fetch.get(`${SLUG}/getAllHanhChinh`)
}

export default {
  getAllHanhChinh
}
