import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { get as _get, map as _map, find as _find } from 'lodash-es'
import windowSize from 'react-window-size'
import { connect } from 'react-redux'
import { Spin, Select } from 'antd'
// import { replaceVietnameseStr } from 'utils/string'
// import userApi from 'src/api/userApi.js'
// import { getInfoErrorfetch } from 'src/constant/funcAixos.js'

const { Option } = Select

const SelectUserWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;

  .Select-frefix {
    position: absolute;
    z-index: 2;
    transform: translate(25%, 35%);
  }
`
@connect(state => ({
  listUser: _get(state, 'GeneralStore.danhMuc.listUser', []),
  danhMucIsLoaded: _get(state, 'GeneralStore.danhMucIsLoaded', false)
}))
@windowSize
export default class SelectDepartment extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    windowWidth: PropTypes.number,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    listUser: PropTypes.array,
    danhMucIsLoaded: PropTypes.bool,
    size: PropTypes.string
  }

  state = {
    data: [],
    isLoading: true
  }

  componentDidUpdate = () => {
    if (this.props.danhMucIsLoaded && this.state.isLoading) {
      this.setState({
        data: _get(this.props, 'listUser', []),
        isLoading: false
      })
    }
  }

  getValue = () => {
    const result = _find(this.state.data, item => {
      return item._id === this.props.value
    })

    if (result) {
      return result._id
    }
  }

  render() {
    // const { listUser } = this.props
    // console.log('listUser', listUser)
    return (
      <SelectUserWrapper windowWidth={this.props.windowWidth}>
        <Spin spinning={this.state.isLoading}>
          <Select
            className='custom-select'
            showArrow={false}
            value={this.getValue()}
            placeholder={this.props.placeholder}
            showSearch
            style={{ width: '100%', fontFamily: 'myFont-Light' }}
            size={this.props.size ? this.props.size : 'large'}
            onChange={this.props.onChange}
          >
            {_map(this.state.data, item => {
              return (
                <Option key={item._id} value={item._id}>
                  {item.FullName}
                </Option>
              )
            })}
          </Select>
        </Spin>
      </SelectUserWrapper>
    )
  }
}
