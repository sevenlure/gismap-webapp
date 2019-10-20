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
import { get } from 'lodash-es'
import { replaceVietnameseStr } from 'utils/string'
const { Option } = Select

const SelectDepartureWrapper = styled.div`
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
    value: PropTypes.any,
    keyDisable: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
    if (isHave) {
      iconSelect = this.props.isFrom ? FromSelectIconSvg : ToSelectIconSvg
    }

    return (
      <SelectDepartureWrapper windowWidth={this.props.windowWidth}>
        <Spin spinning={this.state.isloading}>
          <div className='Select-frefix'>
            <Icon style={{ fontSize: '1.5rem' }} component={iconSelect} />
          </div>

          <Select
            className='custom-select'
            // defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={(input, option) => {
              const nameItem = get(option, 'props.namesearch', '')
              const inputXuly = replaceVietnameseStr(input.toLowerCase())
              return nameItem.toLowerCase().indexOf(inputXuly) >= 0
            }}
            value={this.props.value}
            placeholder={this.props.placeholder}
            showSearch
            style={{ width: '100%', fontFamily: 'myFont-Light' }}
            size='large'
            onChange={this.props.onChange}
          >
            {_map(this.state.data, item => {
              return (
                <Option
                  key={item.id}
                  value={item.id}
                  namesearch={item.nameSearch}
                  disabled={this.props.keyDisable === item.id}
                >
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