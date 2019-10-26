import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { get as _get } from 'lodash-es'
// import windowSize from 'react-window-size'
import { connect } from 'react-redux'
import { Upload, Icon, message } from 'antd'
// import Clearfix from 'src/components/elements/clearfix'
import { getFilePublic } from 'src/api/updateFileApi.js'

const AvatarWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
`
@connect(state => ({
  token: _get(state, 'AuthStore.token')
}))
export default class AvatarImage extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    token: PropTypes.string
  }

  state = {
    loading: false,
    imageUrl: null
  }

  componentDidUpdate = prevProps => {
    // console.log(this.props.value, prevProps.value, 'componentDidMount')
    if (this.props.value !== prevProps.value) {
      this.setState({
        imageUrl: this.props.value
      })
    }
  }

  uploadButton = () => {
    return (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload Avatar</div>
      </div>
    )
  }

  render() {
    const { imageUrl } = this.state

    let objImage = null
    // console.log(imageUrl,"imageUrl")
    if (imageUrl) {
      // pathParse()
      objImage = getFilePublic(imageUrl, this.props.token)
      // console.log(objImage, 'objImage')
    }

    return (
      <AvatarWrapper>
        <Upload
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={false}
          name={'file'}
          multiple={false}
          action={`${process.env.HOST_API}/upload/public`}
          headers={{
            Authorization: `Bearer ${this.props.token}`
          }}
          onChange={info => {
            const { status } = info.file
            if (status !== 'uploading') {
              // console.log(info.file, info.fileList)
            }
          }}
          onSuccess={info => {
            this.setState({
              isLoadingImage: true
            })
            // console.log(info, '----')
            message.success(`${info.filename} tập tin cập nhật thành công.`)

            const value = _get(info, 'link', null)
            this.setState({
              imageUrl: value,
              isLoadingImage: true
            })
            if (this.props.onChange) {
              this.props.onChange(value)
            }
          }}
        >
          {imageUrl ? (
            <img src={objImage.URL} alt='avatar' style={{ width: '100px', height: '100px' }} />
          ) : (
            this.uploadButton()
          )}
        </Upload>
      </AvatarWrapper>
    )
  }
}
