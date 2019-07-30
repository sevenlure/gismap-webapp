import React from 'react'
import PropTypes from 'prop-types'
import { Upload, message, Button, Icon, Modal, Form, Input } from 'antd'
import { get as _get, remove as _remove, isEqual as _isEqual } from 'lodash-es'
import { connect } from 'react-redux'
import { uploadAttachment } from 'src/api/AttachmentApi'
import { HOST_ATTACHMENT } from 'src/config/host'
import Clearfix from 'src/components/elements/clearfix'
import TableViewFile from './tableFile'

const formItemLayout = {
  labelCol: {
    xs: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 20 }
  },
  labelAlign: 'left'
}

const { TextArea } = Input

@connect(state => ({
  token: _get(state, 'AuthStore.token')
}))
@Form.create()
export default class UploadAttachment extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    keyUpload: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    token: PropTypes.string.isRequired,
    value: PropTypes.array,
    cbDeleteFile: PropTypes.func
  }
  //isInitSetValue de xu ly luc edit form
  state = { isInitSetValue: false, visible: false, file: null, isLoading: false, fileSavedList: [] }

  showModal = () => {
    this.props.form.resetFields()
    this.setState({
      visible: true,
      file: null
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      file: null
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const isDiff = !_isEqual(this.props.value, nextProps.value)
    if (isDiff && !this.state.isInitSetValue) {
      const fileSavedList = nextProps.value.map(item => {
        return {
          _id: item._id,
          Title: item.Title,
          GhiChu: item.GhiChu,
          url: HOST_ATTACHMENT + item.RelativePathWithFileName + '?token=' + this.props.token
        }
      })
      this.setState({ fileSavedList, isInitSetValue: true })
    }

    // if (nextProps.value && nextProps.value !== this.state.value) this.setState({ value: nextProps.value })

    // if (nextProps.danhMucIsLoaded) this.initialData()
  }

  handleOk = () => {
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        console.log('Received values of form: ', values)
        const { Attachment, ...otherField } = values
        uploadAttachment(this.props.keyUpload, Attachment.file, otherField)
          .then(response => {
            const { data } = response
            const fileSaved = {
              _id: data._id,
              Title: data.Title,
              GhiChu: data.GhiChu,
              url: HOST_ATTACHMENT + data.RelativePathWithFileName + '?token=' + this.props.token
            }
            this.setState(
              {
                isInitSetValue: true,
                fileSavedList: [...this.state.fileSavedList, fileSaved],
                isLoading: false,
                visible: false
              },
              () => {
                if (this.props.onChange) {
                  // this.props.onChange(_map(this.state.fileSavedList, '_id'))
                  this.props.onChange(this.state.fileSavedList)
                }
              }
            )
          })
          .catch(() => {
            this.setState({ isLoading: false })
          })
      } else {
        this.setState({ isLoading: false })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div onSubmit={this.handleSubmit}>
        <Button onClick={this.showModal}>Click to Upload</Button>
        <Clearfix height={8} />
        {this.state.fileSavedList.length > 0 && (
          <TableViewFile
            dataSource={this.state.fileSavedList}
            cbDeleteFile={_id => {
              _remove(this.state.fileSavedList, item => item._id === _id)
              if (this.props.onChange) this.props.onChange(this.state.fileSavedList)
              if (this.props.cbDeleteFile) this.props.cbDeleteFile(_id)
              this.forceUpdate()
            }}
          />
        )}

        <Modal
          closable
          style={{ minWidth: 700 }}
          title='Upload Attachment'
          visible={this.state.visible}
          onOk={() => {
            this.setState({ isLoading: true }, () => {
              this.handleOk()
            })
          }}
          onCancel={this.handleCancel}
          okText='Upload Attachment'
          confirmLoading={this.state.isLoading}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Form.Item {...formItemLayout} label='Tên hồ sơ'>
            {getFieldDecorator('Title', {
              rules: [{ required: true, message: 'Field is required' }]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='Ghi chú'>
            {getFieldDecorator('GhiChu', {})(<TextArea autosize={{ minRows: 3, maxRows: 3 }} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='File'>
            {getFieldDecorator('Attachment', {
              rules: [{ required: true, message: 'Field is required' }]
            })(
              <Upload
                accept='application/pdf'
                beforeUpload={file => {
                  const isPDF = file.type === 'application/pdf'
                  if (!isPDF) {
                    message.error('You can only upload JPG file!')
                  }
                  const isLt50M = file.size / 1024 / 1024 < 50
                  if (!isLt50M) {
                    message.error('Attachment must smaller than 50MB!')
                  }
                  if (isPDF && isLt50M) this.setState({ file })

                  return false // prevent upload after choose file
                }}
                fileList={this.state.file ? [this.state.file] : []}
                showUploadList={false}
              >
                <Button style={{ whiteSpace: 'nowrap', maxWidth: 400, textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  <Icon type='upload' /> {this.state.file ? this.state.file.name : 'Select File'}
                </Button>
              </Upload>
            )}
          </Form.Item>
        </Modal>
      </div>
    )
  }
}
