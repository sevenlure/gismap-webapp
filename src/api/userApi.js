import fetch from './fetch'

const SLUG = '/user'

export function getList({ page, pageSize, ...querySearch }) {
  return fetch.get(`${SLUG}`, {
    params: {
      page,
      pageSize,
      ...querySearch
    }
  })
}

export function getById(_id) {
  return fetch.get(`${SLUG}/${_id}`)
}

export function create(payload) {
  return fetch.post(`${SLUG}`, payload)
}

export function updateById(_id, payload) {
  return fetch.put(`${SLUG}/${_id}`, payload)
}

export function deleteById(_id) {
  return fetch.delete(`${SLUG}/${_id}`)
}

export function postChangePassword(OldPassword, NewPassword) {
  const payload = {
    OldPassword,
    NewPassword
  }
  return fetch.post(`${SLUG}/ChangePassword`, payload)
}

export default {
  getList,
  create,
  getById,
  updateById,
  deleteById,
  postChangePassword
}
