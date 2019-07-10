import axios from 'axios'

const fetch = axios.create({
  baseURL: 'http://localhost:3005/',
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
  // transformResponse: [function (data) {
  //   // Do whatever you want to transform the data

  //   return JSON.parse(data)
  // }],
});

export default fetch