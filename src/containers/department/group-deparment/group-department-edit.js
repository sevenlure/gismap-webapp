import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, message } from 'antd'
import { get as _get } from 'lodash-es'
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
class GroupDepartmentEdit extends React.Component {
  static propTypes = {
    // DepartmentKey: PropTypes.string.isRequired,
    initialData: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func
  }

  state = {
    key: null
  }

  componentDidMount = () => {
    this.setState({
      key: _get(this.props, 'initialData._id', '')
    })
  }

  hanldeOnSubmit = async values => {
    console.log('hanldeOnSubmit', values)

    try {
      const res = await GroupApi.updateGroup(this.state.key, {
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
    }
  }

  render() {
    // console.log(this.props, 'render')
    return (
      <PolicyCreateWrapper>
        <div className='modal--title'>
          <h3 style={{ marginBottom: 0 }}>Thêm nhóm</h3>
          <Button style={{ width: 88 }} onClick={this.props.onCancel} size='large' type='default'>
            Đóng
          </Button>
        </div>
        <GroupDepartmentForm initialData={this.props.initialData} isEdit={true} onSubmit={this.hanldeOnSubmit} />
      </PolicyCreateWrapper>
    )
  }
}

export default GroupDepartmentEdit
