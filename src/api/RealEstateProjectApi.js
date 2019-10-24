import fetch from './fetch'

const SLUG = '/projectBDS'

export function getList({ page = 1, pageSize = 100, ...querySearch }) {
  return fetch.get(`${SLUG}`, {
    params: {
      page,
      pageSize,
      ...querySearch
    }
  })
}
export function getAll() {
  return fetch.get(`${SLUG}/getAll`)
}

export function getById(_id) {
  return fetch.get(`${SLUG}/${_id}`)
}

export function create(data) {
  return fetch.post(`${SLUG}`, data)
}

export function updateById(_id, data) {
  return fetch.put(`${SLUG}/${_id}`, data)
}

export function deleteById(_id) {
  return fetch.delete(`${SLUG}/${_id}`)
}

export default {
  getList,
  getAll,
  create,
  getById,
  updateById,
  deleteById
}
