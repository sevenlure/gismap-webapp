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
    index: PropTypes.number,
    radiusMin: PropTypes.number,
    defaultColor: PropTypes.string,
    defaultRadius: PropTypes.number,
    id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      radius: this.props.defaultRadius,
      color: this.props.defaultColor,
      id: this.props.id,
      radiusMin: this.props.radiusMin
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.radiusMin !== this.props.radiusMin) {
      this.setState({
        radiusMin: this.props.radiusMin
      })
      if (this.props.onChange) {
        // console.log('componentDidUpdate', this.props.radiusMin)
        // this.props.onChange(this.props.id, {
        //   ...this.state,
        //   radius: this.state.radius
        // })
        this.props.onChange({
          ...this.state,
          radiusMin: this.props.radiusMin
        })
      }
    }
  }

  hanldeOnChangeRadius = value => {
    this.setState(
      {
        radius: value
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange({
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
          this.props.onChange({
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
            <Col span={4}>
              <Text>radius</Text>
            </Col>
            <Col span={6}>
              <InputNumber defaultValue={this.props.defaultRadius} onChange={this.hanldeOnChangeRadius} />
            </Col>
            <Col span={4}>
              <Text>meters</Text>
            </Col>

            <Col span={2}>
              {this.props.index > 0 && (
                <Button type='link' onClick={() => this.props.close(this.props.id)}>
                  <Icon type='close-circle' style={{ color: 'red', fontSize: 18 }} />
                </Button>
              )}
            </Col>
          </Row>
          {/* {this.state.roleRadius && (
            <Row>
              <Col>
                <Text type='danger'>Không được nhỏ quá {this.state.radiusMin}</Text>
              </Col>
            </Row>
          )} */}
        </div>
      </ContainerItem>
    )
  }
}
