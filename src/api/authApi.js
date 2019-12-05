import fetch from './fetch'

const SLUG = '/auth'
const SLUG_ME = '/me'
// export function login(data) {
//   // console.log(data, 'data')
//   return fetch.post(SLUG, {
//     ...data
//   })
// }

export function login(data) {
  return new Promise(function(resolve, reject) {
    const { Email, Password } = data
    if (Email === 'superadmin@gis.com' && Password === '123456789') {
      resolve({
        data: {
          FirstName: 'Thảo',
          LastName: 'Mai',
          token: 'JWT TOKEN'
        }
      })
    } else {
      reject(new Error('authen fail!'))
    }
  })

  // console.log(data, 'data')
  // return fetch.post(SLUG, {
  //   ...data
  // })
}

export function changePassWord(data) {
  return fetch.patch(`${SLUG_ME}/change-password`, data)
}

export default {
  changePassWord,
  login
}
