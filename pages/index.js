import React from 'react'
import PropTypes from 'prop-types'
import { get as _get, map as _map, pick as _pick } from 'lodash-es'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Row, Col, Button, Card, Form } from 'antd'
import { getFormatNumber } from 'src/config/format'
import { getListTourSearch, setIsLoadedListTourSearch } from 'src/redux/actions/BookingAction'
import DefaultLayout from 'src/layout/default'
import windowSize from 'react-window-size'
import moment from 'moment'
// NOTE Element
import Clearfix from 'src/components/elements/clearfix'
import SelectDeparture from 'src/components/elements/select-departure'
import Booking from 'src/containers/booking'
import slug from 'src/routes'
// import InfoCustomer from 'src/containers/booking/info-customer'

const WrapperIndex = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  .search {
    height: 500px;
    background-image: url(/static/images/unsplash.png);
    background-repeat:no-repeat;
    background-position: center;
    background-attachment: initial;
    display: flex;
    align-items: center;
    justify-content: center;

    .search--container {

    }

    .search--title {
      font-size: 3.125rem;
      font-weight: bold;
      color: white;
      font-family: myFont-Bold;
      font-weight: bold;
    }
    .search--description {
      font-size: 1.25rem;
      font-weight: 300;
      color: white;
    }
    .search--form {
      ${props => (props.windowWidth >= 992 ? 'padding: 40px;' : '')}
      ${props => (props.windowWidth >= 576 ? 'padding: 20px;' : '')}
      ${props => (props.windowWidth < 576 ? 'padding: 8px;' : '')}
      border-radius: 4px;
      border: solid 1px #f2f3f7;
      background-color: white;
    }
    .search--form--description {
      font-size: 1rem;
    }
    .search--form--from-to {
      .search--form--from-to__icon > svg {
        
      }
      .ant-input-affix-wrapper .ant-input:not(:first-child) {
        padding-left: 40px;
      }
    }
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: center;

    .list--container {
      max-width: 1224px;
      margin: 34px;
    }

    .list--title {
      font-size: 1.75rem;
      font-weight: bold;
      font-family: myFont-Medium;
    }
    .list--content--card {
      max-width: 370px;
      cursor: pointer;
      .ant-card-body {
        padding: 0px;
      }
      .list--content--card__img {
        width: 370px;
        height: 180px;
      }
      .list--content--card--title {
        padding-left: 20px;
        padding-top:20px;
      }
      .list--content--card--size {
        padding-left: 20px;
        color: #9ea7d0;
      }
      .list--content--card--price {
        padding-left: 20px;
        font-size: 1.5rem;
        font-family: myFont-Medium ;
      }
    }
  }
`

const mapStateToProps = state => ({
  listTourPopular: _get(state, 'GeneralStore.listTourPopular', []),
  listDeparture: _get(state, 'GeneralStore.danhMuc.listDeparture', []),
  listTourSearch: _get(state, 'BookingStore.listTourSearch', []),
  isLoadedlistTourSearch: _get(state, 'BookingStore.isLoadedlistTourSearch', null)
})
const mapDispatchToProps = {
  getListTourSearch,
  setIsLoadedListTourSearch
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@windowSize
class Index extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number,
    listTourPopular: PropTypes.array,
    listDeparture: PropTypes.array,
    getListTourSearch: PropTypes.func,
    listTourSearch: PropTypes.array,
    isLoadedlistTourSearch: PropTypes.bool,
    setIsLoadedListTourSearch: PropTypes.func,
    form: PropTypes.any
  }

  state = {
    isBooking: false,
    querySearch: null
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.isLoadedlistTourSearch != prevProps.isLoadedlistTourSearch &&
      this.props.isLoadedlistTourSearch === true
    ) {
      this.setState({
        isBooking: true
      })
    }
  }

  hasErrors = fieldsError => {
    // console.log(fieldsError, 'fieldsError')
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }
  hanldeSearch = e => {
    // console.log('hanldeSearch')
    history.pushState({}, slug.basic)
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
      }
      this.searchTour(values)
    })
  }

  searchTour = async values => {
    this.setState(
      {
        querySearch: {
          ..._pick(values, ['from', 'to']),
          date: moment()
        }
      },
      async () => {
        this.props.setIsLoadedListTourSearch(false)

        await Promise.all([
          this.props.getListTourSearch({
            ...this.state.querySearch
          })
        ]).then(() => {
          this.props.setIsLoadedListTourSearch(true)
        })
      }
    )
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.setIsLoadedListTourSearch(true)
    this.props.form.validateFields()
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldValue } = this.props.form
    const { isBooking } = this.state
    return (
      <WrapperIndex windowWidth={this.props.windowWidth}>
        {!isBooking && (
          <div>
            <div className='search'>
              <div className='search--container'>
                <div style={{ margin: 16 }}>
                  <Clearfix height={24} />
                  <div className='search--title'>Travel</div>
                  <div className='search--description'>
                    <span>Chào mừng bạn đến với travel đặt vé xe, vui lòng đăng nhập để có trải nghiệm tốt nhất.</span>
                  </div>
                  <Clearfix height={30} />
                  <Form>
                    <div className='search--form'>
                      <div className='search--form--description'>
                        <span>
                          Bạn hãy nhập điểm khởi hành và điểm muốn đến, chúng tôi sẽ tìm ra vé xe phù hợp với bạn nhất.
                        </span>
                      </div>
                      <Clearfix height={20} />
                      <div className='search--form--from-to'>
                        <Row gutter={8}>
                          <Col xs={24} sm={12} lg={12} style={{ marginBottom: 8 }}>
                            {getFieldDecorator('from', {
                              rules: [{ required: true, message: 'Vui lòng chọn điểm khởi hành!' }]
                            })(
                              <SelectDeparture
                                placeholder='Điểm khởi hành'
                                isFrom={true}
                                keyDisable={getFieldValue('to')}
                              />
                            )}
                          </Col>
                          <Col xs={24} sm={12} lg={12} style={{ marginBottom: 8 }}>
                            {getFieldDecorator('to', {
                              rules: [{ required: true, message: 'Vui lòng chọn điểm muốn đến!' }]
                            })(
                              <SelectDeparture
                                placeholder='Điểm muốn đến'
                                isFrom={false}
                                keyDisable={getFieldValue('from')}
                              />
                            )}
                          </Col>
                        </Row>
                      </div>
                      <Clearfix height={20} />
                      <div className='search--form--button'>
                        <Row>
                          <Col xs={24} sm={{ span: 6, offset: 18 }} lg={{ span: 6, offset: 18 }}>
                            <Button
                              onClick={this.hanldeSearch}
                              type='primary'
                              block={true}
                              size='large'
                              loading={!this.props.isLoadedlistTourSearch}
                              disabled={this.hasErrors(getFieldsError())}
                            >
                              Tìm vé xe
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Form>
                  <Clearfix height={74} />
                </div>
              </div>
            </div>
            <div className='list'>
              <div className='list--container'>
                <div className='list--title'>Tuyến đi phổ biến</div>
                <Clearfix height={25} />
                <Row gutter={{ xs: 8, sm: 16, lg: 24 }} style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {this.props.listTourPopular &&
                    _map(this.props.listTourPopular, item => {
                      item = {
                        ...item,
                        from: _get(item, 'fromDeparture.id', null),
                        to: _get(item, 'toDeparture.id', null)
                      }
                      return (
                        <Col key={item.id} xs={24} sm={12} lg={8} style={{ marginBottom: 24 }}>
                          <Card
                            key={item.id}
                            className='list--content--card'
                            onClick={() => this.searchTour(item)}
                            bordered
                            cover={
                              <img width={370} height={180} alt='' src={`${process.env.HOST_MEDIA}${item.image}`} />
                            }
                          >
                            <div>
                              <div className='list--content--card--title'>
                                <span>{_get(item, 'fromDeparture.name', '').replace(/-/gi, ',')}</span>
                                {` - `}
                                <span>{_get(item, 'toDeparture.name', '').replace(/-/gi, ',')}</span>
                              </div>
                              <Clearfix height={7} />
                              <div className='list--content--card--size'>
                                <span>Ghế {item.seat} chỗ ngồi</span>
                              </div>
                              <Clearfix height={10} />
                              <div className='list--content--card--price'>{getFormatNumber(item.price)} đ</div>
                              <Clearfix height={20} />
                            </div>
                          </Card>
                        </Col>
                      )
                    })}
                </Row>
              </div>
            </div>
          </div>
        )}
        {isBooking && <Booking querySearch={this.state.querySearch} />}
      </WrapperIndex>
    )
  }
}
Index.Layout = DefaultLayout

export default Form.create({})(Index)
