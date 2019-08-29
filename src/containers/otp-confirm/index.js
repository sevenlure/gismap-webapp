import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Typography } from 'antd'
import styled from 'styled-components'
import InputOTP from 'src/components/elements/input-OTP'
import Clearfix from 'src/components/elements/clearfix'
// import Router from 'next/router'
// import slug from 'src/routes'

const { Text } = Typography

const OtpConfirmWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`
const TIME_COUNT_DOWN = 60 // seconds
let intervalID = null
export default class OtpConfirm extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired
  }

  state = {
    isLoading: true,
    countDown: 0,
    isSend: false,
    numInputs: 4,
    messageError: ''
  }

  componentWillUnmount = () => {
    clearTimeout(intervalID)
  }

  resetCountDown = () => {
    clearTimeout(intervalID)
    this.setState({
      countDown: TIME_COUNT_DOWN,
      messageError: null,
      isLoading: false
    })
    intervalID = setInterval(this.runCountDown, 1000)
  }

  componentDidMount = () => {
    this.resetCountDown()
  }

  runCountDown = () => {
    this.setState(
      {
        countDown: this.state.countDown - 1
      },
      () => {
        if (this.state.countDown <= 0) {
          clearTimeout(intervalID)
          this.setState({
            isSend: true
          })
        }
      }
    )
  }

  handleResetOTP = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        const res = {
          success: true
        }
        if (res.success) {
          this.resetCountDown()
        }
      }
    )
  }

  hanldeSendOTP = value => {
    const res = {
      error: value === '1111' || value === '2222' ? false : true,
      message: 'Mã OTP không chính xác!',
      secret: 'ABCD'
    }
    if (res.error) {
      this.setState({
        messageError: res.message
      })
    } else if (value === '2222') {
      if (this.props.onSuccess)
        this.props.onSuccess({
          status: false,
          secret: res.secret
        })
    } else {
      if (this.props.onSuccess)
        this.props.onSuccess({
          status: true,
          secret: res.secret
        })
    }
  }

  hanldeOnChangeOTP = value => {
    if (value.length) {
      this.setState({
        isSend: true
      })
    }
  }

  render() {
    // console.log(this.state, 'countdown')
    return (
      <OtpConfirmWrapper>
        <Row>
          <Col xs={24} sm={24} lg={24} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <div>
              <span className='text-color-secondary'>
                Vui lòng nhập mã xác thực được gửi về số điện thoại bạn đã đăng ký.
              </span>
            </div>

            <Clearfix height={25} className='hide--on--xs' />
            <div style={{ height: 25, marginBottom: 4 }}>
              {this.state.messageError && <Text type='danger'>{this.state.messageError}</Text>}
            </div>
            {!this.state.isLoading && (
              <InputOTP
                numInputs={this.state.numInputs}
                onChange={this.hanldeOnChangeOTP}
                onSubmit={this.hanldeSendOTP}
              />
            )}

            <Clearfix height={30} />
            <span className='text-color-secondary'>
              Gửi lại mã xác thực sau <strong className='text-color-default'>{this.state.countDown} giây…</strong>
            </span>

            <div style={{ height: 32 }}>
              {this.state.isSend && (
                <Button onClick={this.handleResetOTP} type='link'>
                  <strong style={{ textDecoration: 'underline' }}>Gửi lại mã xác thực</strong>
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </OtpConfirmWrapper>
    )
  }
}
