import React from 'react'
import PropTypes from 'prop-types'
import { Upload, message, Button, Icon, Modal, Form, Input } from 'antd'
import { get as _get, map as _map, remove as _remove } from 'lodash'
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
    token: PropTypes.string.isRequired,
    onChange: PropTypes.func
  }

  state = { visible: false, file: null, isLoading: false, fileSavedList: [] }

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
                fileSavedList: [...this.state.fileSavedList, fileSaved],
                isLoading: false,
                visible: false
              },
              () => {
                if (this.props.onChange) {
                  this.props.onChange(_map(this.state.fileSavedList, '_id'))
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
