import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DropTarget } from 'react-dnd'

const TYPE_ATTRIBUTE = 'TYPE_ATTRIBUTE'

const style = {
  // height: '12rem',
  height: '100%',
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
      if (props.cbHandleDropIntoRule) {
        props.cbHandleDropIntoRule(itemDroped.task, props.dataId)
      }
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)
export default class PlaceHolderDropGroup extends React.Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    let backgroundColor = ''
    let border = ''
    let display = 'none'
    if (isActive) {
      backgroundColor = 'red'
      border = '1px dashed gray'
      display = ''
    } else if (canDrop) {
      // backgroundColor = 'darkkhaki'
      border = '1px dashed gray'
      display = ''
    }
    return (
      <div style={{ position: 'absolute', margin: -10, height: '100%', width: '100%', display }}>
        <div ref={connectDropTarget} style={{ ...style, backgroundColor, border, position: 'absolute' }}>
          {/* {isActive ? 'Release to drop' : 'Drag a box here'} */}
        </div>
      </div>
    )
  }
}
