import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Tooltip } from 'antd'

export default class IconWithToolTip extends React.Component {
  static propTypes = {
    title: PropTypes.any,
    type: PropTypes.string,
    className: PropTypes.string,
    twoToneColor: PropTypes.string,
    viewBox: PropTypes.string,
    spin: PropTypes.bool,
    rotate: PropTypes.number,
    style: PropTypes.object,
    prefixCls: PropTypes.string,
    role: PropTypes.string,
    onClick: PropTypes.func
  }

  render() {
    return (
      <Tooltip title={this.props.title}>
        <Icon {...this.props} />
      </Tooltip>
    )
  }
}
