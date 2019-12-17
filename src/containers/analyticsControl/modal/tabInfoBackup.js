import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Tag } from 'antd'

const Wrapper = styled.div`
  display: flex;
`
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  .container--title {
    padding: 8px;
  }
  .container--content {
    padding: 8px;
  }
`

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'grey',
  padding: 8,
  width: 250
})

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'this is task 1' },
    'task-2': { id: 'task-2', content: 'this is task 2' },
    'task-3': { id: 'task-3', content: 'this is task 3' },
    'task-4': { id: 'task-4', content: 'this is task 4' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do 1',
      taskIds: ['task-1', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'To do 2',
      taskIds: ['task-2', 'task-3']
    }
  },
  columnOrder: ['column-1']
}

export default class TabInfo extends React.Component {
  state = {
    ...initialData
  }

  onDragEnd = result => {
    console.log('result',result)
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }
    const column = this.state.columns[source.droppableId]
    const newTaskIds = Array.from(column.taskIds)
    newTaskIds.slice(source.index, 1)
    newTaskIds.slice(destination.index, 0, draggableId)

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    }
    console.log('newState', newState)
    this.setState(newState)
  }

  render() {
    return (
      <Wrapper>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId]
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

            return (
              <Container key={column.id} column={column} tasks={tasks}>
                <h3 className='container--title'>Title</h3>
                <Droppable droppableId={column.id}>
                  {(provided, droppableSnapshot) => (
                    <div
                      className='container--content'
                      ref={provided.innerRef}
                      style={getListStyle(droppableSnapshot.isDraggingOver)}
                    >
                      {tasks.map((task, index) => {
                        return <Item key={task.id} task={task} idtamp='1' index={index} />
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Container>
            )
          })}
        </DragDropContext>
      </Wrapper>
    )
  }
}

class Item extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {provided => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <Tag>{this.props.task.content}</Tag>
          </div>
        )}
      </Draggable>
    )
  }
}
