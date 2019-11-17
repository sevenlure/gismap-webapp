import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Skeleton } from 'antd'
// import organizationApi from 'src/api/organizationApi'
// import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import ReactDataSheet from 'react-datasheet'
import 'react-datasheet/lib/react-datasheet.css'

// import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'

const PageReportEditWrapper = styled.div`
  display: flex;
  .table-custom {
    .cell {
      padding: 8px 8px;
    }
    .data-editor {
      padding: 8px 0px;
    }
  }

  .image {
    max-height: 300px;
    display: flex;
  }
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
    isLoading: true,
    grid: [
      [
        { value: 'STT', readOnly: true },
        { value: 'Họ và tên', readOnly: true },
        { value: 'Doanh thu', readOnly: true },
        { value: 'Ngày tính doanh thu', readOnly: true }
      ],
      [{ readOnly: true, value: 1 }, { value: 'Mai Thuận Thảo' }, { value: '200,000,000' }, { value: '15/11/2019' }],
      [{ readOnly: true, value: 2 }, { value: 'Dương Tấn Phất' }, { value: '200,000,000' }, { value: '15/11/2019' }],
    ]
  }

  componentDidMount = async () => {
    const pathPage = slug.report.edit
    this.props.updateBackgroundColor('#fff')
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
  }

  render() {
    // console.log('render', this.state.dataSource)
    // const columns = this.props.getColumnsFromSomewhere()
    return (
      <PageReportEditWrapper>
        {/* {this.state.isLoading && <Skeleton paragraph={{ rows: 7 }} />} */}
        <ReactDataSheet
          className='table-custom'
          data={this.state.grid}
          valueRenderer={cell => cell.value}
          onCellsChanged={changes => {
            const grid = this.state.grid.map(row => [...row])
            changes.forEach(({ cell, row, col, value }) => {
              console.log(value, '222')
              grid[row][col] = { ...grid[row][col], value }
            })
            this.setState({ grid })
          }}
        />
      </PageReportEditWrapper>
    )
  }
}

PageReportEdit.Layout = DefaultLayout
export default PageReportEdit
