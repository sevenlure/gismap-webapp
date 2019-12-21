import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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

const mapStateToProps = state => ({
  analyticsStore: _get(state, 'AnalyticsStore')
})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
class ComponentRnd extends React.Component {
  static propTypes = {
    // dataSourceChart: PropTypes.array,
    // dataSourceProperties: PropTypes.array,
    analyticsStore: PropTypes.object,
    markerTypeKey: PropTypes.string,
    properties: PropTypes.object,
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
    isLoadingChart: false,
    dataSourceProperties: [],
    dataSourceChartProperties: []
  }

  componentDidMount = () => {
    this.transformDataToPopContent(this.props.markerTypeKey, this.props.properties)
  }

  getConfigColumns = dataSource => {
    // const dataSourceChart = dataSourceChart

    const seriesData = _map(dataSource, item => {
      const _number = parseFloat(_get(item, 'value', null))
      return {
        showInLegend: false,
        name: _get(item, 'name'),
        type: 'column',
        color: _get(item, 'color'),
        data: [_number]
      }
    })
    console.log(seriesData, 'getConfigColumns')
    // console.log(
    //   this.state.height * (1 - dataProperties.length / 10),
    //   dataProperties.length / 10,
    //   'this.state.height * 0.4'
    // )
    const heightChart = this.state.height > 300 ? 300 : this.state.height
    return {
      chart: {
        height: heightChart - this.state.dataSourceProperties.length * 30
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
    if (this.props.analyticsStore !== prevProps.analyticsStore) {
      this.transformDataToPopContent(this.props.markerTypeKey, this.props.properties)
    }
    // if (this.state.height !== prevState.height || this.state.width !== prevState.width) {
    //   this.setState({
    //     isLoadingChart: false
    //   })
    // }
  }

  hanldeOnClose = () => {
    this.setState({
      isVisible: false
    })
  }

  checkDataSourceEmpty = () => {
    const { dataSourceProperties, dataSourceChartProperties } = this.state
    if (_isEmpty(dataSourceProperties) && _isEmpty(dataSourceChartProperties)) {
      return <div>EMPTY</div>
    } else {
      return null
    }
  }

  transformDataToPopContent = (key, properties) => {
    this.setState({
      isLoadingChart: true
    })
    const fieldDataObj = _get(this.props, `analyticsStore.${key}.tabInfo.tasks`, {})
    const visibleAtts = _get(this.props, `analyticsStore.${key}.tabInfo.columns.column-visible-attribute.taskIds`, [])
    const chartAtts = _get(this.props, `analyticsStore.${key}.tabInfo.columns.column-chart-attribute.taskIds`, [])

    let dataSourceProperties = []
    visibleAtts.map(attKey => {
      const attribute = fieldDataObj[attKey]
      dataSourceProperties.push({ name: attribute.label, value: _get(properties, attKey) })
    })
    let dataSourceChartProperties = []
    chartAtts.map(attKey => {
      const attribute = fieldDataObj[attKey]
      dataSourceChartProperties.push({ name: attribute.label, value: _get(properties, attKey), color: attribute.color })
    })
    // console.log(dataSourceProperties, key, 'dataSourceChartProperties')
    this.setState({
      dataSourceProperties,
      dataSourceChartProperties,
      isLoadingChart: false
    })
  }

  render() {
    const { title } = this.props
    const { dataSourceProperties, dataSourceChartProperties } = this.state
    console.log(this.state.isLoadingChart, 'this.state.isLoadingChart')
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

            {dataSourceChartProperties && dataSourceChartProperties.length > 0 && (
              <div className='card--content--chart'>
                <ReactHighcharts config={this.getConfigColumns(dataSourceChartProperties)} />
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
