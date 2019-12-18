import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactHighcharts from 'react-highcharts'
import { Rnd } from 'react-rnd'
import { get as _get, map as _map } from 'lodash-es'
import { Row, Col, Typography, Icon } from 'antd'
const { Text } = Typography

// import Clearfix from 'src/components/elements/clearfix'

const ComponentWrapper = styled.div`
  flex: 1;
  .card {
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
      font-size: 1.2rem;
      color: #fff;
      background: linear-gradient(to right, #3880ff, #5f98fd);
      padding: 4px;
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
      }
    }
  }
`

const dataProperties = [
  {
    name: 'Name',
    value: 'Beja'
  },
  {
    name: 'Persons',
    value: '35,000'
  },
  {
    name: 'ABC',
    value: '3,000'
  }
]
const colors = ['#f2c94c', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']

class ComponentRnd extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    minWidth: PropTypes.number.isRequired,
    minHeight: PropTypes.number.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    visible: PropTypes.bool,
    onClose: PropTypes.func
  }

  state = {
    width: this.props.minWidth,
    height: this.props.minHeight,

    x: this.props.x ? this.props.x : 0,
    y: this.props.y ? this.props.y : 0,
    isLoadingChart: false
  }

  getConfigColumns = () => {
    const dataSourceChart = [
      {
        name: 'Thuoc tinh 1',
        value: 23.989
      },
      {
        name: 'Thuoc tinh 2',
        value: 13.989
      },
      {
        name: 'Thuoc tinh 3',
        value: 31.989
      }
    ]
    const seriesData = _map(dataSourceChart, item => {
      return {
        showInLegend: false,
        name: _get(item, 'name'),
        type: 'column',
        data: [_get(item, 'value')]
      }
    })

    // console.log(
    //   this.state.height * (1 - dataProperties.length / 10),
    //   dataProperties.length / 10,
    //   'this.state.height * 0.4'
    // )
    return {
      chart: {
        height: this.state.height - dataProperties.length * 30
      },
      colors: colors,
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

  render() {
    return (
      <ComponentWrapper>
        {this.props.visible && (
          <Rnd
            default={{
              x: this.state.x,
              y: this.state.y,
              width: this.state.width,
              height: this.state.height
            }}
            // position={{ x: this.state.x, y: this.state.y }}
            style={{ background: '#fff', display: 'flex' }}
            onResizeStop={(e, direction, ref, delta, position) => {
              this.setState({
                width: ref.style.width > this.props.minWidth ? this.props.minWidth : ref.style.width.replace('px', ''),
                height:
                  ref.style.height > this.props.minHeight ? this.props.minHeight : ref.style.height.replace('px', '')
              })
            }}
          >
            <div className='card'>
              <div className='card--close' onClick={this.props.onClose}>
                <Icon type='close-circle' theme='filled' twoToneColor='#fff' />
              </div>
              <div className='card--header'>
                <span>{this.props.title}</span>
              </div>
              <div className='card--content'>
                {_map(dataProperties, (item, index) => {
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

                <div className='card--content--chart'>
                  {!this.state.isLoadingChart && <ReactHighcharts config={this.getConfigColumns()} />}
                </div>
              </div>
            </div>
          </Rnd>
        )}
      </ComponentWrapper>
    )
  }
}

export default ComponentRnd
