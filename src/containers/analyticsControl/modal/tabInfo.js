import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Tag, Card, Input, Icon } from 'antd'

const Wrapper = styled.div`
  display: flex;
`

const ContainerTop = styled.div`
  margin-top: 8px;
  display: flex;
  width: 100%;
`

const ContainerColumn = styled.div`
  /* margin: 8px; */
  margin-left: 8px;
  /* border: 1px solid lightgrey;
  border-radius: 2px; */
  background-color: white;
  /* width: 220px; */
  flex: 1;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Name' },
    'task-2': { id: 'task-2', content: 'Code' },
    'task-3': { id: 'task-3', content: 'District Code' },
    'task-4': { id: 'task-4', content: 'Sales Area' },
    'task-5': { id: 'task-5', content: 'Persons' }
  },
  columns: {
    'column-source-attribute': {
      id: 'column-source-attribute',
      title: 'Attributes',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-visible-attribute': {
      id: 'column-visible-attribute',
      title: 'Visible attributes',
      taskIds: []
    },
    'column-chart-attribute': {
      id: 'column-chart-attribute',
      title: 'Chart',
      taskIds: []
    }
  },
  columnOrder: ['column-source-attribute', 'column-visible-attribute', 'column-chart-attribute']
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
    const columnSourceAttribute = this.state.columns['column-source-attribute']
    const tasksSourceAttribute = columnSourceAttribute.taskIds.map(taskId => this.state.tasks[taskId])

    const columnVisibleAttribute = this.state.columns['column-visible-attribute']
    const tasksVisibleAttribute = columnVisibleAttribute.taskIds.map(taskId => this.state.tasks[taskId])

    const columnChartAttribute = this.state.columns['column-chart-attribute']
    const tasksChartAttribute = columnChartAttribute.taskIds.map(taskId => this.state.tasks[taskId])

    return (
      <Wrapper>
        <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd}>
          <ContainerTop>
            <ContainerColumn style={{ marginLeft: 0, border: 'none' }}>
              <Title>{columnSourceAttribute.title}</Title>
              <Input
                style={{ padding: '0px 8px' }}
                prefix={<Icon type='search' style={{ color: 'rgba(0,0,0,.25)', marginLeft: 4 }} />}
              />
              <Droppable droppableId={columnSourceAttribute.id}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                    style={{ backgroundColor: 'white' }}
                  >
                    {tasksSourceAttribute.map((task, index) => (
                      <Task key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            </ContainerColumn>
            <ContainerColumn>
              <Title>{columnVisibleAttribute.title}</Title>
              <Droppable droppableId={columnVisibleAttribute.id}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {tasksVisibleAttribute.map((task, index) => (
                      <Task key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            </ContainerColumn>
            <ContainerColumn>
              <Title>{columnChartAttribute.title}</Title>
              <Droppable droppableId={columnChartAttribute.id}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {tasksChartAttribute.map((task, index) => (
                      <Task key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            </ContainerColumn>
          </ContainerTop>
        </DragDropContext>
      </Wrapper>
    )
  }
}

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : '#e8e8e8')};
  flex-grow: 1;
  min-height: 100px;
`

const Container3 = styled.div`
  padding: 8px;
  /* border: 1px solid lightgrey; */
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : '#fafafa')};

  display: flex;
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
