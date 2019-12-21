import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactHighcharts from 'react-highcharts'
import { get as _get, map as _map, isEmpty as _isEmpty } from 'lodash-es'
import { Row, Col, Typography, Icon } from 'antd'
const { Text } = Typography

// import Clearfix from 'src/components/elements/clearfix'

const ComponentWrapper = styled.div`
  flex: 1;
  min-width: 250px;
  // min-height: 300px;
  // max-height: 400px;
  .card {
    border-radius: 4px;
    background: #fff;
    width: 100%;
    overflow: hidden;
    height: fit-content;
    display: flex;
    flex-direction: column;

    .card--close {
      position: absolute;
      top: 8px;
      right: 4px;
      cursor: pointer;
    }
    .card--header {
      min-height: 32px;
      font-size: 1.2rem;
      color: #fff;
      background: linear-gradient(to right, #3880ff, #5f98fd);
      padding: 8px;
      span {
        white-space: normal;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
    .card--content {
      flex: 1;
      padding: 8px;
      .card--content--chart {
        padding-top: 16px;
        max-height: 300px;
      }
    }
  }
`

// const dataProperties = [
//   {
//     name: 'Name',
//     value: 'Beja'
//   },
//   {
//     name: 'Persons',
//     value: '35,000'
//   },
//   {
//     name: 'ABC',
//     value: '3,000'
//   }
// ]

// const dataSourceChart = [
//   {
//     name: 'Thuoc tinh 1',
//     value: 23.989
//   },
//   {
//     name: 'Thuoc tinh 2',
//     value: 13.989
//   },
//   {
//     name: 'Thuoc tinh 3',
//     value: 31.989
//   }
// ]
// const colors = ['#f2c94c', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']

class ComponentRnd extends React.Component {
  static propTypes = {
    dataSourceChart: PropTypes.array,
    dataSourceProperties: PropTypes.array,
    title: PropTypes.string.isRequired,
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    visible: PropTypes.bool,
    onClose: PropTypes.func
  }

  componentDidMount() {
    console.log('popup didmount')
  }

  state = {
    width: !this.props.minWidth || this.props.minWidth > 300 ? 300 : this.props.minWidth,
    height: !this.props.minHeight || this.props.minHeight > 400 ? 400 : this.props.minHeight,

    x: this.props.x ? this.props.x : 0,
    y: this.props.y ? this.props.y : 0,
    isLoadingChart: false
  }

  getConfigColumns = dataSource => {
    // const dataSourceChart = dataSourceChart
    let colors = []
    const seriesData = _map(dataSource, item => {
      return {
        showInLegend: false,
        name: _get(item, 'name'),
        type: 'column',
        color: _get(item, 'color'),
        data: [_get(item, 'value')]
      }
    })

    // console.log(
    //   this.state.height * (1 - dataProperties.length / 10),
    //   dataProperties.length / 10,
    //   'this.state.height * 0.4'
    // )
    const heightChart = this.state.height > 300 ? 300 : this.state.height
    return {
      chart: {
        height: heightChart - this.props.dataSourceProperties.length * 30
      },
      // colors: colors,
      title: {
        text: null
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      xAxis: {
        categories: [``]
      },

      series: seriesData
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("-componentDidMount-", this.state.height,prevState.height )
    if (this.state.height !== prevState.height || this.state.width !== prevState.width) {
      this.setState({
        isLoadingChart: false
      })
    }
  }

  hanldeOnClose = () => {
    this.setState({
      isVisible: false
    })
  }

  checkDataSourceEmpty = () => {
    const { dataSourceProperties, dataSourceChart } = this.props
    if (_isEmpty(dataSourceProperties) || _isEmpty(dataSourceChart)) {
      return <div>NOT EMPTY</div>
    } else {
      return null
    }
  }

  render() {
    const { dataSourceProperties, dataSourceChart, title } = this.props
    return (
      <ComponentWrapper>
        <div className='card'>
          <div className='card--close' onClick={this.props.onClose}>
            {/* <Icon type='close-circle' theme='filled' twoToneColor='#fff' /> */}
            {/* <Icon type='close' style={{ color: '#fff' }} /> */}
          </div>
          <div className='card--header'>
            <span>{title ? title : ''}</span>
          </div>
          <div className='card--content'>
            {dataSourceProperties && dataSourceProperties.length > 0 && (
              <div className='card--content--properties'>
                {_map(dataSourceProperties, (item, index) => {
                  return (
                    <div
                      key={index}
                      style={{ borderBottom: 'solid 1px #d9d9d9', marginBottom: '4px', paddingBottom: '4px' }}
                    >
                      <Row>
                        <Col span={12}>
                          <Text strong>{item.name}</Text>
                        </Col>
                        <Col span={12}>
                          <Text>{item.value}</Text>
                        </Col>
                      </Row>
                    </div>
                  )
                })}
              </div>
            )}

            {dataSourceChart && dataSourceChart.length > 0 && (
              <div className='card--content--chart'>
                {!this.state.isLoadingChart && <ReactHighcharts config={this.getConfigColumns(dataSourceChart)} />}
              </div>
            )}
            {this.checkDataSourceEmpty()}
          </div>
        </div>
      </ComponentWrapper>
    )
  }
}

export default ComponentRnd
