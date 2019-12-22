import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DropTarget } from 'react-dnd'

const TYPE_ATTRIBUTE = 'TYPE_ATTRIBUTE'

const style = {
  // height: '12rem',
  height: 60,
  width: '100%',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  backgroundColor: 'white'
}

@DropTarget(
  TYPE_ATTRIBUTE,
  {
    drop(props, monitor) {
      const itemDroped = monitor.getItem()
      if (props.cbHandleDrop) {
        props.cbHandleDrop(itemDroped.task)
      }
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)
export default class PlaceHolderDrop extends React.Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    let backgroundColor = ''
    let border = ''
    if (isActive) {
      // backgroundColor = 'darkgreen'
      border = '1px dashed gray'
    } else if (canDrop) {
      // backgroundColor = 'darkkhaki'
      border = '1px dashed gray'
    }
    return (
      <div style={{ margin: '0px 32px 0px 24px' }}>
        <div ref={connectDropTarget} style={{ ...style, backgroundColor, border }}>
          {/* {isActive ? 'Release to drop' : 'Drag a box here'} */}
          {this.props.children}
        </div>
      </div>
    )
  }
}
