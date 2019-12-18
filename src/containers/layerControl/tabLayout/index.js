import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import Clearfix from 'src/components/elements/clearfix'
import { Button } from 'antd'
// import { map as _map } from 'lodash-es'
import { connect } from 'react-redux'
import LayerHanhChinh from './layer-hanh-chinh'
import ComponentRnd from 'src/components/elements/component-react-rnd'

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
    isLoading: false,
    isVisibleRnd: false
  }
  hanldeOnClose = () => {
    this.setState({
      isVisibleRnd: false
    })
  }

  render() {
    console.log(this.state.dataHanhChinh)
    return (
      <TabLayerWrapper>
        <div className='Search--layer'>
          <LayerHanhChinh />
          <Clearfix height={8} />
          <Button
            type='primary'
            onClick={() => {
              this.setState({
                isVisibleRnd: !this.state.isVisibleRnd
              })
            }}
          >
            hien thi componenet keo tha
          </Button>
          <ComponentRnd
            onClose={this.hanldeOnClose}
            visible={this.state.isVisibleRnd}
            title='Municipalities - Properties'
            minWidth={200}
            minHeight={300}
            x={10}
            y={10}
          />
        </div>
      </TabLayerWrapper>
    )
  }
}

export default LayerControl
