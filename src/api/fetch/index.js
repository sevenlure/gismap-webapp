import axios from 'axios'
import { Modal } from 'antd'
// import error_500 from './error_500'
// import error_415 from './error_415'
// import { userLogout } from 'src/redux/actions/authAction'

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
//     messageAnt.error(dataJson.message)
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
