import fetch from './fetch'
const SLUG = '/attachment'

function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
    })
  } else {
    const value = data == null ? '' : data

    formData.append(parentKey, value)
  }
}

export function uploadAttachment(keyUpload, file, otherField) {
  var formData = new FormData()
  formData.append('attachment', file)
  buildFormData(formData, otherField)

  return fetch.post(`${SLUG}/${keyUpload}`, formData)
}
