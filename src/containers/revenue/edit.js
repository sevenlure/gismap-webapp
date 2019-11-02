import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, message } from 'antd'
import { get as _get } from 'lodash-es'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import Form from './form'
import reportApi from 'src/api/reportApi'

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
    initialData: PropTypes.object.isRequired
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
    console.log(values, 'hanldeOnSubmit')
    const key = _get(this.props.initialData, '_id', null)
    const actionUpdate = _get(this.props.initialData, 'DateRevenue', null) ? true : false
    if (!key) return

    try {
      let res
      if (actionUpdate) {
        res = await reportApi.updateById(key, {
          ...values,
          ByUser: _get(this.props.initialData, 'User._id', null)
        })
      } else {
        //nếu thêm mới thì _id cjinhs là của User
        res = await reportApi.create({
          ...values,
          ByUser: _get(this.props.initialData, '_id', null)
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
          <h3 style={{ marginBottom: 0 }}>Cập nhật doanh thu</h3>
          <Button style={{ width: 88 }} onClick={this.props.onCancel} size='large' type='default'>
            Đóng
          </Button>
        </div>
        {!this.state.isLoading && (
          <Form isEdit={true} initialData={this.props.initialData} onSubmit={this.hanldeOnSubmit} />
        )}
      </PolicyEditWrapper>
    )
  }
}

export default Edit
