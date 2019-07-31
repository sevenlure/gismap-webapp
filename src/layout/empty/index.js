import React from 'react'
import PropTypes from 'prop-types'

export default class AppWithLayoutEmpty extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
}
