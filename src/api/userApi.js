import fetch from './fetch'

const SLUG = '/user'

export function getList({ page = 1, pageSize = 200, ...querySearch }) {
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
export function changePassWord(_id, data) {
  return fetch.patch(`${SLUG}/change-password/${_id}`, data)
}

export default {
  changePassWord,
  getList,
  getAll,
  create,
  getById,
  updateById,
  deleteById
}
