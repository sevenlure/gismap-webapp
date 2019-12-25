import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ItemAttribute from './itemAttribute'
import { Input, Icon } from 'antd'
import { get, debounce } from 'lodash-es'
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
  margin-left: 8px;
  background-color: white;
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
      }
    }
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
    getRef: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    const { AnalyticsStore } = props
    const targetKey = get(AnalyticsStore, '__target.key')

    const fieldArr = get(AnalyticsStore, `${targetKey}.fieldArr`, [])
    const initia = getInitialData(fieldArr)

    const payload = get(AnalyticsStore, `${targetKey}.tabInfo`, initia)
    this.state = {
      ...payload,
      search: ''
    }
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
    const tasksSourceAttribute = columnSourceAttribute.taskIds
      .map(taskId => this.state.tasks[taskId])
      .filter(task => task.content.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()))

    return (
      <Wrapper>
        <DndProvider backend={Backend}>
          <ContainerTop>
            <ContainerColumn style={{ marginLeft: 0, border: 'none' }}>
              <Title>Attributes</Title>
              <Input
                value={this.state.search}
                onChange={e => this.setState({ search: e.target.value })}
                style={{ padding: '0px 8px' }}
                placeholder='Search...'
                prefix={<Icon type='search' style={{ color: 'rgba(0,0,0,.25)', marginLeft: 4 }} />}
              />
              <TaskList style={{ backgroundColor: 'white' }}>
                {tasksSourceAttribute.map((task, index) => (
                  <ItemAttribute key={task.id} task={task} index={index} cbHandleDrop={this.cbHandleDrop} />
                ))}
              </TaskList>
            </ContainerColumn>
            <ContainerColumn style={{ flex: 2 }}>
              <Title>Query Builder</Title>
              <QueryBuilder getRef={ref => (this.QueryBuilder = ref)} />
            </ContainerColumn>
          </ContainerTop>
        </DndProvider>
      </Wrapper>
    )
  }
}
