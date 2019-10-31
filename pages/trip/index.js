import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Table, Icon, Input, Skeleton, Button } from 'antd'
import reportApi from 'src/api/reportApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import Clearfix from 'src/components/elements/clearfix'
import { DATE_FORMAT } from 'src/config/format.js'
import moment from 'moment'
import TripPageSearch from 'src/containers/trip/search'

const TripWrapper = styled.div``

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class TripPage extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func
  }
  state = {
    isLoading: true,
    dataSource: [],
    pagination: {
      page: 1,
      pageSize: 20
    },
    searchText: ''
  }

  getDataSource = async () => {
    try {
      const res = await reportApi.getList(this.state.pagination)
      if (res.status === 200) {
        this.setState({
          dataSource: _get(res, 'data.list', [])
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

  componentDidMount = async () => {
    const pathPage = slug.trip.list
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
    this.getDataSource()
  }

  getColumn = () => {
    return [
      {
        title: 'Dự án',
        dataIndex: 'ByUser.FullName',
        filterIcon: filtered => <Icon type='search' style={{ color: filtered ? '#1890ff' : undefined }} />,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node
              }}
              placeholder={`Search Họ tên`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type='primary'
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon='search'
              size='small'
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size='small' style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        onFilter: (value, record) => {
          // console.log(record, value, 'record')
          const name = _get(record, 'ByUser.FullName', '')
          return name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        }
      },
      {
        title: 'Người đăng ký',
        dataIndex: 'ByUser.FullName'
      },
      {
        title: 'Người duyệt',
        dataIndex: 'ByUser.FullName'
      },
      {
        title: 'Ngày đăng ký',
        dataIndex: 'DateRevenue',
        render: value => {
          return moment(value).format(DATE_FORMAT)
        }
      },
      {
        title: 'Ngày hoàn thành',
        dataIndex: 'DateRevenue',
        render: value => {
          return moment(value).format(DATE_FORMAT)
        },
        editable: true
      }
    ]
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  hanldeSearch = async values => {
    // console.log(values, 'hanldeSearch')
    try {
      this.setState({
        isLoading: true
      })
      const res = await reportApi.getListByYearWeek({
        ...values
      })
      if (res.status === 200) {
        this.setState({
          dataSource: _get(res, 'data', [])
        })
      }
    } catch (ex) {
      const { response } = ex
      console.log(ex)
      getInfoErrorfetch(response)
    } finally {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    // console.log(this.state,"render")
    return (
      <TripWrapper>
        <div>
          <TripPageSearch onSubmit={this.hanldeSearch} />
        </div>

        <Clearfix height={8} />
        {this.state.isLoading && <Skeleton paragraph={{ rows: 7 }} />}
        {!this.state.isLoading && (
          <Table
            rowKey={'_id'}
            size='small'
            // scroll={{ y: 700 }}
            dataSource={this.state.dataSource}
            columns={this.getColumn()}
            // pagination={{ position: 'bottom' }}
            pagination={{ ...this.state.pagination, position: 'bottom' }}
          />
        )}
      </TripWrapper>
    )
  }
  hanldleOnCancel = () => {
    this.setState({
      isEdit: false
    })
  }
  hanldleOnSuccess = () => {
    this.hanldleOnCancel()
    this.getDataSource()
  }
}

TripPage.Layout = DefaultLayout
export default TripPage
