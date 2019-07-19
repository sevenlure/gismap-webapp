import axios from 'axios'
import { message, Modal } from 'antd'
import Router from 'next/router'
import slug from 'src/routes'
import error_500 from './error_500'
//QLNY-API
// const fetch = axios.create({
//   baseURL: process.env.HOST_API,
//   timeout: 1000,
//   // headers: {'X-Custom-Header': 'foobar'}
//   transformResponse: [
//     function(data) {
//       const dataJson = JSON.parse(data)
//       console.log(dataJson,"dataJson")
//       if (dataJson.code) {
// switch (dataJson.code) {
//   case 'Unauthorized': {
//     Modal.error({
//       title: 'Quyền hạn',
//       content: 'Hết phiên làm việc, Vui lòng đăng nhập lại!',
//       onOk() {
//         Router.push(slug.login)
//       }
//     })
//     break
//   }
//   default:
//     message.error(dataJson.message)
// }
//       }
//       // Do whatever you want to transform the data

//       return dataJson
//     }
//   ]
// })

const fetch = axios.create({
  baseURL: process.env.HOST_API,
  timeout: 5000
  // headers: {'X-Custom-Header': 'foobar'}
})

// Add a response interceptor
fetch.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    // NOTE https://github.com/axios/axios tai liệu tham khảo
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 401: {
          // MARK  hạn chế Modal Alert authen nhìu lần
          if (window.isAlertAuthen) break
          window.isAlertAuthen = true
          const title = 'Chứng thực'
          switch (data.code) {
            case 'InvalidCredentials': {
              Modal.error({
                title: title,
                content: 'Chữ ký không hợp lệ!!',
                onOk() {
                  window.isAlertAuthen = false
                  Router.replace(slug.login)
                }
              })
              break
            }
            case 'Unauthorized': {
              Modal.error({
                title: title,
                content: 'Hết phiên làm việc, Vui lòng đăng nhập lại',
                onOk() {
                  window.isAlertAuthen = false
                  Router.replace(slug.login)
                }
              })
              break
            }
            default: {
              message.error(error.response.message)
              break
            }
          }
          break
        }
        case 500: {
          error_500(error)
          break
        }
        default:
          message.error(error.response.message)
      }
    } else if (error.request) {
      Modal.error({
        title: 'Network',
        content: 'Vui lòng kiểm tra lại hệ thống mạng của máy và server'
      })
      // console.log(error.request)
    } else {
      message.error(error.response.message)
    }
    return Promise.reject(error)
  }
)

export default fetch