import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Select, Spin } from 'antd'
import { get as _get, map as _map, pick as _pick } from 'lodash-es'
import { connect } from 'react-redux'

const { Option } = Select

const ElementWrapper = styled.div`
  flex: 1;
`

const PICK_LIST = ['_id', 'Name']

@connect(state => ({
  initialOptions: _get(state, 'GeneralStore.danhMuc.CoQuanCapPhep', []),
  danhMucIsLoaded: _get(state, 'GeneralStore.danhMucIsLoaded', false)
}))
class SelectCoQuanCapPhep extends React.PureComponent {
  static propTypes = {
    initialOptions: PropTypes.array,
    danhMucIsLoaded: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.any
  }

  state = {
    options: null,
    isLoaded: false,
    value: null
  }

  initialData = () => {
    const result = _map(this.props.initialOptions, item => {
      return {
        ..._pick(item, PICK_LIST)
      }
    })

    this.setState({
      options: result,
      isLoaded: true
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.state.value) this.setState({ value: nextProps.value })

    if (nextProps.danhMucIsLoaded) this.initialData()
  }

  hanldeOnchange = value => {
    this.setState({
      value: value
    })
    if (this.props.onChange) this.props.onChange(value)
  }

  render() {
    return (
      <ElementWrapper>
        <Spin spinning={!this.state.isLoaded}>
          <Select
            allowClear
            showSearch
            style={{ width: '100%' }}
            value={this.state.value}
            onChange={this.hanldeOnchange}
            placeholder='Vui lòng chọn'
            filterOption={(input, option) => {
              // console.log(input, option)
              return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }}
          >
            {_map(this.state.options, item => {
              return (
                <Option key={item._id} value={item._id}>
                  {item.Name}
                </Option>
              )
            })}
          </Select>
        </Spin>
      </ElementWrapper>
    )
  }
}
export default SelectCoQuanCapPhep
