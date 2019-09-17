import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal, Button } from 'antd'
import windowSize from 'react-window-size'
import ItemPromotion from './item-promotion'
import { connect } from 'react-redux'
import { map as _map, get as _get } from 'lodash-es'

const BodyWrapper = styled.div`
  flex: 1;
  .modal--title {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }

  .content-booking {
  }
`

const mapStateToProps = state => ({
  listPromotion: _get(state, 'GeneralStore.danhMuc.listPromotion', [])
})

const mapDispatchToProps = {}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@windowSize
export default class ModalChoosePromotion extends React.Component {
  static propTypes = {
    getRef: PropTypes.func,
    windowWidth: PropTypes.number,
    listPromotion: PropTypes.array,
    onChange: PropTypes.func
  }
  state = { isShow: false }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
  }
  showModal = () => {
    this.setState({
      isShow: true
    })
  }

  closeModal = () => {
    this.setState({
      isShow: false
    })
  }

  render() {
    return (
      <Modal
        centered
        closeIcon={<span />}
        closable={false}
        footer={null}
        visible={this.state.isShow}
        onCancel={this.closeModal}
        width='100%'
        style={{
          padding: this.props.windowWidth > 900 ? 24 : 24,
          maxWidth: 780
        }}
      >
        <BodyWrapper windowWidth={this.props.windowWidth}>
          <div className='modal--title'>
            <div>
              <h4 style={{ fontSize: '1.5rem' }}>Khuyến mãi</h4>
            </div>
            <Button style={{ width: 88 }} onClick={this.closeModal} size='large' type='default'>
              Đóng
            </Button>
          </div>
          <div className='content-booking'>
            {_map(this.props.listPromotion, (item, index) => {
              return <ItemPromotion key={index} onChange={this.props.onChange} item={item} />
            })}
          </div>
        </BodyWrapper>
      </Modal>
    )
  }
}