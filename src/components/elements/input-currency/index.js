import React from 'react'
import { InputNumber, Input, Button } from 'antd'

const InputGroup = Input.Group

export default class InputCurrency extends React.Component {
  render() {
    return (
      <InputGroup style={{ display: 'flex' }} compact>
        <InputNumber
          suffix='RMB'
          formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/(,*)/g, '')}
          {...this.props}
        />
        <Button disabled>VND</Button>
      </InputGroup>
    )
  }
}
