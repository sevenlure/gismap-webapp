import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
// import Router from 'next/router'
import slug, { breadcrumb } from 'src/routes'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
import UserForm from 'src/containers/user/form.js'
import DefaultLayout from 'src/layout/default'

@connect(
  null,
  {
    setBreadCrumb,
    updateKeyPath
  }
)
class UserEdit extends React.Component {
  static propTypes = {
    _id: PropTypes.string,
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func
  }

  static getInitialProps = ({ query }) => {
    const { _id } = query
    return {
      _id
    }
  }

  state = {
    isLoadedForm: false,
    isLoading: false
  }

  async componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.manager.user.edit])
    this.props.updateKeyPath([slug.manager.user.base])
    console.log(this.props._id)
  }

  handleSubmit = async () => {
    // const dataForm = await this.UserForm.getFormData()
    // const { err, values } = dataForm
    // if (err) {
    //   this.setState({ isLoading: false })
    //   return
    // }
    // updateById(this.props._id, values)
    //   .then(() => {
    //     message.success('Cập nhật thành công')
    //     Router.push(slug.manager.user.list)
    //   })
    //   .catch(() => {
    //     this.setState({ isLoading: false })
    //   })
  }

  render() {
    return (
      <div>
        <Spin spinning={!this.state.isLoadedForm}>
          <UserForm isEdit />
        </Spin>
      </div>
    )
  }
}

UserEdit.Layout = DefaultLayout
export default UserEdit
