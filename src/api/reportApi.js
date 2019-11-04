import fetch from './fetch'

const SLUG = '/revenue'

export function getListWithDepartment({ year, week }) {
  return fetch.get(`${SLUG}/object-category/year/${year}/week/${week}?type=DEPARTMENT`)
}

export function getListSaleTop() {
  return fetch.get(`${SLUG}/object-category/top`)
}

export function getListByYearWeek({ year, week, ...querySearch }) {
  return fetch.get(`${SLUG}/year/${year}/week/${week}`, {
    params: {
      ...querySearch
    }
  })
}

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
  getListWithDepartment,
  getListSaleTop,
  getListByYearWeek,
  getList,
  getAll,
  create,
  getById,
  updateById,
  deleteById
}
