import React from 'react'
import PropTypes from 'prop-types'
import { message, Form, Affix, Row, Col, Button } from 'antd'
import Router from 'next/router'
import slug, { breadcrumb } from 'src/routes'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
// import EditForm from 'src/containers/real-estate-project/form'
import DefaultLayout from 'src/layout/default'
// import UserApi from 'src/api/userApi'
import RealEstateProjectApi from 'src/api/RealEstateProjectApi'
import { get as _get } from 'lodash-es'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'

import dynamic from 'next/dynamic'
const EditorCustom = dynamic(() => import('src/components/elements/editor'), {
  ssr: false
})

@connect(
  null,
  {
    setBreadCrumb,
    updateKeyPath
  }
)
class RealEstateProjectEdit extends React.Component {
  static propTypes = {
    _id: PropTypes.string,
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func,
    form: PropTypes.any
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
    this.props.setBreadCrumb(breadcrumb[slug.project.content])
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

  handleSubmit = async e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      console.log('Received values of form: ', values)
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
    // try {
    //   const res = await RealEstateProjectApi.updateById(this.props._id, values)
    //   if (res.status === 200) {
    //     message.success('Cập nhật thành công!')
    //     Router.push(slug.project.list)
    //   }
    // } catch (ex) {
    //   console.log(ex)
    //   const { response } = ex
    //   // console.log('catch', response)
    //   getInfoErrorfetch(response)
    // }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    // console.log(this.state.initialValue, 'initialValue')
    return (
      <div>
        {!this.state.isLoading && (
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label='Nội dung'>{getFieldDecorator('TongQuan', {})(<EditorCustom />)}</Form.Item>
              </Col>
            </Row>
            <Affix offsetBottom={20}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  loading={this.state.isLoading}
                  size='large'
                  style={{ marginRight: 8, width: 120 }}
                  type='primary'
                  htmlType='submit'
                >
                  Cập nhật
                </Button>
              </div>
            </Affix>
          </Form>
        )}
      </div>
    )
  }
}

RealEstateProjectEdit.Layout = DefaultLayout
export default Form.create({})(RealEstateProjectEdit)
