import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import UserForm from 'src/containers/user/form.js'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import UserApi from 'src/api/userApi'
import { message } from 'antd'
import Router from 'next/router'

const ManagerUserCreateWrapper = styled.div``

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
class ManagerUserCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func,
    updateBackgroundColor: PropTypes.func
  }
  componentDidMount = () => {
    this.props.updateBackgroundColor('#fff')
    this.props.setBreadCrumb(breadcrumb[slug.manager.user.create])
    this.props.updateKeyPath([slug.manager.user.base])
  }
  hanldeOnSubmit = async values => {
    // console.log('hanldeOnSubmit', values)
    try {
      const res = await UserApi.create(values)
      if (res.status === 200) {
        message.success('Tạo thành công!')
        Router.push(slug.manager.user.list)
      }
    } catch (ex) {
      console.log(ex)
      const { response } = ex
      // console.log('catch', response)
      getInfoErrorfetch(response)
    }
  }
  render() {
    return (
      <ManagerUserCreateWrapper>
        <UserForm onSubmit={this.hanldeOnSubmit} />
      </ManagerUserCreateWrapper>
    )
  }
}
ManagerUserCreate.Layout = DefaultLayout

export default ManagerUserCreate
