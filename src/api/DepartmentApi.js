import fetch from './fetch'

const SLUG_DEPARTMENT = '/department'
export function getAll() {
  return fetch.get(`${SLUG_DEPARTMENT}/getAll`, {
    params: {}
  })
}

export function updateDepartmentById(key, { Name, HeadPerson, Order }) {
  return fetch.put(`${SLUG_DEPARTMENT}/${key}`, { Name, HeadPerson, Order })
}

export function createDepartmentSale({ Name, Order, HeadPerson }) {
  return fetch.post(`${SLUG_DEPARTMENT}/sale`, { Name, Order, HeadPerson })
}

export function DeleteDepartment(key) {
  return fetch.delete(`${SLUG_DEPARTMENT}/${key}`)
}

export default {
  getAll,
  updateDepartmentById,
  createDepartmentSale,
  DeleteDepartment
}
