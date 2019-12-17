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

const ContainerTop = styled.div`
  display: flex;
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
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'In process',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
}

export default class TabInfo extends React.Component {
  state = initialData

  onDragEnd = result => {
    // console.log('result', result)
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    // NOTE  change vitri trong column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
      return
    }
    // Moving from 1 list sang another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }
    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    this.setState(newState)
  }

  render() {
    return (
      <Wrapper>
        <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd}>
          <ContainerTop>
            {this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId]
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

              return <Column key={column.id} column={column} tasks={tasks} />
            })}
          </ContainerTop>
        </DragDropContext>
      </Wrapper>
    )
  }
}

const Container2 = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`

class Column extends React.Component {
  render() {
    return (
      <Container2>
        <Title>{this.props.column.title}</Title>
        <Droppable
          droppableId={this.props.column.id}
          // type='done'
          // type={this.props.column.id === 'column-3' ? 'done' : 'active'}
        >
          {(provided, snapshot) => (
            <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container2>
    )
  }
}

const Container3 = styled.div`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};

  display: flex;
`
const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`

class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container3
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {/* <Handle {...provided.dragHandleProps} /> */}
            {this.props.task.content}
          </Container3>
        )}
      </Draggable>
    )
  }
}
