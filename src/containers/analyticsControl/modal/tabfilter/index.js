import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ItemAttribute from './itemAttribute'
import ItemVisibleAttribute from './itemVisibleAttribute'
import ItemChartAttribute from './itemChartAttribute'
import { getColorByIndex } from 'src/utils/color'
import { Tag, Card, Input, Icon, message } from 'antd'
import { pull as _pull, get, debounce } from 'lodash-es'
import { connect } from 'react-redux'
import QueryBuilder from './querybuilder/index'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

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
export default class TabFilter extends React.Component {
  static propTypes = {
    AnalyticsStore: PropTypes.object.isRequired,
    cbTabInfoVal: PropTypes.func.isRequired,
    getRef: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    const { AnalyticsStore } = props
    const targetKey = get(AnalyticsStore, '__target.key')

    const fieldArr = get(AnalyticsStore, `${targetKey}.fieldArr`, [])
    const initia = getInitialData(fieldArr)

    const payload = get(AnalyticsStore, `${targetKey}.tabInfo`, initia)
    this.state = payload
    this.debounceCbTabInfoVal = debounce(this.props.cbTabInfoVal, 300)
  }

  setData = data => {
    this.setData({ data })
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
  }

  cbHandleDrop = task => {
    this.QueryBuilder.addTheLastRule(task)
  }
  

  render() {
    const columnSourceAttribute = this.state.columns['column-source-attribute']
    const tasksSourceAttribute = columnSourceAttribute.taskIds.map(taskId => this.state.tasks[taskId])

    const columnVisibleAttribute = this.state.columns['column-visible-attribute']

    return (
      <Wrapper>
        <DndProvider backend={Backend}>
          <ContainerTop>
            <ContainerColumn style={{ marginLeft: 0, border: 'none' }}>
              <Title>{columnSourceAttribute.title}</Title>
              <Input
                style={{ padding: '0px 8px' }}
                placeholder='Search...'
                prefix={<Icon type='search' style={{ color: 'rgba(0,0,0,.25)', marginLeft: 4 }} />}
              />
              <TaskList style={{ backgroundColor: 'white' }}>
                {tasksSourceAttribute.map((task, index) => (
                  <ItemAttribute key={task.id} task={task} index={index} cbHandleDrop={this.cbHandleDrop} />
                ))}
                {/* {provided.placeholder} */}
              </TaskList>
            </ContainerColumn>
            <ContainerColumn style={{ flex: 2 }}>
              <Title>{columnVisibleAttribute.title}</Title>
              <QueryBuilder getRef={ref => (this.QueryBuilder = ref)} />
            </ContainerColumn>
          </ContainerTop>
        </DndProvider>
      </Wrapper>
    )
  }
}
