import React from 'react'
import PropTypes from 'prop-types'
import { get as _get, map as _map } from 'lodash-es'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Row, Col, Button, Card, Form, Select, Input, Divider, Icon } from 'antd'
import { getFormatNumber } from 'src/config/format'
import DefaultLayout from 'src/layout/default'
import windowSize from 'react-window-size'

// NOTE Element
import Clearfix from 'src/components/elements/clearfix'
import SelectDeparture from 'src/components/elements/select-departure'
import IconSvg from 'icons'
// import InputOTP from 'src/components/elements/input-OTP'
const { Option } = Select

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

const BookingContainer = styled.div`
  display: flex;

  .left--booking {
    width: 472px;
    height: 1024px;
    box-shadow: 1px 0 0 0 #e6e6e6;
    background-color: #fff;

    .left--booking--content {
      padding: 24px;
    }
  }

  .right--booking {
    flex: 1;
    background: #f2f3f7;

    .right--booking--content {
      .right--booking--content--header {
        padding: 24px;
        display: flex;
        justify-content: space-between;
      }
      .right--booking--content--body {
        padding: 24px;
      }
    }
  }
`

@connect(state => ({
  listTour: _get(state, 'GeneralStore.listtour', []),
  listDeparture: _get(state, 'GeneralStore.danhMuc.listDeparture', [])
}))
@windowSize
class Index extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number,
    listTour: PropTypes.array,
    listDeparture: PropTypes.array,
    form: PropTypes.any
  }

  hasErrors = fieldsError => {
    // console.log(fieldsError, 'fieldsError')
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }
  hanldeSearch = e => {
    // console.log('hanldeSearch')
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
      // console.log('err: ', values)
    })
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form
    // console.log(process.env.HOST_MEDIA)

    return (
      <WrapperIndex windowWidth={this.props.windowWidth}>
        {/* <InputOTP numInputs={4}/> */}
        <div style={{ display: 'none' }}>
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
                          {getFieldDecorator('diemKhoiHanh', {
                            rules: [{ required: true, message: 'Vui lòng chọn điểm khởi hành!' }]
                          })(<SelectDeparture placeholder='Điểm khởi hành' isFrom={true} />)}
                        </Col>
                        <Col xs={24} sm={12} lg={12} style={{ marginBottom: 8 }}>
                          {getFieldDecorator('diemDen', {
                            rules: [{ required: true, message: 'Vui lòng chọn điểm muốn đến!' }]
                          })(<SelectDeparture placeholder='Điểm muốn đến' isFrom={false} />)}
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
              <Row gutter={{ xs: 8, sm: 16, lg: 24 }}>
                {this.props.listTour &&
                  _map(this.props.listTour, item => {
                    return (
                      <Col key={item.id} xs={24} sm={12} lg={8} style={{ marginBottom: 24 }}>
                        <Card
                          key={item.id}
                          className='list--content--card'
                          bordered
                          cover={<img width={370} height={180} alt='' src={`${process.env.HOST_MEDIA}${item.image}`} />}
                        >
                          <div>
                            <div className='list--content--card--title'>
                              <span>{item.title}</span>
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
        <BookingContainer>
          <div className='left--booking'>
            <div className='left--booking--content'>
              <h3>Tuyến đi</h3>
            </div>
          </div>
          <div className='right--booking'>
            <div className='right--booking--content'>
              <div className='right--booking--content--header'>
                <Select size='large' defaultValue='timeRunAsc' style={{ width: 208 }}>
                  <Option value='timeRunAsc'>Giờ chạy tăng dần</Option>
                  <Option value='timeRunDesc'>Giờ chạy giảm dần</Option>
                </Select>
                <Input
                  style={{ width: 320 }}
                  size='large'
                  placeholder='Nhập từ khóa cần tìm kiếm...'
                  prefix={<Icon component={IconSvg.search} />}
                />
              </div>
              <Divider style={{ margin: 0 }} />
              <div className='right--booking--content--body'>
                <h3>Body</h3>
              </div>
            </div>
          </div>
        </BookingContainer>
      </WrapperIndex>
    )
  }
}
Index.Layout = DefaultLayout

export default Form.create({})(Index)
