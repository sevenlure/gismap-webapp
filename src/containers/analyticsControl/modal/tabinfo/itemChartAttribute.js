import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Tag, Card, Input, Icon } from 'antd'

import InputColor from 'react-input-color'

const ContainerItem = styled.div`
  padding: 8px;
  /* border: 1px solid lightgrey; */
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : '#fafafa')};

  display: flex;
`

export default class ItemChartAttribute extends React.Component {
  static propTypes = {
    backtoSource: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    column: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChangeColor: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.onChangeColor(this.props.color)
  }
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <ContainerItem
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {/* <Handle {...provided.dragHandleProps} /> */}
            <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
              <input type='color' value={this.props.color} onChange={e => this.props.onChangeColor(e.target.value)} />
              <div style={{ flex: 1, marginLeft: 8 }}>{this.props.task.content}</div>
              <Icon
                type='close-circle'
                style={{ color: 'red', fontSize: 18 }}
                onClick={() => {
                  this.props.backtoSource(this.props.column, this.props.task.id)
                }}
              />
            </div>
          </ContainerItem>
        )}
      </Draggable>
    )
  }
}
