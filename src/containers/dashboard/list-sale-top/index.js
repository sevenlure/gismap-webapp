import React from 'react'
// import PropTypes from 'prop-types'
import { Table } from 'antd'
import Clearfix from 'src/components/elements/clearfix'
import styled from 'styled-components'
import reportApi from 'src/api/reportApi.js'
import { get as _get, sortBy as _sortBy } from 'lodash-es'
import { Skeleton } from 'antd'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { getFormatNumber } from 'src/config/format.js'

const ListSaleTopWrapper = styled.div`
  flex: 1;
  padding: 8px;
`

class ListSaleTop extends React.Component {
  static propTypes = {}

  state = {
    isLoading: false,
    dataSource: []
  }
  componentDidMount = async () => {
    try {
      const res = await reportApi.getListSaleTop()
      if (res.status === 200) {
        this.setState({
          dataSource: _sortBy(_get(res, 'data', []), ['Rank'])
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
  getColums = () => {
    return [
      {
        title: 'Nhân viên',
        dataIndex: 'FullName',
        align: 'center',
        render: value => {
          return <div style={{ textAlign: 'left' }}>{value}</div>
        }
      },
      {
        title: 'Phòng ban',
        dataIndex: 'Department.Name',
        align: 'center',
        render: value => {
          return <div style={{ textAlign: 'left' }}>{value}</div>
        }
      },
      {
        title: 'Nhóm',
        dataIndex: 'Group.Name',
        align: 'center',
        render: value => {
          return <div style={{ textAlign: 'left' }}>{value}</div>
        }
      },
      {
        title: 'KQ kinh doanh',
        dataIndex: 'RevenueTotal',
        align: 'center',
        render: value => {
          return <div style={{ textAlign: 'right' }}>{getFormatNumber(value)}</div>
        }
      },
      {
        title: 'Xếp hạng',
        dataIndex: 'Rank',
        align: 'center'
      }
    ]
  }
  render() {
    return (
      <ListSaleTopWrapper>
        {this.state.dataSource && this.state.dataSource.length > 0 && (
          <div style={{ background: '#fff' }}>
            <h3>Nhân viên kinh doanh suất sắc</h3>
            {this.state.isLoading && <Skeleton paragraph={{ rows: 7 }} />}
            {!this.state.isLoading && (
              <div>
                <Clearfix height={8} />
                <Table
                  rowKey={'_id'}
                  size='small'
                  bordered
                  dataSource={this.state.dataSource}
                  columns={this.getColums()}
                  pagination={{ position: 'bottom' }}
                />
              </div>
            )}
          </div>
        )}
      </ListSaleTopWrapper>
    )
  }
}

export default ListSaleTop
