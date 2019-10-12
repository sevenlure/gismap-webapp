import fetch from 'src/api/fetch'
import { message } from 'antd'
import { get as _get } from 'lodash-es'

export function setAuthorizationforHeader(token) {
  fetch.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function getInfoErrorfetch(response) {
  if (!response) {
    return
  }
  console.log('catch', response)
  const { status, data } = response
  switch (status) {
    case 401: {
      message.error(_get(data, 'messageDisplay', 'something wrong'))
      break
    }
    case 409: {
      console.log('Error', data)
      break
    }
    default: {
      break
    }
  }
}
