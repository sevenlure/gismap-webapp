import { message, Modal } from 'antd'

export default error => {
  const { data } = error.response
  const title = 'Validation'
  switch (data.code || data.name) {
    case 'ValidationError': {
      Modal.error({
        title: title,
        content: 'Dữ liệu có sai xót!!!',
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
