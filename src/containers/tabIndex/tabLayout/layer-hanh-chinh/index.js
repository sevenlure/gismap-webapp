import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Clearfix from 'src/components/elements/clearfix'
import { Select, Row, Col, TreeSelect } from 'antd'
import { map as _map, concat as _concat, pick as _pick } from 'lodash-es'
import { connect } from 'react-redux'
import dataHanhChinh from './data-hanh-chinh.json'
import { updateLevelHanhChinh, updateVungHanhChinh } from 'src/redux/actions/filterAction.js'

const { Option } = Select
const { SHOW_PARENT } = TreeSelect

const LayerHanhChinhWrapper = styled.div`
  flex: 1;
`

const DATA_LEVEL = [
  {
    name: 'Tỉnh - thành phố',
    value: 'tinhThanhPho'
  },
  {
    name: 'Quận - huyện',
    value: 'quanHuyen'
  },
  {
    name: 'Phường - xã',
    value: 'phuongXa'
  }
]

const mapStateToProps = () => ({})
const mapDispatchToProps = { updateLevelHanhChinh, updateVungHanhChinh }
@connect(mapStateToProps, mapDispatchToProps)
class LayerHanhChinh extends React.Component {
  static propTypes = {
    updateLevelHanhChinh: PropTypes.func,
    updateVungHanhChinh: PropTypes.func
  }

  state = {
    dataHanhChinh: [],
    isLoadingHanhChinh: true
  }

  hanldeOnchangeCapHanhChinh = value => {
    this.setState(
      {
        isLoadingHanhChinh: false
      },
      () => {
        let dataSource = []
        switch (value) {
          case 'tinhThanhPho': {
            dataSource = this.getTransferdata(dataHanhChinh, 0)

            break
          }
          case 'quanHuyen': {
            dataSource = this.getTransferdata(dataHanhChinh, 1)
            break
          }
          case 'phuongXa': {
            dataSource = this.getTransferdata(dataHanhChinh, 2)
            break
          }
          default: {
            dataSource = []
          }
        }
        this.props.updateLevelHanhChinh(value)
        this.props.updateVungHanhChinh([])

        this.setState({
          dataHanhChinh: dataSource,
          isLoadingHanhChinh: true
        })
      }
    )
  }
  getTransferdata = (array, level) => {
    return _map(array, item => {
      return {
        value: item.value,
        key: item.value,
        title: item.title,
        children: level === 0 ? [] : this.getTransferdata(item.children, level - 1)
      }
    })
  }

  hanldeOnchangeLayerHanhChinh = (arrayValue, arrayLabel, extra) => {
    this.props.updateVungHanhChinh(arrayValue)
    // console.log(arrayValue, arrayLabel, extra)
  }
  render() {
    console.log(this.state.dataHanhChinh)
    return (
      <LayerHanhChinhWrapper>
        <Row>
          <Col span='24'>
            <Select
              showSearch
              style={{ width: '100%' }}
              onChange={this.hanldeOnchangeCapHanhChinh}
              placeholder='Cấp dữ liệu hành chính'
            >
              {_map(DATA_LEVEL, item => {
                return <Option value={item.value}>{item.name}</Option>
              })}
            </Select>
          </Col>
        </Row>
        <Clearfix height={8} />
        <Row>
          <Col span='24'>
            {this.state.isLoadingHanhChinh && (
              <TreeSelect
                maxTagCount={5}
                treeData={this.state.dataHanhChinh}
                showCheckedStrategy={SHOW_PARENT}
                onChange={this.hanldeOnchangeLayerHanhChinh}
                treeCheckable={true}
                searchPlaceholder='Lọc dữ liệu hiển thị'
                style={{
                  width: '100%'
                }}
              />
            )}
          </Col>
        </Row>
      </LayerHanhChinhWrapper>
    )
  }
}

export default LayerHanhChinh
