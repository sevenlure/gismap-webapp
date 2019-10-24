import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { get as _get } from 'lodash-es'
import windowSize from 'react-window-size'
import { connect } from 'react-redux'
import { Icon, Upload, message } from 'antd'
import dynamic from 'next/dynamic'

const FileViewer = dynamic(() => import('react-file-viewer'), {
  ssr: false
})
// import FileViewer from 'react-file-viewer'

import { getFilePrivate } from 'src/api/updateFileApi.js'
// import { get as _get } from 'lodash-es'
const { Dragger } = Upload

const UpdateFileWrapper = styled.div`
  flex: 1;
`
@connect(state => ({
  token: _get(state, 'AuthStore.token')
}))
@windowSize
export default class SelectDeparture extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }

  state = {
    valueUrl: null,
    isLoadingImage: true,
    itemImage: null
  }

  componentDidUpdate = prevProps => {
    // console.log(this.state.value)
    if (this.props.value && prevProps.value !== this.props.value) {
      this.setState({
        isLoadingImage: true
      })
      this.setState({
        valueUrl: this.props.value,
        isLoadingImage: false
      })
    }
  }

  render() {
    const updateFileProps = {
      name: 'file',
      multiple: false,
      action: `${process.env.HOST_API}/upload/private`,
      headers: {
        Authorization: `Bearer ${this.props.token}`
      },
      onChange(info) {
        const { status } = info.file
        if (status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
      }
    }
    let objImage = null
    if (!this.state.isLoadingImage) {
      // pathParse()
      objImage = getFilePrivate(this.state.valueUrl, this.props.token)
      console.log(this.state.valueUrl, 'objImage')
    }

    return (
      <UpdateFileWrapper>
        <Dragger
          {...this.getListImage()}
          {...updateFileProps}
          onSuccess={info => {
            this.setState({
              isLoadingImage: true
            })
            // console.log(info, '----')
            message.success(`${info.filename} tập tin cập nhật thành công.`)
            const value = _get(info, 'link', null)
            this.setState({
              valueUrl: value,
              isLoadingImage: true,
              itemImage: this.tranferImage({
                filename: info.filename,
                status: 'done'
              })
            })
            if (this.props.onChange) {
              this.props.onChange(value)
            }
          }}
          onError={err => {
            message.error(`${err.name} tập tin cập nhật thất bại`)
            this.setState({
              itemImage: this.tranferImage({
                filename: err.name,
                status: 'error'
              })
            })
          }}
        >
          <p className='ant-upload-drag-icon'>
            <Icon type='inbox' />
          </p>
          <p className='ant-upload-text'>Click or drag file to this area to upload</p>
          <p className='ant-upload-hint'>
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
          </p>
        </Dragger>

        <div>
          <h3>Xem trước</h3>

          {!this.state.isLoadingImage && (
            <div style={{ width: '100%', maxHeight: '500px', overflowY: 'auto' }}>
              <FileViewer
                fileType={objImage.ext}
                filePath={objImage.URL}
                // errorComponent={CustomErrorComponent}
                // onError={(e)=>{
                //   console.log("error",e)
                // }}
              />
            </div>
          )}
        </div>
      </UpdateFileWrapper>
    )
  }

  tranferImage = ({ filename, status }) => {
    return {
      uid: 'uid', // unique identifier, negative is recommend, to prevent interference with internal generated id
      name: filename, // file name
      status: status, // options：uploading, done, error, removed
      response: '{"status": "success"}', // response from server
      linkProps: '{"download": "image"}' // additional html props of file link
    }
  }
  getListImage = () => {
    if (this.state.itemImage) {
      return {
        fileList: [this.state.itemImage]
      }
    }
  }
}
