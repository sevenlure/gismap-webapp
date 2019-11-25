import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { message } from 'antd'
import Button from 'src/components/elements/button'
import InfoPolicyForm from './info-form'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { createInfoPolicy } from 'src/api/PolicyApi.js'

const PolicyCreateWrapper = styled.div`
  flex: 1;
  .modal--title {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
class InfoPolicyCreate extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    PolicyInfoGroupKey: PropTypes.string.isRequired
  }

  hanldeOnSubmit = async values => {
    try {
      const res = await createInfoPolicy({
        PolicyInfoGroup: this.props.PolicyInfoGroupKey,
        ...values
      })
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
    // console.log(this.props, 'render')
    return (
      <PolicyCreateWrapper>
        <div className='modal--title'>
          <h3 style={{ marginBottom: 0 }}>Thêm chính sách công ty</h3>
          <Button style={{ width: 88, float: 'right' }} onClick={this.props.onCancel} size='large' type='default'>
            Đóng
          </Button>
        </div>
        <InfoPolicyForm onSubmit={this.hanldeOnSubmit} />
      </PolicyCreateWrapper>
    )
  }
}

export default InfoPolicyCreate
