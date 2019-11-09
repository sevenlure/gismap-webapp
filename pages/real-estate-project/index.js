import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Table, Icon, Divider, Skeleton, Button, Popconfirm, message, Checkbox, Tooltip } from 'antd'
import RealEstateProjectApi from 'src/api/RealEstateProjectApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import Link from 'next/link'
import Clearfix from 'src/components/elements/clearfix'
import { UNIT_CURRENCY } from 'src/config/format.js'
import RealEstateProjectSearch from 'src/containers/real-estate-project/search.js'

const RealEstateProjectWrapper = styled.div``

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath,
  updateBackgroundColor
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class RealEstateProject extends React.Component {
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
      pageSize: 50
    }
  }

  getDataSource = async () => {
    try {
      const res = await RealEstateProjectApi.getList(this.state.pagination)
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
    const pathPage = slug.project.list
    this.props.updateBackgroundColor('#fff')
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
    this.getDataSource()
  }

  getColumn = () => {
    return [
      {
        title: 'Tên dự án',
        dataIndex: 'Name'
      },
      {
        title: 'Tình trạng',
        dataIndex: 'Status',
        sorter: (a, b) => a.Status.length - b.Status.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Vị trí',
        dataIndex: 'Address'
      },
      {
        title: 'Giá sản phẩm',
        sorter: (a, b) => a.PriceWithUnit - b.PriceWithUnit,
        sortDirections: ['descend', 'ascend'],
        render: (value, record) => {
          let strPrice = _get(record, 'PriceWithUnit', '')
          if (strPrice) {
            const UnitCount = _get(record, 'UnitCount', '')
            // console.log(UnitCount)
            strPrice = `${strPrice} ${_get(UNIT_CURRENCY, [UnitCount], '')}`
          }

          return <div>{strPrice}</div>
        }
      },
      // UNIT_CURRENCY
      {
        title: 'Cho phép hiển thị',
        dataIndex: 'IsShow',
        align: 'center',
        render: value => {
          return <Checkbox checked={value} />
        }
      },
      {
        title: '',
        width: '15%',
        render: (text, record) => {
          return (
            <div>
              <Link href={slug.project.content} as={`${slug.project.contentWidthId}/${_get(record, '_id')}`}>
                <a>
                  <Tooltip title='Nội dung'>
                    <Icon
                      style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                      theme='twoTone'
                      twoToneColor='#F2C94C'
                      type='highlight'
                    />
                  </Tooltip>
                </a>
              </Link>
              <Divider type='vertical' />
              <Link href={slug.project.edit} as={`${slug.project.base}/${_get(record, '_id')}`}>
                <a>
                  <Tooltip title='Chỉnh sửa'>
                    <Icon
                      style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                      theme='twoTone'
                      twoToneColor='#F2C94C'
                      type='edit'
                    />
                  </Tooltip>
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
                <Tooltip title='Xóa'>
                  <Icon
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    twoToneColor='red'
                    theme='twoTone'
                    type='delete'
                  />
                </Tooltip>
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
      const res = await RealEstateProjectApi.getList({
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
      <RealEstateProjectWrapper>
        <div>
          <RealEstateProjectSearch onSubmit={this.hanldeSearch} />
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
      </RealEstateProjectWrapper>
    )
  }

  handleDelete = async key => {
    // console.log(key)
    try {
      const res = await RealEstateProjectApi.deleteById(key)
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

RealEstateProject.Layout = DefaultLayout
export default RealEstateProject
