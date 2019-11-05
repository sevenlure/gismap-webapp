import React from 'react'
// import PropTypes from 'prop-types'
import { Row, Col, Skeleton } from 'antd'
import Clearfix from 'src/components/elements/clearfix'
import styled from 'styled-components'
import ReactHighcharts from 'react-highcharts'
import ListSaleTop from 'src/containers/dashboard/list-sale-top'
import reportApi from 'src/api/reportApi.js'
import { get as _get, map as _map } from 'lodash-es'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import moment from 'moment'

const DashBoardWrapper = styled.div`
  .card {
    background: #fff;
    margin-right: 10px;
    padding: 8px;
  }
`
const colors = ['#f2c94c', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']

class DashBoard extends React.Component {
  static propTypes = {}

  state = {
    isLoading: true,
    dataSource: [],
    year: moment().year(),
    week: moment().week()
  }
  componentDidMount = async () => {
    try {
      const res = await reportApi.getListWithDepartment({
        year: this.state.year,
        week: this.state.week
      })
      if (res.status === 200) {
        this.setState({
          dataSource: _get(res, 'data', [])
        })
      }
    } catch (ex) {
      const { response } = ex
      // console.log('catch', response)
      getInfoErrorfetch(response)
    } finally {
      this.setState({
        isLoading: false
      })
    }
  }

  getConfigColumns = () => {
    const seriesData = _map(this.state.dataSource, item => {
      const RevenueTotal = _get(item, 'RevenueTotal', null)
      return {
        name: _get(item, 'Name'),
        type: 'column',
        data: [RevenueTotal]
      }
    })
    return {
      colors: colors,
      title: {
        text: 'Doanh thu tuần các phòng kinh doanh'
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y} VNĐ</b>'
      },
      xAxis: {
        categories: ['Tuần 44 năm 2019']
      },

      series: seriesData
    }
  }
  getConfigPie = () => {
    const seriesData = _map(this.state.dataSource, item => {
      const RevenueTotal = _get(item, 'RevenueTotal', null)
      // return {
      //   name: _get(item, 'Name'),
      //   sliced: true,
      //   y: [RevenueTotal]
      // }
      return {
        name: _get(item, 'Name'),
        y: RevenueTotal,
        sliced: true,
        selected: true
      }
    })
    return {
      title: {
        text: 'Tỷ lệ doanh thu các phòng kinh doanh so với tổng doanh thu theo tuần'
      },
      colors: colors,
      yAxis: {
        title: {
          text: ''
        }
      },
      xAxis: {
        categories: ['Tuần 44 năm 2019']
      },
      chart: {
        type: 'pie'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y} VNĐ</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [
        {
          name: 'Doanh thu',
          data: seriesData
        }
      ]
      // series: {
      //   data: seriesData
      // }
    }
  }

  render() {
    console.log(this.state.dataSource, 'dataSource')
    return (
      <DashBoardWrapper>
        {this.state.isLoading && (
          <div className='card'>
            <Skeleton paragraph={{ rows: 7 }} />
          </div>
        )}
        {!this.state.isLoading && (
          <Row>
            <Col span={12}>
              <div className='card'>
                <ReactHighcharts config={this.getConfigColumns()}></ReactHighcharts>
              </div>
            </Col>
            <Col span={12}>
              <div className='card'>
                <ReactHighcharts config={this.getConfigPie()}></ReactHighcharts>
              </div>
            </Col>
          </Row>
        )}
        <Clearfix height={16} />
        <Row gutter={8}>
          <Col span={24}>
            <div className='card'>
              <ListSaleTop />
            </div>
          </Col>
        </Row>
      </DashBoardWrapper>
    )
  }
}

export default DashBoard
