import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ItemAttribute from './itemAttribute'
import ItemVisibleAttribute from './itemVisibleAttribute'
import ItemChartAttribute from './itemChartAttribute'
import { getColorByIndex } from 'src/utils/color'
import { Tag, Card, Input, Icon, message } from 'antd'
import { pull as _pull, get, debounce, cloneDeep as _cloneDeep } from 'lodash-es'
import { connect } from 'react-redux'

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

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : '#e8e8e8')};
  flex-grow: 1;
  min-height: 100px;
  max-height: 300px;
  overflow-y: auto;
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

function getInitialData(fieldArr) {
  const taskIdsTamp = []
  const tasksTamp = fieldArr.reduce((acc, cur) => {
    taskIdsTamp.push(cur.key)
    acc[cur.key] = { ...cur, id: cur.key, content: cur.label }
    return acc
  }, {})

  return {
    tasks: tasksTamp,
    columns: {
      'column-source-attribute': {
        id: 'column-source-attribute',
        title: 'Attributes',
        taskIds: taskIdsTamp
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
}

const mapStateToProps = state => ({
  AnalyticsStore: get(state, 'AnalyticsStore')
})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
export default class TabInfo extends React.Component {
  static propTypes = {
    AnalyticsStore: PropTypes.object.isRequired,
    getRef: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    const { AnalyticsStore } = props

    const targetKey = get(AnalyticsStore, '__target.key')

    const fieldArr = get(AnalyticsStore, `${targetKey}.fieldArr`, [])
    const initia = getInitialData(fieldArr)
   
    let payload = get(AnalyticsStore, `${targetKey}.tabInfo`, initia)
    
    this.state = {
      ...payload,
      search: ''
    }

    // this.debounceCbTabInfoVal = debounce(this.props.cbTabInfoVal, 300)
  }

  onDragEnd = result => {
    // console.log('result', result)
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }
    // MARK  check field kéo vào chart thì phải là Number
    if (destination.droppableId === 'column-chart-attribute') {
      const typeTamp = get(this.state.tasks, `${draggableId}.type`)
      if (typeTamp !== Number) {
        message.warning('Only Numeric fields are allowed')
        return
      }
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
    // if (this.props.cbTabInfoVal) this.props.cbTabInfoVal(newState)
  }

  backtoSource = (column, taskIdBack) => {
    let newColumnRemove = _cloneDeep(column)
    _pull(newColumnRemove.taskIds, taskIdBack)
    const columnSource = _cloneDeep(this.state.columns['column-source-attribute'])
    let newColumnSource = {
      ...columnSource,
      taskIds: [...columnSource.taskIds, taskIdBack]
    }
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        ['column-source-attribute']: newColumnSource,
        [newColumnRemove.id]: newColumnRemove
      }
    }
    this.setState(newState)
    // if (this.props.cbTabInfoVal) this.props.cbTabInfoVal(newState)
  }

  getDataTabInfo() {
    return this.state
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
  }

  render() {
    const columnSourceAttribute = this.state.columns['column-source-attribute']
    const tasksSourceAttribute = columnSourceAttribute.taskIds
      .map(taskId => this.state.tasks[taskId])
      .filter(task => task.content.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()))

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
                value={this.state.search}
                onChange={e => this.setState({ search: e.target.value })}
                style={{ padding: '0px 8px' }}
                placeholder='Search...'
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
                      <ItemAttribute key={task.id} task={task} index={index} />
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
                      <ItemVisibleAttribute
                        key={task.id}
                        task={task}
                        column={columnVisibleAttribute}
                        index={index}
                        backtoSource={this.backtoSource}
                      />
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
                      <ItemChartAttribute
                        key={task.id}
                        task={task}
                        column={columnChartAttribute}
                        index={index}
                        backtoSource={this.backtoSource}
                        color={task.color || getColorByIndex(index)}
                        onChangeColor={val => {
                          let newTask = this.state.tasks[task.id]
                          newTask.color = val
                          this.setState({
                            tasks: {
                              ...this.state.tasks,
                              [task.id]: newTask
                            }
                          })
                        }}
                      />
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
