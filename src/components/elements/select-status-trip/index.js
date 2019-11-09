import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { map as _map } from 'lodash-es'
import windowSize from 'react-window-size'
import { Spin, Select } from 'antd'
// import { replaceVietnameseStr } from 'utils/string'
// import userApi from 'src/api/userApi.js'
// import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { STATUS } from 'src/constant/dataDM.js'

const { Option } = Select

const SelectStatusWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;

  .Select-frefix {
    position: absolute;
    z-index: 2;
    transform: translate(25%, 35%);
  }
`

@windowSize
export default class SelectStatus extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    windowWidth: PropTypes.number,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.string
  }

  state = {
    data: [],
    isLoading: true
  }

  componentDidMount = async () => {
    this.setState({
      data: STATUS,
      isLoading: false
    })
  }

  // getValue = () => {
  //   const result = _find(this.state.data, item => {
  //     return item.key === this.props.value
  //   })
  //   if (result) {
  //     return result.key
  //   }
  // }

  render() {
    return (
      <SelectStatusWrapper windowWidth={this.props.windowWidth}>
        <Spin spinning={this.state.isLoading}>
          <Select
            mode='multiple'
            allowClear={true}
            disabled={this.props.disabled}
            className='custom-select'
            showArrow={false}
            // value={this.getValue()}
            placeholder={this.props.placeholder}
            showSearch
            style={{ width: '100%', fontFamily: 'myFont-Light' }}
            size={this.props.size ? this.props.size : 'large'}
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
      </SelectStatusWrapper>
    )
  }
}
