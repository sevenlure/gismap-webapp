import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CKEditor from '@ckeditor/ckeditor5-react'

const EditorWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
`
export default class EditorCustom extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
  }

  state = {
    isLoaded: false
  }

  // componentDidMount() {
  //   // ClassicEditor.create(document.querySelector('#tamp'), {
  //   // plugins: [ Base64UploadAdapter, ... ],
  //   // toolbar: [ ... ]
  //   // })
  // }
  state = {}

  render() {
    // console.log(this.props, 'render')
    return (
      <div>
        <EditorWrapper>
          <CKEditor
            // eslint-disable-next-line
            editor={ClassicEditor}
            // data={this.props.value}
            onInit={editor => {
              // You can store the "editor" and use when it is needed.
              // console.log('Editor is ready tPo use!', editor)
              editor.setData(this.props.value)
            }}
            onChange={(event, editor) => {
              const data = editor.getData()
              if (this.props.onChange) this.props.onChange(data)
              console.log({ event, editor, data })
            }}
          />
        </EditorWrapper>
      </div>
    )
  }
}
