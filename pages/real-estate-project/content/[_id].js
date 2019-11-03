import React from 'react'
import PropTypes from 'prop-types'
import { message, Form, Affix, Row, Col, Button } from 'antd'
import Router from 'next/router'
import slug, { breadcrumb } from 'src/routes'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
// import EditForm from 'src/containers/real-estate-project/form'
import DefaultLayout from 'src/layout/default'
// import UserApi from 'src/api/userApi'
import RealEstateProjectApi from 'src/api/RealEstateProjectApi'
import { get as _get, pick as _pick } from 'lodash-es'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'

import dynamic from 'next/dynamic'
const EditorCustom = dynamic(() => import('src/components/elements/editor'), {
  ssr: false
})

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
    form: PropTypes.any,
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
    initialValue: null,
    Title: ''
  }

  componentDidMount = async () => {
    this.props.updateBackgroundColor('#fff')
    this.props.setBreadCrumb(breadcrumb[slug.project.content])
    this.props.updateKeyPath([slug.project.base])

    try {
      const res = await RealEstateProjectApi.getById(this.props._id)
      if (res.status === 200) {
        const data = _get(res, 'data', null)
        this.setState({
          initialValue: _pick(data, ['TongQuan']),
          Title: _get(data, 'Name', '')
        })
      }
    } catch (ex) {
      const { response } = ex
      // console.log('catch', response)
      getInfoErrorfetch(response)
    } finally {
      this.setState(
        {
          isLoading: false
        },
        () => {
          this.props.form.resetFields()
          const { setFieldsValue } = this.props.form
          // console.log("setFieldsValue", this.state.initialValue)
          setFieldsValue({
            ...this.state.initialValue
          })
        }
      )
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      console.log('Received values of form: ', values, err)
      if (!err) {
        // console.log('Received values of form: ', {
        //   ...values
        // })

        try {
          const res = await RealEstateProjectApi.updateById(this.props._id, {
            TongQuan: values.TongQuan,
            Name: this.state.Title
          })
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
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    // console.log(this.state, 'initialValue')
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {!this.state.isLoading && (
            <div>
              <Row>
                <Col>
                  <h2>{this.state.Title}</h2>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={24}>
                  <Form.Item label='Nội dung'>
                    {getFieldDecorator('TongQuan', {
                      rules: [{ required: true, message: 'Vui lòng nhập nội dung' }]
                    })(<EditorCustom />)}
                  </Form.Item>
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
            </div>
          )}
        </Form>
      </div>
    )
  }
}

RealEstateProjectEdit.Layout = DefaultLayout
export default Form.create({})(RealEstateProjectEdit)
