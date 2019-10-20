import fetch from './fetch'

const SLUG_GROUP = '/group'

export function createGroup({ Name, Order, Department }) {
  return fetch.post(`${SLUG_GROUP}`, { Department, Name, Order })
}

export function updateGroup(key, { Department, Name, Order }) {
  return fetch.put(`${SLUG_GROUP}/${key}`, { Department, Name, Order })
}


export function DeleteGroup(key) {
  return fetch.delete(`${SLUG_GROUP}/${key}`)
}

export default {
  createGroup,
  updateGroup,
  DeleteGroup
}
