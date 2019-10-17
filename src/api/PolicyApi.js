import fetch from './fetch'

const SLUG_GROUP_POLICY = '/policyInfoGroup'

const SLUG_INFO_POLICY = '/policyInfo'
export function getAll() {
  return fetch.get(`${SLUG_GROUP_POLICY}/getAll`, {
    params: {}
  })
}

export function updateGroupPolicyById(key, { Name, Order, IsShow }) {
  return fetch.put(`${SLUG_GROUP_POLICY}/${key}`, { Name, Order, IsShow })
}

export function updateInfoPolicyById(key, { Name, Description, LinkFile, PolicyInfoGroup }) {
  return fetch.put(`${SLUG_INFO_POLICY}/${key}`, { Name, Description, LinkFile, PolicyInfoGroup })
}

export function createInfoPolicy({ Name, Description, LinkFile, PolicyInfoGroup }) {
  return fetch.post(`${SLUG_INFO_POLICY}`, { Name, Description, LinkFile, PolicyInfoGroup })
}

export function deleteInfoPolicy(key) {
  return fetch.delete(`${SLUG_INFO_POLICY}/${key}`)
}

export default {
  getAll,
  updateGroupPolicyById,
  updateInfoPolicyById,
  createInfoPolicy,
  deleteInfoPolicy
}
