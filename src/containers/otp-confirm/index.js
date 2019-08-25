import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import InputOTP from 'src/components/elements/input-OTP'

const OtpConfirmWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

export default class OtpConfirm extends React.Component {
  static propTypes = {}

  state = {
    value: null
  }

  render() {
    return <OtpConfirmWrapper>
        <Row>
            <Col xs={24} sm={24} lg={24} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              <div>
                <span style={{ color: '#9ea7d0' }}>
                  Vui lòng nhập mã xác thực được gửi về số điện thoại bạn đã đăng ký.
                </span>
              </div>

              <Clearfix height={50} />
              <InputOTP numInputs={4} />
              <Clearfix height={30} />

              <span style={{ color: '#9ea7d0' }}>Gửi lại mã xác thực sau 59 giây…</span>
              {/* <Button type='link'>
                <strong style={{ textDecoration: 'underline' }}>Gửi lại mã xác thực</strong>
              </Button> */}
            </Col>
          </Row>
    </OtpConfirmWrapper>
  }
}
