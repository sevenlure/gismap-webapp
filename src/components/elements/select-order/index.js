import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { Icon, Divider, Menu, Dropdown, Button, Radio } from 'antd'
import { get as _get } from 'lodash-es'
import './style.less'

const styleMenuItem = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 50,
  marginTop: 12
}
const ITEM = [
  {
    key: 'time-asc',
    label: 'Giờ chạy tăng dần'
  },
  {
    key: 'time-desc',
    label: 'Giờ chạy giảm dần'
  },
  {
    key: 'price-asc',
    label: 'Giá vé tăng dần'
  },
  {
    key: 'price-desc',
    label: 'Giá vé giảm dần'
  }
]

export default class SelectOrder extends React.Component {
  static propTypes = {
    onChange: PropTypes.func
  }

  state = {
    isVisible: false,
    value: 'time-asc',
    label: 'Giờ chạy tăng dần'
  }
  SelectOption = () => {
    return (
      <Menu
        onClick={menuSelected => {
          if (menuSelected && menuSelected.key) {
            const label = _get(menuSelected, 'item.props.label')
            this.setState({ value: menuSelected.key, label })
            if (this.props.onChange) this.props.onChange(menuSelected.key)
          }
        }}
        selectedKeys={[this.state.value]}
      >
        {ITEM.map(item => {
          return [
            <Menu.Item key={item.key} label={item.label} style={{ ...styleMenuItem }}>
              <div>
                <span>{item.label}</span>
              </div>
              <div>
                <Radio checked={this.state.value === item.key} />
              </div>
            </Menu.Item>,
            <Divider key={item.key + 'devider'} style={{ margin: '12px 0' }} />
          ]
        })}

        <div style={{ float: 'right', margin: '12px 12px 20px 12px' }}>
          <Button
            style={{ width: 90 }}
            size='large'
            type='primary'
            onClick={() => {
              this.setState({ isVisible: false })
            }}
          >
            Xong
          </Button>
        </div>
      </Menu>
    )
  }

  render() {
    let typeIcon = this.state.isVisible ? 'up' : 'down'
    return (
      <Dropdown
        overlayClassName='select-order'
        visible={this.state.isVisible}
        trigger={['click']}
        overlay={<this.SelectOption />}
        overlayStyle={{ padding: '12px 12px' }}
        onVisibleChange={changed => {
          this.setState({ isVisible: changed })
        }}
      >
        <Button
          onClick={() => {
            this.setState({ isVisible: !this.state.isVisible })
          }}
          size='large'
          style={{ width: '100%', textAlign: 'left' }}
        >
          <span style={{ fontFamily: 'myFont-Light' }}>{this.state.label}</span>
          <Icon style={{ fontSize: '1rem' }} type={typeIcon} />
        </Button>
      </Dropdown>
    )
  }
}
