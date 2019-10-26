import React from 'react'
import PropTypes from 'prop-types'
import { message } from 'antd'
import Router from 'next/router'
import slug, { breadcrumb } from 'src/routes'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
import EditForm from 'src/containers/real-estate-project/form'
import DefaultLayout from 'src/layout/default'
// import UserApi from 'src/api/userApi'
import RealEstateProjectApi from 'src/api/RealEstateProjectApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'

@connect(
  null,
  {
    setBreadCrumb,
    updateKeyPath
  }
)
class RealEstateProjectCreate extends React.Component {
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
    isLoading: false,
    initialValue: null
  }

  componentDidMount = async () => {
    this.props.setBreadCrumb(breadcrumb[slug.project.create])
    this.props.updateKeyPath([slug.project.base])
  }

  hanldeOnSubmit = async values => {
    // console.log('hanldeOnSubmit', values)
    try {
      const res = await RealEstateProjectApi.create(values)
      if (res.status === 200) {
        message.success('Thêm mới thành công!')
        Router.push(slug.project.list)
      }
    } catch (ex) {
      console.log(ex)
      const { response } = ex
      // console.log('catch', response)
      getInfoErrorfetch(response)
    }
  }

  render() {
    // console.log(this.state.initialValue, 'initialValue')
    return <div>{!this.state.isLoading && <EditForm onSubmit={this.hanldeOnSubmit} />}</div>
  }
}

RealEstateProjectCreate.Layout = DefaultLayout
export default RealEstateProjectCreate
