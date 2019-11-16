import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Skeleton } from 'antd'
// import organizationApi from 'src/api/organizationApi'
// import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import ReactDataSheet from 'react-datasheet'
// import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'

const PageReportEditWrapper = styled.div`
  display: flex;

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

@connect(
  mapStateToProps,
  mapDispatchToProps
)
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
        { value: 'Column 1', readOnly: true },
        { value: 'Column 2', readOnly: true },
        { value: 'Column 3', readOnly: true },
        { value: 'Column 4', readOnly: true },
        { value: 'Column 5', readOnly: true }
      ],
      [{ readOnly: true, value: 1 }, { value: 1 }, { value: 3 }, { value: 3 }, { value: 3 }],
      [{ readOnly: true, value: 2 }, { value: 2 }, { value: 4 }, { value: 4 }, { value: 4 }],
      [{ readOnly: true, value: 3 }, { value: 1 }, { value: 3 }, { value: 3 }, { value: 3 }],
      [{ readOnly: true, value: 4 }, { value: 2 }, { value: 4 }, { value: 4 }, { value: 4 }]
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
    return (
      <PageReportEditWrapper>
        {/* {this.state.isLoading && <Skeleton paragraph={{ rows: 7 }} />} */}
        <ReactDataSheet
          data={this.state.grid}
          valueRenderer={cell => cell.value}
          onCellsChanged={changes => {
            const grid = this.state.grid.map(row => [...row])
            changes.forEach(({ cell, row, col, value }) => {
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
