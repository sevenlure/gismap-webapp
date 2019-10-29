import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { get as _get, map as _map, compact as _compact } from 'lodash-es'
import windowSize from 'react-window-size'
import { connect } from 'react-redux'
import { Spin, Cascader } from 'antd'

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
  listDepartment: _get(state, 'GeneralStore.danhMuc.listDepartment', []),
  danhMucIsLoaded: _get(state, 'GeneralStore.danhMucIsLoaded', false)
}))
@windowSize
export default class SelectDepartmentToGroup extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    windowWidth: PropTypes.number,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    listDepartment: PropTypes.array,
    danhMucIsLoaded: PropTypes.bool,
    disabled: PropTypes.bool,
    isFillterSale: PropTypes.bool
  }

  state = {
    data: [],
    isLoading: true,
    value: null
  }

  getInitialData = async () => {
    this.setState({
      data: this.tranferData(),
      isLoading: false
    })

    if (this.props.value) {
      this.onChange
    }
  }

  componentDidMount = () => {
    // console.log('this.props.danhMucIsLoaded', ' this.state.isLoading')
    // console.log(!this.props.danhMucIsLoaded, this.state.isLoading)
  }

  componentDidUpdate = () => {
    // console.log('this.props.danhMucIsLoaded', ' this.state.isLoading')
    // console.log(!this.props.danhMucIsLoaded, this.state.isLoading, prevState.isLoading)

    if (this.props.danhMucIsLoaded && this.state.isLoading) {
      this.getInitialData()
    }
  }

  tranferData = () => {
    const data = _get(this.props, 'listDepartment', [])
    const result = _map(data, level1 => {
      // console.log(level1, 'level1')
      if (this.props.isFillterSale && _get(level1, 'Type', '') !== 'SALE') {
        return null
      }
      const children = _map(level1.GroupList, level2 => {
        return {
          value: level2._id,
          label: level2.Name
        }
      })
      return {
        value: level1._id,
        label: level1.Name,
        children
      }
    })

    return _compact(result)
  }

  tranderDataReturn = selectedOptions => {
    let result = {}
    if (selectedOptions[0]) {
      result.Department = _get(selectedOptions[0], 'value', null)
    }
    console.log(selectedOptions[1], 'selectedOptions[1]')
    if (selectedOptions[1]) {
      result.Group = _get(selectedOptions[1], 'value', null)
    }

    return result
  }

  onChange = value => {
    // let result = this.tranderDataReturn(selectedOptions)
    this.setState({
      value: value
    })
    if (this.props.onChange) this.props.onChange(value)
    // console.log(value, selectedOptions, 'onChange')
  }

  // loadData = selectedOptions => {
  //   const targetOption = selectedOptions[selectedOptions.length - 1]
  //   targetOption.loading = true
  //   console.log(targetOption, 'targetOption')

  //   // load options lazily
  //   setTimeout(() => {
  //     targetOption.loading = false
  //     targetOption.children = [
  //       {
  //         label: `${targetOption.label} Dynamic 1`,
  //         value: 'dynamic1'
  //       },
  //       {
  //         label: `${targetOption.label} Dynamic 2`,
  //         value: 'dynamic2'
  //       }
  //     ]
  //     this.setState({
  //       data: [...this.state.data]
  //     })
  //   }, 1000)
  // }

  render() {
    return (
      <SelectUserWrapper windowWidth={this.props.windowWidth}>
        <Spin spinning={this.state.isLoading}>
          <Cascader
            size='large'
            // loadData={this.loadData}
            value={this.state.value ? this.state.value : this.props.value}
            options={this.state.data}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
            changeOnSelect
          />
        </Spin>
      </SelectUserWrapper>
    )
  }
}
