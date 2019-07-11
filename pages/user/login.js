import React from 'react'
import { Form, Input, Icon, Button, Layout } from 'antd'
import styled from 'styled-components'
import Clearfix from 'src/components/elements/clearfix'
import authApi from 'src/api/authApi'
import { connect } from 'react-redux'

import { userLogin } from 'src/redux/actions/authAction'

import { get as _get } from 'lodash'
import Router from 'next/router'
import slug from 'src/routes'

const { Footer } = Layout

const CardCenter = styled.div`
  left: 50%;
  top: 35%;
  position: fixed;
  transform: translate(-50%, -50%);
`

const Container = styled.div`
  width: 368px;
`

const Center = styled.div`
  display: flex;
  height: 44px;
  line-height: 44;
  align-items: center;
  justify-content: center;
`

const mapStateToProps = state => ({
  // a: state.menu
})
const mapDispatchToProps = {
  userLogin
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
export default class Login extends React.Component {
  state = {
    isLoading: false
  }
  componentDidMount() {
    console.log('fdsaf',sss)
    
  }

  hanldeSubmit = () => {
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        this.setState({
          isLoading: true
        })

        setTimeout(() => {
          authApi
            .login(values)
            .then(res => {
              // console.log("API",data)
              this.props.userLogin(_get(res, 'data', null))
              Router.replace(slug.basic)
              console.log(this.props)
            })
            .catch(e => {
              const { response } = e
              console.log('catch', e)
            })
            .finally(() => {
              this.setState({
                isLoading: false
              })
            })
        }, 500)

        // console.log(res)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Layout
          style={{
            width: '100%',
            height: '100vh',
            backgroundImage: `url("/static/images/background.svg")`,
            backgroundRepeat: 'no-repeat'
          }}
        >
          <CardCenter>
            <Center style={{ marginBottom: 8 }}>
              <img style={{ width: 44, height: 44, marginRight: 16 }} src='/static/images/logo.png' />
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 33,
                  color: 'rgba(0,0,0,.85)'
                }}
              >
                Hồ Chí Minh
              </span>
            </Center>
            <Center
              style={{
                color: 'rgba(0,0,0,.45)',
                fontSize: 14
              }}
            >
              Waste Source Management System - Hồ Chí Minh
            </Center>

            <Container>
              <Form.Item>
                {getFieldDecorator('Email', {
                  rules: [
                    { required: true, message: 'Vui lòng nhập!' },
                    {
                      type: 'email',
                      message: 'Vui lòng nhập địa chỉ E-mail!'
                    }
                  ]
                })(
                  <Input
                    size='large'
                    placeholder='Email'
                    prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                )}
              </Form.Item>
              <Clearfix height={8} />
              <Form.Item>
                {getFieldDecorator('Password', {
                  rules: [{ required: true, message: 'Vui lòng nhập!' }]
                })(
                  <Input.Password
                    size='large'
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='input password'
                  />
                )}
              </Form.Item>
              <Clearfix height={8} />
              <Button loading={this.state.isLoading} type='primary' block onClick={this.hanldeSubmit}>
                Login
              </Button>
            </Container>

            <Footer style={{ textAlign: 'center' }}>App ©2019 Created by VietAn Software</Footer>
          </CardCenter>
        </Layout>
      </Form>
    )
  }
}
