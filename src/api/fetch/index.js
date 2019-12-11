import axios from 'axios'
import { Modal } from 'antd'

const fetch = axios.create({
  baseURL: process.env.HOST_API,
  timeout: 30000
  // headers: {'X-Custom-Header': 'foobar'}
})

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
