import fetch from 'src/api/fetch'
import { message, Modal } from 'antd'
import { get as _get } from 'lodash-es'

export function setAuthorizationforHeader(token) {
  // console.log(token, 'token')
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
    case 400: {
      Modal.error({
        title: 'Thất bại',
        content: _get(data, 'messageDisplay', 'something wrong')
      })
      break
    }
    case 503: {
      Modal.error({
        title: 'Thông báo server',
        content: 'Máy chủ quá “bận” hoặc trang web đang trong quá trình bảo trì'
      })
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
