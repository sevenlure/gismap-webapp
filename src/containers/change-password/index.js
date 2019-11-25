import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { message } from 'antd'
import { get as _get } from 'lodash-es'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import Form from './form'
import userApi from 'src/api/userApi'
import AuthApi from 'src/api/authApi'
import Button from 'src/components/elements/button'

const PolicyEditWrapper = styled.div`
  flex: 1;
  .modal--title {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
class Edit extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    initialData: PropTypes.object.isRequired,
    rule: PropTypes.object,
    isUser: PropTypes.bool
  }

  state = {
    isLoading: true
  }

  componentDidMount = () => {
    this.setState({
      isLoading: false
    })
  }

  hanldeOnSubmit = async values => {
    // console.log(values, 'hanldeOnSubmit')
    const key = _get(this.props.initialData, '_id', null)
    if (!key) return

    try {
      let res
      if (this.props.isUser) {
        res = await userApi.changePassWord(key, {
          ...values
        })
      } else {
        //nếu thêm mới thì _id cjinhs là của User
        res = await AuthApi.changePassWord({
          ...values
        })
      }

      //   console.log('data update', res)
      if (res.status === 200) {
        message.success('Cập nhật thành công!')
        if (this.props.onSuccess) this.props.onSuccess()
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

  render() {
    // console.log(this.props.dataSource, 'dataSource')
    return (
      <PolicyEditWrapper>
        <div className='modal--title'>
          <h3 style={{ marginBottom: 0 }}>Đổi mật khẩu {_get(this.props.initialData, 'FullName', '')}</h3>
          <Button style={{ width: 88, float: 'right' }} onClick={this.props.onCancel} size='large' type='default'>
            Đóng
          </Button>
        </div>
        {!this.state.isLoading && <Form rule={this.props.rule} onSubmit={this.hanldeOnSubmit} />}
      </PolicyEditWrapper>
    )
  }
}

export default Edit
