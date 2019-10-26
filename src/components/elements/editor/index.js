import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// const Base64UploadAdapter = require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')

const EditorWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
`
export default class EditorCustom extends React.Component {
  static propTypes = {
    onChange: PropTypes.func
  }

  state = {
    isLoaded: false
  }

  componentDidMount() {
    // ClassicEditor.create(document.querySelector('#tamp'), {
    // plugins: [ Base64UploadAdapter, ... ],
    // toolbar: [ ... ]
    // })
  }
  state = {}

  render() {
    return (
      <div>
        <EditorWrapper>
          <CKEditor
            // config={{
            //   plugins: [Base64UploadAdapter]
            // }}
            editor={ClassicEditor}
            data='<p>Hello from CKEditor 5!</p>'
            onInit={editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor)
            }}
            onChange={(event, editor) => {
              const data = editor.getData()
              // console.log("--------", data)
              if (this.props.onChange) this.props.onChange(data)
              // console.log({ event, editor, data })
            }}
            // onBlur={(event, editor) => {
            //   // console.log('Blur.', editor)
            // }}
            // onFocus={(event, editor) => {
            //   // console.log('Focus.', editor)
            // }}
          />
        </EditorWrapper>
      </div>
    )
  }
}
