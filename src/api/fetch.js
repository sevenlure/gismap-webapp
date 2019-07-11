import axios from 'axios'
import {message, Alert} from 'antd'


//QLNY-API
const fetch = axios.create({
  baseURL: process.env.HOST_API,
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
  transformResponse: [function (data) {
    const dataJson = JSON.parse(data)
    if(dataJson.code){
      message.error( dataJson.message)
    }
    // Do whatever you want to transform the data

    return dataJson
  }],
});



export default fetch