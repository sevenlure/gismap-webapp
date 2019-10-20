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

// export function getById(_id) {
//   return fetch.get(`${SLUG}/${_id}`)
// }

// export function create(payload) {
//   return fetch.post(`${SLUG}`, payload)
// }

// export function updateById(_id, payload) {
//   return fetch.put(`${SLUG}/${_id}`, payload)
// }

// export function deleteById(_id) {
//   return fetch.delete(`${SLUG}/${_id}`)
// }

export default {
  getList
  // create,
  // getById,
  // updateById,
  // deleteById
}
