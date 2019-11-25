import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { message } from 'antd'
import Button from 'src/components/elements/button'
import GroupDepartmentForm from './group-department-form'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import GroupApi from 'src/api/GroupApi'

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
    DepartmentKey: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    dataSource: PropTypes.object.isRequired
  }

  hanldeOnSubmit = async values => {
    console.log('hanldeOnSubmit', values)
    try {
      const res = await GroupApi.createGroup({
        Department: this.props.DepartmentKey,
        ...values
      })
      //   console.log('data update', res)
      if (res.status === 200) {
        message.success('Tạo thành công!')
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
          <h3 style={{ marginBottom: 0 }}>Thêm nhóm</h3>
          <Button style={{ width: 88, float: 'right' }} onClick={this.props.onCancel} size='large' type='default'>
            Đóng
          </Button>
        </div>
        <GroupDepartmentForm
          initialData={{
            Department: this.props.DepartmentKey
          }}
          isEdit={false}
          onSubmit={this.hanldeOnSubmit}
        />
      </PolicyCreateWrapper>
    )
  }
}

export default InfoPolicyCreate
