import axios from 'axios'
import { Modal } from 'antd'

const fetch = axios.create({
  baseURL: process.env.HOST_API,
  timeout: 5000
  // headers: {'X-Custom-Header': 'foobar'}
})

// funct alert Mess
export const alertMess = opts => {
  if (window.isAlertModalErr) return
  window.isAlertModalErr = true
  Modal.error({
    ...opts,
    onOk: () => {
      if (opts.onOk) opts.onOk()
      window.isAlertModalErr = false
    }
  })
}

// Add a response interceptor
fetch.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)

export default fetch
