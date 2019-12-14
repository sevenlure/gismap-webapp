import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
// import Clearfix from 'src/components/elements/clearfix'
// import { Select, Row, Col, TreeSelect } from 'antd'
// import { map as _map } from 'lodash-es'
import { connect } from 'react-redux'
import LayerHanhChinh from './layer-hanh-chinh'

const TabLayerWrapper = styled.div`
  flex: 1;
  padding: 8px;
`
const mapStateToProps = () => ({})
const mapDispatchToProps = {}
@connect(mapStateToProps, mapDispatchToProps)
class LayerControl extends React.Component {
  static propTypes = {}

  state = {
    modal: null,
    isLoading: false
  }

  render() {
    console.log(this.state.dataHanhChinh)
    return (
      <TabLayerWrapper>
        <div className='Search--layer'>
          <LayerHanhChinh />
        </div>
      </TabLayerWrapper>
    )
  }
}

export default LayerControl
