import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import OtpInput from 'react-otp-input'
import Clearfix from 'src/components/elements/clearfix'
import windowSize from 'react-window-size'

const InputOTPWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 65px;

  div {
    height: 65px;
  }

  .input--number {
    text-align: center;
    max-width: 65px;
    width: 100% !important;
    height: ${props => (props.windowWidth >= 480 ? '100%' : 'auto')};
    max-height: 65px;
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

@windowSize
export default class InputOTP extends React.Component {
  static propTypes = {
    numInputs: PropTypes.number.isRequired,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    windowWidth: PropTypes.number
  }

  componentDidMount = () => {}

  state = {
    value: ''
  }

  hanldeOnChage = otp => {
    this.setState({
      value: otp
    })
    if (this.props.onChange) {
      this.props.onChange(otp)
    }

    if (this.props.numInputs === otp.length) {
      if (this.props.onSubmit) {
        this.props.onSubmit(otp)
      }
    }
  }
  render() {
    return (
      <InputOTPWrapper windowWidth={this.props.windowWidth}>
        <OtpInput
          onChange={this.hanldeOnChage}
          containerStyle={'otpWrapper'}
          inputStyle='input--number'
          numInputs={this.props.numInputs}
          value={this.state.value}
          separator={<Clearfix width={20} />}
          shouldAutoFocus={true}
        />
      </InputOTPWrapper>
    )
  }
}
