import fetch from './fetch'
import { mapKeys } from 'lodash-es'

const SLUG = '/attachment'

export function uploadAttachment(keyUpload, file, otherField) {
  var formData = new FormData()
  formData.append('attachment', file)
  mapKeys(otherField, function(value, key) {
    formData.append(key, value)
  })

  return fetch.post(`${SLUG}/${keyUpload}`, formData)
}
