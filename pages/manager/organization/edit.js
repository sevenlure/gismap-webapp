import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Skeleton, message } from 'antd'
import organizationApi from 'src/api/organizationApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import OrganizationForm from 'src/containers/organization/form.js'
import Router from 'next/router'

const ManagerOrganizationEditWrapper = styled.div`
  display: flex;

  .image {
    max-height: 300px;
    display: flex;
  }
`

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class ManagerOrganizationEdit extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func
  }
  state = {
    isLoading: true,
    dataSource: null
  }

  getInitial = async () => {
    try {
      const res = await organizationApi.getInfo()
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

  componentDidMount = async () => {
    const pathPage = slug.manager.organization.edit
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
    this.getInitial()
  }
  hanldeOnSubmit = async values => {
    // console.log('hanldeOnSubmit', values)
    try {
      const res = await organizationApi.updateInfo(values)
      if (res.status === 200) {
        message.success('Cập nhật thành công!')
        Router.push(slug.manager.organization.base)
      }
    } catch (ex) {
      console.log(ex)
      const { response } = ex
      // console.log('catch', response)
      getInfoErrorfetch(response)
    }
  }

  render() {
    // console.log('render', this.state.dataSource)
    return (
      <ManagerOrganizationEditWrapper>
        {this.state.isLoading && <Skeleton paragraph={{ rows: 7 }} />}
        {!this.state.isLoading && (
          <OrganizationForm onSubmit={this.hanldeOnSubmit} initialValue={this.state.dataSource} />
        )}
      </ManagerOrganizationEditWrapper>
    )
  }
}

ManagerOrganizationEdit.Layout = DefaultLayout
export default ManagerOrganizationEdit