import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import Clearfix from 'src/components/elements/clearfix'
import FromIconSvg from 'static/images/icon/ic-arrow-map-from.svg'
import ToIconSvg from 'static/images/icon/ic-arrow-map-to.svg'
import FromSelectIconSvg from 'static/images/icon/ic-arrow-map-from-select.svg'
import ToSelectIconSvg from 'static/images/icon/ic-arrow-map-to-select.svg'
import { get as _get, map as _map, isNumber as _isNumber } from 'lodash-es'
import windowSize from 'react-window-size'
import { connect } from 'react-redux'
import { Spin, Select, Icon } from 'antd'
const { Option } = Select

const SelectDepartureWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;

  .Select-frefix {
    position: absolute;
    z-index: 2;
    transform: translate(50%, 50%);
  }
`
@connect(state => ({
  listDeparture: _get(state, 'GeneralStore.danhMuc.listDeparture', [])
}))
@windowSize
export default class SelectDeparture extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    windowWidth: PropTypes.number,
    listDeparture: PropTypes.array,
    placeholder: PropTypes.string,
    isFrom: PropTypes.bool,
    value: PropTypes.any
  }

  state = {
    data: [],
    isloading: true
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('getDerivedStateFromProps')

    if (nextProps.listDeparture) {
      return {
        ...prevState,
        data: nextProps.listDeparture,
        isloading: false
      }
    }
    return null
  }

  render() {
    const isHave = _isNumber(this.props.value) ? true : false
    let iconSelect = this.props.isFrom ? FromIconSvg : ToIconSvg
    let color = ''
    if (isHave) {
      iconSelect = this.props.isFrom ? FromSelectIconSvg : ToSelectIconSvg
    }

    return (
      <SelectDepartureWrapper windowWidth={this.props.windowWidth}>
        <Spin spinning={this.state.isloading}>
          <div className='Select-frefix'>
            <Icon style={{ fontSize: '1.5rem', stroke: color }} component={iconSelect} />
          </div>

          <Select
            // defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            placeholder={this.props.placeholder}
            showSearch
            style={{ width: '100%' }}
            size='large'
            onChange={this.props.onChange}
          >
            {_map(this.state.data, item => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </Spin>
      </SelectDepartureWrapper>
    )
  }
}
