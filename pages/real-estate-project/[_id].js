import React from 'react'
import PropTypes from 'prop-types'
import { message } from 'antd'
import Router from 'next/router'
import slug, { breadcrumb } from 'src/routes'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import EditForm from 'src/containers/real-estate-project/form'
import DefaultLayout from 'src/layout/default'
// import UserApi from 'src/api/userApi'
import RealEstateProjectApi from 'src/api/RealEstateProjectApi'
import { get as _get } from 'lodash-es'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'

@connect(
  null,
  {
    setBreadCrumb,
    updateKeyPath,
    updateBackgroundColor
  }
)
class RealEstateProjectEdit extends React.Component {
  static propTypes = {
    _id: PropTypes.string,
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func,
    updateBackgroundColor: PropTypes.func
  }

  static getInitialProps = ({ query }) => {
    const { _id } = query
    return {
      _id
    }
  }

  state = {
    isLoading: true,
    initialValue: null
  }

  componentDidMount = async () => {
    this.props.updateBackgroundColor('#fff')
    this.props.setBreadCrumb(breadcrumb[slug.project.edit])
    this.props.updateKeyPath([slug.project.base])
    try {
      const res = await RealEstateProjectApi.getById(this.props._id)
      if (res.status === 200) {
        this.setState({
          initialValue: _get(res, 'data', null)
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

  hanldeOnSubmit = async values => {
    // console.log('hanldeOnSubmit', values)
    try {
      const res = await RealEstateProjectApi.updateById(this.props._id, values)
      if (res.status === 200) {
        message.success('Cập nhật thành công!')
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
    return (
      <div>
        {!this.state.isLoading && (
          <EditForm onSubmit={this.hanldeOnSubmit} isEdit initialValue={this.state.initialValue} />
        )}
      </div>
    )
  }
}

RealEstateProjectEdit.Layout = DefaultLayout
export default RealEstateProjectEdit
