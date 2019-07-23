import { message, Modal } from 'antd'

export default error => {
  const { data } = error.response
  const title = 'Sai định dạng file'
  switch (data.code || data.name) {
    case 'UnsupportedMediaType': {
      Modal.error({
        title: title,
        content: data.message,
        onOk() {}
      })
      break
    }

    default: {
      const messErr = error.response.message || data.message
      message.error(messErr)
      break
    }
  }
}
