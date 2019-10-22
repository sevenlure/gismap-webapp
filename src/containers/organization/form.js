import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Row, Col, Button, Select } from 'antd'
import { connect } from 'react-redux'
import { userLogin } from 'src/redux/actions/authAction'
import UpdateFile from 'src/components/elements/update-file/index.js'
import { updateUserInfo } from 'src/redux/actions/generalAction.js'
import { policyMess } from 'src/config/message'
import {
  get as _get,
  pick as _pick,
  map as _map,
  filter as _filter,
  find as _find,
  omit as _omit,
  keys as _keys,
  compact as _compact
} from 'lodash-es'
import Clearfix from 'src/components/elements/clearfix'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import userApi from 'src/api/userApi'

const { Option } = Select

// const children = []
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
// }

const errorMessage = policyMess.error

const OrganizationFormWrapper = styled.div`
  flex: 1;
`

const mapStateToProps = state => ({
  token: _get(state, 'AuthStore.token'),
  listDepartment: _get(state, 'GeneralStore.danhMuc.listDepartment', [])
})
const mapDispatchToProps = {
  userLogin,
  updateUserInfo
}
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class EditForm extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    getFieldError: PropTypes.any,
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
    token: PropTypes.string,
    listDepartment: PropTypes.array
  }

  state = {
    dataListUser: []
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)

        const dataOmit = _omit(values, ['LinkFile'])
        // console.log(_values(data), '_values')
        // console.log(_keys(data), '_keys')
        const result = _map(_keys(dataOmit), key => {
          if (_get(dataOmit, `${key}`, null)) {
            return {
              Department: key,
              ListUserShow: dataOmit[key]
            }
          } else {
            return null
          }
        })

        // console.log(_compact(result), 'resultresult')

        const data = {
          LinkFile: _get(values, 'LinkFile', ''),
          Structure: _compact(result)
        }
        if (this.props.onSubmit) {
          this.props.onSubmit(data)
        }
      }
    })
  }

  getInitial = async () => {
    try {
      const res = await userApi.getAll()
      if (res.status === 200) {
        // console.log(res, 'getInitial')
        this.setState({
          dataListUser: _get(res, 'data', [])
        })
      }
    } catch (ex) {
      const { response } = ex
      // console.log('catch', response)
      getInfoErrorfetch(response)
    }
  }

  getDefaultValue = departmentId => {
    const structureArray = _get(this.props, 'initialValue.Structure', [])
    const dataFind = _find(structureArray, item => {
      return _get(item, 'Department._id', '') === departmentId
    })

    const ListUserShow = _get(dataFind, 'ListUserShow', [])

    return _map(ListUserShow, itemUser => {
      return itemUser._id
    })
  }

  getListUserForDepartment = departmentId => {
    // console.log('getListUserForDepartment', departmentId, this.state.dataListUser)
    const dataFillter = _filter(this.state.dataListUser, itemUser => {
      return _get(itemUser, 'Department._id', '') === departmentId
    })
    if (dataFillter && dataFillter.length > 0) {
      return _map(dataFillter, itemUser => {
        return (
          <Option key={itemUser._id}>
            {itemUser.FullName} - {itemUser.PosittionName}
          </Option>
        )
      })
    } else {
      return null
    }
  }

  componentDidMount = () => {
    this.getInitial()
    this.props.form.resetFields()
    const { setFieldsValue } = this.props.form
    const { initialValue } = this.props
    // console.log(_pick(initialValue, ['LinkFile']), 'initialData')
    setFieldsValue({
      ..._pick(initialValue, ['LinkFile'])
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { listDepartment } = this.props
    const { dataListUser } = this.state
    const isRendeUser = dataListUser.length > 0 ? true : false
    // console.log('render', dataListUser)
    return (
      <OrganizationFormWrapper>
        <Form layout='vertical' onSubmit={this.handleSubmit}>
          <Form.Item label='Sơ đồ tổ chức' extra=''>
            {getFieldDecorator('LinkFile', {
              rules: [{ required: true, message: errorMessage.File }]
            })(<UpdateFile />)}
          </Form.Item>
          <Clearfix height={16} />
          <Row>
            <Col span={24}>
              <h4>Cán bộ hiển thị theo phòng ban</h4>
            </Col>
          </Row>
          {isRendeUser && (
            <Row gutter={8}>
              {_map(listDepartment, item => {
                return (
                  <Col key={item._id} span={24}>
                    <Form.Item label={item.Name} extra=''>
                      {getFieldDecorator(`${item._id}`, {
                        initialValue: this.getDefaultValue(item._id)
                      })(
                        <Select
                          mode='multiple'
                          style={{ width: '100%' }}
                          placeholder='Please select'
                          maxTagCount={5}
                          //   defaultValue={}
                          // onChange={handleChange}
                        >
                          {this.getListUserForDepartment(item._id)}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                )
              })}
            </Row>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              loading={this.state.isLoading}
              size='large'
              style={{ marginRight: 8, width: 120 }}
              type='primary'
              htmlType='submit'
            >
              Cập nhật
            </Button>
          </div>
        </Form>
      </OrganizationFormWrapper>
    )
  }
}

export default Form.create({})(EditForm)
