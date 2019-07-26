import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Cascader, Spin } from 'antd'
import { get as _get, map as _map, pick as _pick } from 'lodash'
import { connect } from 'react-redux'

const ElementWrapper = styled.div`
  flex: 1;
`

const PICK_LIST = ['KeyExtra', 'KeyDanhmuc', 'Name']

@connect(state => ({
  initialOptions: _get(state, 'GeneralStore.danhMuc.Province', []),
  danhMucIsLoaded: _get(state, 'GeneralStore.danhMucIsLoaded', false)
}))
class SelectQuanHuyen extends React.PureComponent {
  static propTypes = {
    initialOptions: PropTypes.array,
    danhMucIsLoaded: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.any
  }

  state = {
    options: null,
    isLoaded: false,
    value: []
  }

  initialData = () => {
    const result = _map(this.props.initialOptions, item => {
      const level2 = _map(item.Children, item_2 => {
        const level3 = _map(item_2.Children, item_3 => {
          return {
            value: item_3.KeyExtra,
            label: item_3.Name,
            ..._pick(item_3, PICK_LIST)
          }
        })
        return {
          value: item_2.KeyExtra,
          label: item_2.Name,
          children: level3,
          ..._pick(item_2, PICK_LIST)
        }
      })
      return {
        value: item.KeyExtra,
        label: item.Name,
        children: level2,
        ..._pick(item, PICK_LIST)
      }
    })

    this.setState({
      options: result,
      isLoaded: true
    })
  }

  // ValueSelected
  UNSAFE_componentWillReceiveProps(nextProps) {
    const val = _get(nextProps, 'value.ValueSelected')
    if (val !== this.state.value) this.setState({ value: val })

    if (nextProps.danhMucIsLoaded) this.initialData()
  }

  hanldeOnchange = (value, selectedOptions) => {
    // console.log(value, selectedOptions)
    const result = {
      TinhThanh: _pick(selectedOptions[0], PICK_LIST),
      QuanHuyen: _pick(selectedOptions[1], PICK_LIST),
      PhuongXa: _pick(selectedOptions[2], PICK_LIST),
      ValueSelected: value
    }
    this.setState({
      value: value
    })
    if (this.props.onChange) this.props.onChange(result)
    console.log('result QuanHuyen', result)
  }
  render() {
    // console.log(this.props, 'render:')
    // console.log(this.state.options, 'options')
    return (
      <ElementWrapper>
        <Spin spinning={!this.state.isLoaded}>
          <Cascader
            changeOnSelect
            allowClear
            value={this.state.value}
            style={{ width: '100%' }}
            onChange={this.hanldeOnchange}
            options={this.state.options}
            placeholder='Vui lòng chọn'
            showSearch={false}
            popupClassName='pop-height-400'
          />
        </Spin>
      </ElementWrapper>
    )
  }
}
export default SelectQuanHuyen
