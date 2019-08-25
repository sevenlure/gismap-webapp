import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import OtpInput from 'react-otp-input'
import Clearfix from 'src/components/elements/clearfix'

const InputOTPWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  .input--number {
    text-align: center;
    width: 65px !important;
    height: 65px;
    border-width: 0px;
    border-radius: 10px;
    background-color: #f2f3f7;
    font-size: 2rem;
    color: white;
  }
  .input--number:not([value='']),
  .input--number:focus {
    background-color: #3880ff;
    outline: 0px;
  }
`

export default class InputOTP extends React.Component {
  static propTypes = {
    numInputs: PropTypes.number.isRequired
  }
  state = {
    value: null
  }

  hanldeOnChage = otp => {
    console.log(otp, 'otp')
    this.setState({
      value: otp
    })
  }
  render() {
    return (
      <InputOTPWrapper>
        <OtpInput
          onChange={this.hanldeOnChage}
          containerStyle={'otpWrapper'}
          inputStyle='input--number'
          numInputs={this.props.numInputs}
          value={this.state.value}
          separator={<Clearfix width={20} />}
        />
      </InputOTPWrapper>
    )
  }
}
