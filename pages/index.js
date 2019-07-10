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
      <Form layout='horizontal'>
        <FormItem
          label='Input Number'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <InputNumber
            size='large'
            min={1}
            max={10}
            style={{ width: 100 }}
            defaultValue={3}
            name='inputNumber'
          />
          <a href='#'>Link</a>
        </FormItem>
  
        <FormItem label='Switch' labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <Switch defaultChecked name='switch' />
        </FormItem>
  
        <FormItem label='Slider' labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <Slider defaultValue={70} />
        </FormItem>
  
        <FormItem label='Select' labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <Select
            size='large'
            defaultValue='lucy'
            style={{ width: 192 }}
            name='select'
          >
            <Option value='jack'>jack</Option>
            <Option value='lucy'>lucy</Option>
            <Option value='disabled' disabled>
              disabled
            </Option>
            <Option value='yiminghe'>yiminghe</Option>
          </Select>
        </FormItem>
        <FormItem
          label='DatePicker'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <DatePicker name='startDate' />
        </FormItem>
        <FormItem style={{ marginTop: 48 }} wrapperCol={{ span: 8, offset: 8 }}>
          <Button size='large' type='primary' htmlType='submit'>
            OK
          </Button>
          <Button size='large' style={{ marginLeft: 8 }}>
            Cancel
          </Button>
          <ButtonElement name={process.env.customKey} size='large' type='primary' htmlType='submit'/>
        </FormItem>
      </Form>
      <div>
        <Examples/>
      </div>
    </div>
  )
  }
}

