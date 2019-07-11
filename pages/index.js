import React from 'react'
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button
} from 'antd'
import ButtonElement from 'src/components/elements/button'
import Examples from 'src/components/elements/examples'
import { connect } from 'react-redux'
import { startClock, serverRenderClock } from 'src/redux/actions/timeAction'



const FormItem = Form.Item
const Option = Select.Option

@connect()
export default class Index extends React.Component{
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderClock(isServer))

    return {}
  }

  componentDidMount () {
    const { dispatch } = this.props
    this.timer = startClock(dispatch)
  }
  render(){
    return(
      <div style={{ marginTop: 100 }}>
      <div>
        <Examples/>
      </div>
    </div>
  )
  }
}

