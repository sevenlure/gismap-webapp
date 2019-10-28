import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Table, Icon, Divider, Skeleton, Button, Popconfirm, message, Checkbox } from 'antd'
import reportApi from 'src/api/reportApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import Link from 'next/link'
import Clearfix from 'src/components/elements/clearfix'
import { DATE_FORMAT, getFormatNumber } from 'src/config/format.js'
import moment from 'moment'
import ReportPageSearch from 'src/containers/real-estate-project/search.js'

const RepportWrapper = styled.div``

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class ReportPage extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func
  }
  state = {
    isLoading: true,
    dataSource: [],
    pagination: {
      page: 1,
      pageSize: 50
    }
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
    const pathPage = slug.report.list
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
    this.getDataSource()
  }

  getColumn = () => {
    return [
      {
        title: 'Họ tên',
        dataIndex: 'ByUser.FullName'
      },
      {
        title: 'Doanh thu',
        dataIndex: 'Revenue',
        render: value => {
          return getFormatNumber(value)
        }
      },
      {
        title: 'Ngày tính doanh thu',
        dataIndex: 'DateRevenue',
        render: value => {
          return moment(value).format(DATE_FORMAT)
        }
      },
      {
        title: '',
        width: 130,
        render: (text, record) => {
          return (
            <div>
              <Link href={slug.project.content} as={`${slug.project.contentWidthId}/${_get(record, '_id')}`}>
                <a>
                  <Icon
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    theme='twoTone'
                    twoToneColor='#F2C94C'
                    type='highlight'
                  />
                </a>
              </Link>
              <Divider type='vertical' />
              <Link href={slug.project.edit} as={`${slug.project.base}/${_get(record, '_id')}`}>
                <a>
                  <Icon
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    theme='twoTone'
                    twoToneColor='#F2C94C'
                    type='edit'
                  />
                </a>
              </Link>

              <Divider type='vertical' />
              <Popconfirm
                title='Bạn chắc chắc muốn xoá?'
                placement='left'
                okText='Đồng ý'
                cancelText='Hủy'
                onConfirm={() => {
                  this.handleDelete(_get(record, '_id'))
                }}
              >
                <Icon
                  style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                  twoToneColor='red'
                  theme='twoTone'
                  type='delete'
                />
              </Popconfirm>
            </div>
          )
        }
      }
    ]
  }

  hanldeSearch = async values => {
    try {
      this.setState({
        isLoading: true
      })
      const res = await reportApi.getList({
        ...this.state.pagination,
        ...values
      })
      if (res.status === 200) {
        this.setState({
          dataSource: _get(res, 'data.list', [])
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
    return (
      <RepportWrapper>
        <div>
          <ReportPageSearch onSubmit={this.hanldeSearch} />
        </div>
        <Clearfix height={8} />
        <Link href={slug.project.create}>
          <Button type='primary' icon='plus-circle'>
            Tạo mới
          </Button>
        </Link>

        <Clearfix height={8} />
        {this.state.isLoading && <Skeleton paragraph={{ rows: 7 }} />}
        {!this.state.isLoading && (
          <Table
            rowKey={'_id'}
            size='small'
            // scroll={{ y: 700 }}
            dataSource={this.state.dataSource}
            columns={this.getColumn()}
            pagination={{ position: 'bottom' }}
          />
        )}
      </RepportWrapper>
    )
  }

  handleDelete = async key => {
    // console.log(key)
    try {
      const res = await ReportPageApi.deleteById(key)
      if (res.status === 200) {
        message.success('Xóa thành công!')
        this.getDataSource()
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
}

ReportPage.Layout = DefaultLayout
export default ReportPage
