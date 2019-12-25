import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable, DragSour } from 'react-beautiful-dnd'
import { Tag, Card, Input, Icon } from 'antd'
import { DragSource } from 'react-dnd'

const TYPE_ATTRIBUTE = 'TYPE_ATTRIBUTE'

const ContainerItem = styled.div`
  padding: 8px;
  /* border: 1px solid lightgrey; */
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : '#fafafa')};
  display: flex;
`

@DragSource(
  TYPE_ATTRIBUTE,
  {
    beginDrag: props => ({ name: props.task.content, task: props.task }),
    endDrag(props, monitor) {
      // const item = monitor.getItem()
      // console.log('item', item)
      // const dropResult = monitor.getDropResult()
      // console.log('dropResult',dropResult)
      // if (dropResult) {
      //   props.cbHandleDrop(props.task)
      //   // alert(`You dropped ${item.name} into ${dropResult.name}!`)
      // }
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)
export default class ItemAttribute extends React.Component {
  render() {
    const { name, isDragging, connectDragSource } = this.props
    const opacity = isDragging ? 0.4 : 1
    const cursor = isDragging ? 'grabbing' : 'grab'
    return (
      <ContainerItem ref={connectDragSource} style={{ opacity, cursor }}>
        {/* <Handle {...provided.dragHandleProps} /> */}
        {this.props.task.content}
      </ContainerItem>
    )
  }
}
