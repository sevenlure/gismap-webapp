import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {  message } from 'antd'
import Button from 'src/components/elements/button'
import { get as _get } from 'lodash-es'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import DepartmentForm from './form'
import { updateDepartmentById } from 'src/api/DepartmentApi.js'

const PolicyEditWrapper = styled.div`
  flex: 1;
  .modal--title {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
class GroupPolicyEdit extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    dataSource: PropTypes.object.isRequired
  }

  state = {
    Departmentkey: null,
    isLoading: true
  }

  componentDidMount = () => {
    this.setState({
      Departmentkey: _get(this.props.dataSource, '_id', null),
      isLoading: false
    })
  }

  hanldeOnSubmit = async values => {
    const key = _get(this.props.dataSource, '_id', null)
    if (!key) return

    try {
      const res = await updateDepartmentById(key, values)
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
          <h3 style={{ marginBottom: 0 }}>Cập nhật phòng ban</h3>
          <Button style={{ width: 88 }} onClick={this.props.onCancel} size='large' type='default'>
            Đóng
          </Button>
        </div>
        {!this.state.isLoading && (
          <DepartmentForm
            isEdit={true}
            Departmentkey={this.state.Departmentkey}
            initialData={this.props.dataSource}
            onSubmit={this.hanldeOnSubmit}
          />
        )}
      </PolicyEditWrapper>
    )
  }
}

export default GroupPolicyEdit
