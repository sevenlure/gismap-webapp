import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import UserForm from 'src/containers/user/form.js'

const ManagerUserCreateWrapper = styled.div``

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class ManagerUserCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func
  }
  componentDidMount = () => {
    this.props.setBreadCrumb(breadcrumb[slug.manager.user.create])
    this.props.updateKeyPath([slug.manager.user.base])
  }
  render() {
    return (
      <ManagerUserCreateWrapper>
        <UserForm />
      </ManagerUserCreateWrapper>
    )
  }
}
ManagerUserCreate.Layout = DefaultLayout

export default ManagerUserCreate
