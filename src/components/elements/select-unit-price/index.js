import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { map as _map, find as _find } from 'lodash-es'
import { Spin, Select } from 'antd'
// import { replaceVietnameseStr } from 'utils/string'
// import userApi from 'src/api/userApi.js'
// import { getInfoErrorfetch } from 'src/constant/funcAixos.js'

const { Option } = Select

const SelectUnitPriceWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;

  .Select-frefix {
    position: absolute;
    z-index: 2;
    transform: translate(25%, 35%);
  }
`

const DataStatus = [
  {
    key: 'TY',
    Name: 'Tỷ'
  },
  {
    key: 'TRIEU',
    Name: 'Triệu'
  }
]
export default class SelectUnitPrice extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool
  }

  state = {
    data: [],
    isLoading: true
  }

  componentDidMount = async () => {
    this.setState({
      data: DataStatus,
      isLoading: false
    })
  }

  getValue = () => {
    const result = _find(this.state.data, item => {
      return item.key === this.props.value
    })
    if (result) {
      return result.key
    } else {
      return ''
    }
  }

  render() {
    // console.log(this.props.value, "---values----")
    return (
      <SelectUnitPriceWrapper>
        <Spin spinning={this.state.isLoading}>
          <Select
            disabled={this.props.disabled}
            className='custom-select'
            showArrow={false}
            value={this.getValue()}
            placeholder={this.props.placeholder}
            showSearch
            style={{ width: '100%', fontFamily: 'myFont-Light' }}
            size='large'
            onChange={this.props.onChange}
          >
            {_map(this.state.data, item => {
              return (
                <Option key={item.key} value={item.key}>
                  {item.Name}
                </Option>
              )
            })}
          </Select>
        </Spin>
      </SelectUnitPriceWrapper>
    )
  }
}
