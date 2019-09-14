import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import ItemPromotion from 'src/containers/promotion/item-promotion'
import Clearfix from 'src/components/elements/clearfix'
import { Skeleton } from 'antd'
import { connect } from 'react-redux'
import { get as _get, map as _map } from 'lodash-es'

const WrapperPage = styled.div`
  min-height: calc(100vh - 140px);
  background: #fff;
  display: flex;
  justify-content: center;

  .content {
    margin-top: 50px;
    max-width: 682px;
    width: 100%;
  }
  .title {
    display: flex;
    justify-content: center;
  }
`

@connect(
  state => ({
    danhMucIsLoaded: _get(state, 'GeneralStore.danhMucIsLoaded'),
    listPromotion: _get(state, 'GeneralStore.danhMuc.listPromotion', [])
  }),
  {}
)
class PromotionPage extends React.Component {
  static propTypes = {
    danhMucIsLoaded: PropTypes.bool,
    listPromotion: PropTypes.array
  }
  render() {
    return (
      <WrapperPage>
        <div className='content'>
          <h1>Chương trình khuyến mãi</h1>
          <Clearfix height={16} />
          {!this.props.danhMucIsLoaded &&
            _map([1, 2, 3], key => {
              return (
                <div
                  key={key}
                  style={{
                    background: 'white',
                    marginBottom: '20px',
                    borderRadius: 12,
                    border: 'solid 1px #e6e6e6',
                    padding: 20
                  }}
                >
                  <Skeleton paragraph={{ rows: 2 }} active />
                </div>
              )
            })}

          {this.props.listPromotion.map(item => {
            return <ItemPromotion key={item.code} item={item} />
          })}
        </div>
      </WrapperPage>
    )
  }
}

PromotionPage.Layout = DefaultLayout
export default PromotionPage
