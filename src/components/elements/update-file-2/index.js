import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { get as _get } from 'lodash-es'
import windowSize from 'react-window-size'
import { connect } from 'react-redux'
import { Icon, Upload, message } from 'antd'
import Button from 'src/components/elements/button'

// import FileViewer from 'react-file-viewer'

import { getFilePrivate } from 'src/api/updateFileApi.js'

const UpdateFileWrapper = styled.div`
  flex: 1;
`
@connect(state => ({
  token: _get(state, 'AuthStore.token')
}))
@windowSize
export default class UpdatFile extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }

  state = {
    // valueUrl: null,
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
        // valueUrl: this.props.value,
        isLoadingImage: false,
        itemImage: this.tranferImage({
          filename: this.props.value,
          status: 'done'
        })
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

    return (
      <UpdateFileWrapper>
        <Upload
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
              // valueUrl: value,
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
          <Button>
            <Icon type='upload' /> Upload
          </Button>
        </Upload>
      </UpdateFileWrapper>
    )
  }

  tranferImage = ({ filename, status }) => {
    const imgObj = getFilePrivate(filename, this.props.token)
    return {
      uid: 'uid', // unique identifier, negative is recommend, to prevent interference with internal generated id
      name: filename, // file name
      status: status, // options：uploading, done, error, removed
      response: '{"status": "success"}', // response from server
      // linkProps: '{"download": "image"}' // additional html props of file link
      url: imgObj.URL
    }
  }
  getListImage = () => {
    // console.log('getListImage', this.state.valueUrl, this.state.itemImage)
    if (this.state.itemImage) {
      return {
        fileList: [this.state.itemImage]
      }
    }
  }
}
