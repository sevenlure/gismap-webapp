import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Icon, Button, Upload, message, Avatar, Row, Col, Modal } from 'antd'
import PersonalSvg from 'static/images/icon/ic-personal.svg'
import EmaillSvg from 'static/images/icon/ic-email.svg'
import MobileSvg from 'static/images/icon/ic-mobile.svg'
import Icons from 'icons/index'
import AddressSvg from 'static/images/icon/ic-address.svg'
import Clearfix from 'src/components/elements/clearfix'
// import { EditUserUser } from 'src/api/authApi'
import { get as _get, pick as _pick } from 'lodash-es'
import { connect } from 'react-redux'
import { auth as authMess } from 'src/config/message'
import icons from 'icons/index'
import { setVisibleEdituser } from 'src/redux/actions/generalAction'
import { updateUserInfo } from 'src/redux/actions/generalAction'
import { UpdateUserInfo as UpdateUserInfoApi, UpdatePasswordUserWithToken } from 'src/api/authApi'
import posed from 'react-pose'
import Cleave from 'cleave.js'
import Router from 'next/router'
import slug from 'src/routes'

const ChangePassWrapper = posed.div({
  enter: { height: 'auto', opacity: 1, marginBottom: 0 },
  exit: { opacity: 0, height: '0px', marginBottom: 0 }
})

const registerMess = authMess.register

const EditUserWrapper = styled.div`
  flex: 1;
  .modal--title {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  // NOTE
  .page--content {
    display: flex;

    .ant-upload {
      width: 100%;
    }
    .page--content--icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      .avatar__border {
        height: 74px;
        width: 74px;
        position: relative;
        background: conic-gradient(#fff, #dde8fc, #3880ff);
        padding: 3px;
        border-radius: 50%;
      }
      .avatar__icon {
        cursor: pointer;
        width: 36px;
        height: 36px;
        background-color: #f2f3f7;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }
    }
    .page--content--form {
    }
  }

  // NOTE
  .ant-form-item-with-help {
    // margin-bottom: 0px;
  }
  .form--button {
    text-align: center;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    button {
      max-width: 194px;
      height: 100%;
    }
  }
`

const mapStateToProps = state => ({
  isAuthenticated: _get(state, 'AuthStore.isAuthenticated'),
  userInfo: _get(state, 'GeneralStore.userInfo', '')
})
const mapDispatchToProps = {
  setVisibleEdituser,
  updateUserInfo
}
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class EditUser extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    windowWidth: PropTypes.number,
    setVisibleEdituser: PropTypes.func,
    updateUserInfo: PropTypes.func,
    userInfo: PropTypes.object,
    isAuthenticated: PropTypes.bool
  }

  state = {
    isChangePass: false,
    isLoadingImage: false,
    imageURL: '/static/images/avatar_default.png'
  }

  componentDidMount() {
    const { setFieldsValue } = this.props.form
    new Cleave('#phone', {
      numericOnly: true,
      delimiter: ' ',
      blocks: [3, 3, 4],
      onValueChanged: ({ target }) => {
        const value = _get(target, 'value', '')
        setFieldsValue({ phone: value })
      }
    })
  }

  handleChangePassWord = () => {
    this.setState({
      isChangePass: true
    })
  }
  handleCancelChangePassWord = () => {
    this.setState({
      isChangePass: false
    })
    this.props.form.resetFields()
  }
  handleOnChangeImage = info => {
    // console.log(info.file.status, 'info.file.status')
    if (info.file.status === 'uploading') {
      console.log('uploading', info.file, info.fileList)
      this.setState({ isLoadingImage: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({ isLoadingImage: false })
      // console.log(info.file.response.url,"info")
      // this.setState({
      //   imageURL: info.file.response.url
      // })
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      this.setState({ isLoadingImage: false })
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const phone = _get(values, 'phone', '').replace(/ /g, '')
        if (!this.state.isChangePass) {
          try {
            const data = _pick({ ...values, phone }, ['email', 'name', 'phone', 'address'])
            const token = this.props.userInfo.phone
            const res = await UpdateUserInfoApi(data, token)
            if (res.status === 200) {
              message.success(`Cập nhật thành công`)
              this.props.updateUserInfo(res.data)
              this.props.setVisibleEdituser(false)
            }
          } catch (ex) {
            message.error(authMess.updateFail)
          }
        } else {
          try {
            const data = _pick(values, ['oldPassword', 'newPassword'])
            const token = this.props.userInfo.phone
            const res = await UpdatePasswordUserWithToken(data, token)
            if (res.status === 200) {
              Modal.info({
                title: 'Thông báo',
                content: (
                  <div>
                    <p>Quý khách đã thay đổi mật khẩu thành công. Mời Quý khách quay trở lại để thực hiện mua vé.</p>
                  </div>
                ),
                okText: 'Đóng',
                onOk() {
                  Router.push(slug.basic)
                }
              })
              this.props.setVisibleEdituser(false)
            }
          } catch (ex) {
            // console.log(ex.response.data, 'ABC')
            if (ex.response.data.code === 'Unauthorized') {
              this.props.form.setFields({
                oldPassword: {
                  value: values.oldPassword,
                  errors: [new Error(ex.response.data.message)]
                }
              })
            } else {
              message.error(authMess.updateFail)
            }
          }
        }
      }
    })
  }

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('Chọn tập tin định dạng JPG/PNG!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Dung lượng hình ảnh không được lớn hơn 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  render() {
    // console.log(this.state.isChangePass, 'isChangePass')
    const { getFieldDecorator, getFieldValue, getFieldsError } = this.props.form
    const { windowWidth, userInfo } = this.props
    let titleStyle = {
      marginBottom: 0
    }
    if (windowWidth < 576) {
      // console.log(windowWidth, 'windowWidth')
      titleStyle = {
        ...titleStyle,
        fontSize: '1.2rem'
      }
    }
    return (
      <EditUserWrapper>
        <div className='modal--title'>
          <h3 style={{ ...titleStyle }}>Chỉnh sửa thông tin</h3>
          <Button
            style={{ width: 88 }}
            onClick={() => {
              this.props.form.resetFields()
              this.props.setVisibleEdituser(false)
            }}
            size='large'
            type='default'
          >
            Đóng
          </Button>
        </div>
        <div className='page--content'>
          <Row type='flex' style={{ flex: 1 }}>
            <Col style={{ paddingRight: 40 }} xs={24} sm={3} lg={3}>
              <div className='page--content--icon'>
                {!this.state.isLoadingImage && (
                  <div className='avatar__border'>
                    <Avatar src={this.state.imageURL} style={{ width: '100%', height: '100%' }} />
                  </div>
                )}
                {this.state.isLoadingImage && (
                  <Icon style={{ fontSize: '4.625rem' }} type={this.state.loading ? 'loading' : 'loading'} />
                )}

                <Clearfix height={10} />
                <Upload
                  style={{ width: '100%' }}
                  beforeUpload={this.beforeUpload}
                  name='file'
                  action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                  headers={{
                    authorization: 'authorization-text'
                  }}
                  showUploadList={false}
                  onChange={this.handleOnChangeImage}
                >
                  <div className='avatar__icon'>
                    <div>
                      <Icon style={{ fontSize: '1.5rem' }} component={Icons.camera} />
                    </div>
                  </div>
                </Upload>
                <Clearfix height={10} />
              </div>
            </Col>
            {/* <Clearfix width={33} height={12} /> */}
            <Col xs={24} sm={21} lg={21}>
              <Form className='page--content--form' onSubmit={this.handleSubmit}>
                <Form.Item>
                  {getFieldDecorator('name', {
                    initialValue: _get(userInfo, 'name'),
                    rules: [
                      {
                        validator: (rule, value, callback) => {
                          const mess = registerMess.fullname
                          if (!value) return callback(mess)
                          /* eslint-disable */
                          const isValidPattern = /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<,>.?๐฿]{5,30}$/.test(value)
                          /* eslint-enable */

                          if (!isValidPattern) return callback(mess)

                          const tamp = value.split(' ')
                          if (tamp.length < 2) return callback(mess)

                          if (!tamp[1]) return callback(mess)

                          callback()
                        }
                      }
                    ]
                  })(
                    <Input
                      disabled={this.state.isChangePass}
                      size='large'
                      maxLength={30}
                      prefix={<Icon component={PersonalSvg} />}
                      placeholder='Họ và tên *'
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('phone', {
                    initialValue: _get(userInfo, 'phone'),
                    rules: [
                      { required: true, message: registerMess.phoneRequired },
                      // {
                      //   pattern: /^[0-9]*$/,
                      //   message: registerMess.phoneOnlyNumber
                      // },
                      { min: 10, max: 13, message: registerMess.phoneLen }
                    ]
                  })(
                    <Input
                      disabled={this.state.isChangePass}
                      size='large'
                      maxLength={13}
                      prefix={<Icon component={MobileSvg} />}
                      placeholder='Số điện thoại *'
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('email', {
                    initialValue: _get(userInfo, 'email'),
                    rules: [
                      {
                        required: true,
                        message: registerMess.emailRequired
                      },
                      {
                        // type: 'email',
                        pattern: /^.{5,}@.{2,}\..{2,}/,
                        message: registerMess.emailValid
                      }
                    ]
                  })(
                    <Input
                      disabled={this.state.isChangePass}
                      size='large'
                      prefix={<Icon component={EmaillSvg} />}
                      placeholder='Email *'
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('address', {
                    initialValue: _get(userInfo, 'address'),
                    rules: [
                      {
                        required: true,
                        message: registerMess.addressRequired
                      },
                      {
                        min: 10,
                        max: 200,
                        message: registerMess.addressLen
                      }
                    ]
                  })(
                    <Input
                      disabled={this.state.isChangePass}
                      size='large'
                      maxLength={200}
                      prefix={<Icon component={AddressSvg} />}
                      placeholder='Địa chỉ sinh sống'
                    />
                  )}
                </Form.Item>

                <ChangePassWrapper key='ChangePassword' pose={this.state.isChangePass ? 'enter' : 'exit'}>
                  {/* {this.state.isChangePass && ( */}
                  <div>
                    <Clearfix height={20} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ fontWeight: 'bold' }}>Đổi mật khẩu</strong>
                      </div>
                      <div>
                        <Button
                          onClick={this.handleCancelChangePassWord}
                          style={{ padding: '0px 22px' }}
                          type='default'
                          block={true}
                        >
                          Hủy
                        </Button>
                      </div>
                    </div>
                    <Clearfix height={20} />
                    <Form.Item>
                      {getFieldDecorator('oldPassword', {
                        rules: [
                          { required: this.state.isChangePass, message: registerMess.passwordRequired },
                          { min: 8, message: registerMess.passwordMin },
                          { max: 32, message: registerMess.passwordMax }
                        ]
                      })(
                        <Input.Password
                          size='large'
                          maxLength={32}
                          autoComplete='new-password'
                          prefix={<Icon component={icons.password} />}
                          placeholder='Mật khẩu cũ *'
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('newPassword', {
                        rules: [
                          { required: this.state.isChangePass, message: registerMess.passwordRequired },
                          { min: 8, message: registerMess.passwordMin },
                          { max: 32, message: registerMess.passwordMax }
                        ]
                      })(
                        <Input.Password
                          size='large'
                          maxLength={32}
                          autoComplete='new-password'
                          prefix={<Icon component={icons.password} />}
                          placeholder='Mật khẩu mới *'
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('confirm', {
                        rules: [
                          {
                            required: this.state.isChangePass,
                            message: registerMess.passwordConfirmRequied
                          },

                          {
                            validator: this.compareToFirstPassword
                          }
                        ]
                      })(
                        <Input.Password
                          size='large'
                          maxLength={32}
                          autoComplete='new-password'
                          prefix={<Icon component={icons.password} />}
                          placeholder='Nhập lại mật khẩu mới *'
                        />
                      )}
                    </Form.Item>
                  </div>
                </ChangePassWrapper>

                <Clearfix height={windowWidth < 576 ? 16 : 40} />
                <div className='form--button'>
                  {!this.state.isChangePass && (
                    <Button type='default' block={true} size='large' onClick={this.handleChangePassWord}>
                      Đổi mật khẩu
                    </Button>
                  )}

                  <Clearfix width={24} />
                  <Button
                    disabled={
                      (this.state.isChangePass ? !getFieldValue('oldPassword') : !getFieldValue('name')) ||
                      this.hasErrors(getFieldsError())
                    }
                    type='primary'
                    htmlType='submit'
                    block={true}
                    size='large'
                  >
                    Cập nhật
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </EditUserWrapper>
    )
  }
  hasErrors = fieldsError => {
    // console.log(fieldsError, 'fieldsError')
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('newPassword')) {
      callback(registerMess.comparePassword)
    } else {
      callback()
    }
  }
}

export default Form.create({})(EditUser)
