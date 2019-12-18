import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Tag } from 'antd'
import { get } from 'lodash-es'

import ModalComp from './modal'
import { updateTarget } from 'src/redux/actions/analyticsAction'

const Wrapper = styled.div`
  margin-left: 8px;
  .ant-tag {
    cursor: pointer;
  }
`

const mapStateToProps = state => ({
  filterMarker: get(state, 'FilterStore.marker'),
  markerGeneralCountIsLoaded: get(state, 'LayerStore.markerGeneralCountIsLoaded')
})
const mapDispatchToProps = { updateTarget }

@connect(mapStateToProps, mapDispatchToProps)
export default class AnalyticsControl extends React.Component {
  static propTypes = {
    filterMarker: PropTypes.object,
    updateTarget: PropTypes.func.isRequired
  }

  showModal = item => {
    this.props.updateTarget(item)
    if (this.ModalComp) this.ModalComp.openModal()
  }
  render() {
    const { filterMarker } = this.props
    let filterMarkerArr = []
    if (filterMarker) {
      filterMarkerArr = Object.keys(filterMarker)
        .filter(i => filterMarker[i] !== false)
        .map(i => filterMarker[i])
    }
    return (
      <Wrapper style={{ marginLeft: 8 }}>
        {filterMarkerArr.length === 0 && 'Vui lòng chọn layer'}
        {filterMarkerArr.map(item => (
          <div key={item.key}>
            <Tag onClick={this.showModal.bind(this, item)}>{item.label}</Tag>
          </div>
        ))}

        <ModalComp getRef={ref => (this.ModalComp = ref)} />
      </Wrapper>
    )
  }
}
