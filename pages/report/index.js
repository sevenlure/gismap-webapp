import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Table, Icon, Input, Skeleton, Modal, Tooltip, Affix } from 'antd'
import reportApi from 'src/api/reportApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import Clearfix from 'src/components/elements/clearfix'
import { DATE_FORMAT, getFormatNumber } from 'src/config/format.js'
import moment from 'moment'
import ReportPageSearch from 'src/containers/report/search'
import EditRevenues from 'src/containers/revenue/edit.js'
import Button from 'src/components/elements/button'
import Link from 'next/link'

const RepportWrapper = styled.div``

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath,
  updateBackgroundColor
}

@connect(mapStateToProps, mapDispatchToProps)
class ReportPage extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func,
    updateBackgroundColor: PropTypes.func
  }
  state = {
    isLoading: true,
    dataSource: [],
    pagination: {
      page: 1,
      pageSize: 20
    },
    searchText: '',
    isEdit: false,
    editData: null,
    rule: {},
    isExportExcel: false
  }

  getDataSource = async () => {
    try {
      // const res = await reportApi.getList(this.state.pagination)
      // if (res.status === 200) {
      //   this.setState({
      //     dataSource: _get(res, 'data.list', [])
      //   })
      // }
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
    const pathPage = slug.report.list
    this.props.updateBackgroundColor('#fff')
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
    this.getDataSource()
  }

  getColumn = () => {
    return [
      {
        title: 'Mã NV',
        dataIndex: 'MaNV'
      },
      {
        title: 'Họ tên',
        dataIndex: 'FullName',
        align: 'center',
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
              style={{ marginRight: 8 }}
            >
              Tìm kiếm
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size='small' style={{ width: 90 }}>
              Hủy
            </Button>
          </div>
        ),
        onFilter: (value, record) => {
          // console.log(record, value, 'record')
          const name = _get(record, 'FullName', '')
          return name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        },
        render: value => {
          return <div style={{ textAlign: 'left' }}>{value}</div>
        }
      },
      {
        title: 'Doanh thu',
        dataIndex: 'Revenue',
        align: 'center',
        render: value => {
          return <div style={{ textAlign: 'right' }}>{getFormatNumber(value)}</div>
        }
      },
      {
        title: 'Ngày tính doanh thu',
        dataIndex: 'DateRevenue',
        align: 'center',
        render: value => {
          value = value ? moment(value).format(DATE_FORMAT) : 'Chưa xác định'
          return <div>{value}</div>
        }
      },
      {
        title: '',
        align: 'center',
        render: (text, record) => {
          return (
            <div>
              <Tooltip title='Sửa'>
                <Icon
                  onClick={() => {
                    this.setState({
                      isEdit: true,
                      editData: record
                    })
                  }}
                  style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                  theme='twoTone'
                  twoToneColor='#F2C94C'
                  type='edit'
                />
              </Tooltip>
            </div>
          )
        }
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

  hanldeSearchReport = async values => {
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
          dataSource: _get(res, 'data', []),
          rule: {
            ...values
          }
        })
      }
    } catch (ex) {
      const { response } = ex
      console.log(ex)
      getInfoErrorfetch(response)
    } finally {
      this.setState({
        isLoading: false,
        isExportExcel: true
      })
    }
  }

  render() {
    // console.log(this.state,"render")
    return (
      <RepportWrapper>
        <div>
          <ReportPageSearch onSubmit={this.hanldeSearchReport} />
        </div>

        <Clearfix height={8} />
        {this.state.isLoading && <Skeleton paragraph={{ rows: 7 }} />}
        {!this.state.isLoading && (
          <Table
            rowKey={'_id'}
            size='small'
            bordered
            // scroll={{ y: 700 }}
            dataSource={this.state.dataSource}
            columns={this.getColumn()}
            // pagination={{ position: 'bottom' }}
            pagination={{ ...this.state.pagination, position: 'bottom' }}
          />
        )}
        <Modal
          // width='70%'
          visible={this.state.isEdit}
          footer={null}
          centered
          closeIcon={<span />}
          closable={false}
        >
          {/* // NOTE edit */}
          <EditRevenues
            rule={this.state.rule}
            onCancel={this.hanldleOnCancel}
            onSuccess={this.hanldleOnSuccess}
            initialData={{
              ...this.state.editData,
              Name: _get(this.state.editData, 'FullName', '')
            }}
          />
        </Modal>
        <Clearfix height={32} />
        <Affix offsetBottom={20}>
          {this.state.isExportExcel && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link href={slug.report.edit} as={`${slug.report.edit}`}>
                <Button type='primary' icon='export'>
                  Export excel
                </Button>
              </Link>
            </div>
          )}
        </Affix>
      </RepportWrapper>
    )
  }
  hanldleOnCancel = () => {
    this.setState({
      isEdit: false
    })
  }
  hanldleOnSuccess = () => {
    this.hanldleOnCancel()
    this.hanldeSearchReport(this.state.rule)
  }
}

ReportPage.Layout = DefaultLayout
export default ReportPage
