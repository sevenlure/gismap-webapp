import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography, Icon, Row, Col, Button, InputNumber } from 'antd'
const { Text } = Typography


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
    defaultColor: PropTypes.string,
    defaultRadius: PropTypes.number,
    id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }

  state = {
    radius: null,
    color: null
  }

  hanldeOnChangeRadius = value => {
    this.setState(
      {
        radius: value
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.props.id, {
            ...this.state,
            radius: this.state.radius
          })
        }
      }
    )
  }

  hanndleOnChangeColor = value => {
    this.setState(
      {
        color: value
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.props.id, {
            ...this.state,
            color: this.state.color
          })
        }
      }
    )
  }

  render() {
    return (
      <ContainerItem>
        <div style={{ width: '100%' }}>
          <Row align='middle' type='flex' justify='space-between' gutter={8}>
            <Col span={3}>
              <input
                type='color'
                defaultValue={this.props.defaultColor}
                onChange={e => this.hanndleOnChangeColor(e.target.value)}
              />
            </Col>
            <Col span={3}>
              <Text>radius</Text>
            </Col>
            <Col span={8}>
              <InputNumber defaultValue={this.props.defaultRadius} onChange={this.hanldeOnChangeRadius} />
            </Col>
            <Col span={3}>
              <Text>meters</Text>
            </Col>
            <Col span={2}>
              <Button type='link' onClick={() => this.props.close(this.props.id)}>
                <Icon type='close-circle' style={{ color: 'red', fontSize: 18 }} />
              </Button>
            </Col>
          </Row>
        </div>
      </ContainerItem>
    )
  }
}
