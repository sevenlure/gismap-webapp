import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Skeleton, Upload, Button, Icon, Table, Affix, Typography, message } from 'antd'
import Clearfix from 'src/components/elements/clearfix'

// import organizationApi from 'src/api/organizationApi'
// import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { ExcelRenderer } from 'react-excel-renderer'

// import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
const { Text } = Typography

const PageReportEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath,
  updateBackgroundColor
}

@connect(mapStateToProps, mapDispatchToProps)
class PageReportEdit extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func,
    updateBackgroundColor: PropTypes.func
  }
  state = {
    isLoading: false,
    dataSouce: [],
    pagination: {
      page: 1,
      pageSize: 50
    },
    errorMessage: null
    // grid: [
    //   [
    //     { value: 'STT', readOnly: true },
    //     { value: 'Họ và tên', readOnly: true },
    //     { value: 'Doanh thu', readOnly: true },
    //     { value: 'Ngày tính doanh thu', readOnly: true }
    //   ],
    //   [{ readOnly: true, value: 1 }, { value: 'Mai Thuận Thảo' }, { value: '200,000,000' }, { value: '15/11/2019' }],
    //   [{ readOnly: true, value: 2 }, { value: 'Dương Tấn Phất' }, { value: '200,000,000' }, { value: '15/11/2019' }]
    // ]
  }

  componentDidMount = async () => {
    const pathPage = slug.report.edit
    this.props.updateBackgroundColor('#fff')
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
  }

  fileHandler = fileList => {
    // console.log('fileList', fileList)
    this.setState({ isLoading: true })
    let fileObj = fileList
    if (!fileObj) {
      this.setState({
        isLoading: false
      })
      message.error('Không có file cập nhật!')
      return false
    }
    // console.log('fileObj.type:', fileObj.type)
    if (
      !(
        fileObj.type === 'application/vnd.ms-excel' ||
        fileObj.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
    ) {
      this.setState({
        isLoading: false
      })
      message.error('File import không phải excel!')
      return false
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err)
      } else {
        let newRows = []
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== 'undefined') {
            newRows.push({
              key: index,
              name: row[0],
              age: row[1],
              gender: row[2]
            })
          }
        })
        if (newRows.length === 0) {
          // this.setState({
          //   errorMessage: 'No data found in file!'
          // })
          message.error('No data found in file!')

          return false
        } else {
          this.setState({
            cols: resp.cols,
            dataSource: newRows,
            errorMessage: null,
            isLoading: false
          })
        }
      }
    })
    return false
  }

  render() {
    // console.log('render', this.state.errorMessage)
    return (
      <PageReportEditWrapper>
        <div>
          <Upload
            accept='.xlsx'
            name='file'
            fileList={null}
            beforeUpload={this.fileHandler}
            onRemove={() => this.setState({ rows: [] })}
            multiple={false}
          >
            <Button>
              <Icon type='upload' /> Chọn file excel import
            </Button>
          </Upload>
        </div>
        {this.state.errorMessage && <Text type='danger'>{this.state.errorMessage}</Text>}
        <Clearfix height={8} />
        {this.state.isLoading && <Skeleton paragraph={{ rows: 7 }} />}
        <div>
          {!this.state.isLoading && (
            <Table
              rowKey={'key'}
              size='small'
              bordered
              // scroll={{ y: 700 }}
              dataSource={this.state.dataSource}
              columns={this.getColumn()}
              // pagination={{ position: 'bottom' }}
              pagination={{ ...this.state.pagination, position: 'bottom' }}
            />
          )}
        </div>
        <Clearfix height={16} />
        <Affix offsetBottom={20}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='primary' icon='save'>
              Cập nhật
            </Button>
          </div>
        </Affix>
      </PageReportEditWrapper>
    )
  }

  getColumn = () => {
    return [
      {
        title: 'name',
        dataIndex: 'name'
      },
      {
        title: 'age',
        dataIndex: 'age'
      },
      {
        title: 'gender',
        dataIndex: 'gender'
      }
    ]
  }
}

PageReportEdit.Layout = DefaultLayout
export default PageReportEdit
