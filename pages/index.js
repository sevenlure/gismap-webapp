import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBreadCrumb } from 'src/redux/actions/generalAction'
import { get, pick, pickBy, identity, map as _map } from 'lodash-es'
import styled from 'styled-components'
// import Link from 'next/link'
import { Row, Col, Icon, Input, Button, Card } from 'antd'
import Clearfix from 'src/components/elements/clearfix'
import slug, { breadcrumb } from 'src/routes'
import DefaultLayout from 'src/layout/default'
import ArrowIconSvg from 'static/images/icon/ic-arrow-map.svg'
import ArrowIcon1Svg from 'static/images/icon/ic-arrow-map-1.svg'

const WrapperIndex = styled.div`
  display: flex;
  flex-direction: column;
  .search {
    // height: 500px;
    // width: 1440px;
    // background-image: url(/static/images/unsplash.svg);
    // padding: 80px 295px 74px;
    height: 500px;
    background-image: url(/static/images/unsplash.svg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;

    .search--container {
      padding: 16px;
    }

    .search--title {
      font-size: 50px;
      font-weight: bold;
      color: white;
      font-weight: bold;
    }
    .search--description {
      font-size: 20px;
      font-weight: 300;
      color: white;
    }
    .search--form {
      padding: 40px;
      border-radius: 4px;
      border: solid 1px #f2f3f7;
      background-color: white;
    }
    .search--form--description {
      font-size: 16px;
      font-weight: 300;
      color: #4c4c4c;
    }
    .search--form--from-to {
      .search--form--from-to__icon > svg {
        height: 2em;
        width: 2em;
      }
      .ant-input-affix-wrapper .ant-input:not(:first-child) {
        padding-left: 40px;
      }
    }
  }

  .list {
    //margin: 0px 142px 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    .list--container {
      max-width: 1156px;
      margin: 24px;
    }

    .list--title {
      font-size: 28px;
      font-weight: bold;
    }
    .list--content {
      // flex: 1;
      // display: flex;
      // flex-direction: row;
      // flex-wrap: wrap;
      // justify-content: start;
      .list--content--card {
        width: 370px;
        height: 301px;
        margin-top: 25px;
        margin-right: 10px;
        .ant-card-body {
          padding: 0px;
        }
        .list--content--card__img {
          width: 370px;
          height: 180px;
        }
        .list--content--card--title {
          padding-left: 20px;
        }
        .list--content--card--size {
          padding-left: 20px;
          color: #9ea7d0;
        }
        .list--content--card--price {
          padding-left: 20px;
          font-size: 24px;
        }
      }
    }
  }
`

const dataList = [
  {
    _id: '1',
    img: 'https://i.ibb.co/Ssx2d3W/img1.png',
    title: 'Hồ Chí Minh - Dương Minh Châu, Tây Ninh',
    size: 'Ghế 29 chỗ ngồi',
    price: '65,000'
  },
  {
    _id: '2',
    img: 'https://i.ibb.co/6v239bj/img2.png',
    title: 'Hồ Chí Minh - Dương Minh Châu, Tây Ninh',
    size: 'Ghế 29 chỗ ngồi',
    price: '65,000'
  },
  {
    _id: '3',
    img: 'https://i.ibb.co/KLqVqb1/img3.png',
    title: 'Hồ Chí Minh - Dương Minh Châu, Tây Ninh',
    size: 'Ghế 29 chỗ ngồi',
    price: '65,000'
  },
  {
    _id: '4',
    img: 'https://i.ibb.co/yk412ck/img4.png',
    title: 'Hồ Chí Minh - Dương Minh Châu, Tây Ninh',
    size: 'Ghế 29 chỗ ngồi',
    price: '65,000'
  },
  {
    _id: '5',
    img: 'https://i.ibb.co/jfPKh8n/img5.png',
    title: 'Hồ Chí Minh - Dương Minh Châu, Tây Ninh',
    size: 'Ghế 29 chỗ ngồi',
    price: '65,000'
  }
]

@connect(
  null,
  {
    setBreadCrumb
  }
)
class Index extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.coso.list])
  }

  onClickSearch = values => {
    const onChangeSearch = get(this.TableList, 'props.onChangeSearch')
    if (onChangeSearch) {
      let querySearch = pick(values, ['Coso', 'KhuCumCongNghiep', 'NganhNghe', 'CoQuanThamQuyenQuanLy', 'search'])
      querySearch = pickBy(querySearch, identity)
      onChangeSearch({
        ...querySearch,
        ['DiaChi.ValueSelected']: get(values, 'DiaChi.ValueSelected')
      })
    }
  }

  render() {
    return (
      <WrapperIndex>
        <div className='search'>
          <div className='search--container'>
            <div className='search--title'>Travel</div>
            <div className='search--description'>
              Chào mừng bạn đến với travel đặt vé xe, vui lòng đăng nhập để có trải nghiệm tốt nhất.
            </div>
            <Clearfix height={30} />
            <div className='search--form'>
              <div className='search--form--description'>
                Bạn hãy nhập điểm khởi hành và điểm muốn đến, chúng tôi sẽ tìm ra vé xe phù hợp với bạn nhất.
              </div>
              <Clearfix height={20} />
              <div className='search--form--from-to'>
                <Row gutter={8}>
                  <Col span={12}>
                    <Input
                      size='large'
                      placeholder='Điểm khởi hành'
                      prefix={<Icon className='search--form--from-to__icon' component={ArrowIconSvg} />}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      size='large'
                      placeholder='Điểm muốn đến'
                      prefix={<Icon className='search--form--from-to__icon' component={ArrowIcon1Svg} />}
                    />
                  </Col>
                </Row>
              </div>
              <Clearfix height={20} />
              <div className='search--form--button'>
                <Row>
                  <Col span={6} offset={18}>
                    <Button type='primary' block={true} size='large'>
                      Tìm vé xe
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        {/* <Clearfix height={34} /> */}
        <div className='list'>
          <div className='list--container'>
            <div className='list--title'>Tuyến đi phổ biến</div>
            <Clearfix height={12} />
            <Row gutter={{ xs: 8, sm: 16, lg: 24 }}>
              {dataList &&
                _map(dataList, item => {
                  return (
                    <Col xs={24} sm={12} lg={8} style={{ marginBottom: 24 }}>
                      <Card
                        key={item._id}
                        className='list--content--card'
                        bordered
                        cover={<img width={370} height={180} alt='' src={item.img} />}
                      >
                        {/* <div className='list--content--card__img'>
                          <img style={{ width: 370, height: 180 }} alt='' src={item.img} />
                        </div> */}
                        {/* <Clearfix height={20} /> */}
                        <div style={{ height: 90 }}>
                          <div className='list--content--card--title'>{item.title}</div>
                          <Clearfix height={7} />
                          <div className='list--content--card--size'>{item.size}</div>
                          <Clearfix height={10} />
                          <div className='list--content--card--price'>{item.price} đ</div>
                        </div>
                      </Card>
                    </Col>
                  )
                })}
            </Row>
            {/* <div className='list--content'>
              {dataList &&
                _map(dataList, item => {
                  return (
                    <Card key={item._id} className='list--content--card' bordered>
                      <div className='list--content--card__img'>
                        <img style={{ width: '100%', height: '100%' }} alt='' src={item.img} />
                      </div>
                      <Clearfix height={20} />
                      <div className='list--content--card--title'>{item.title}</div>
                      <Clearfix height={7} />
                      <div className='list--content--card--size'>{item.size}</div>
                      <Clearfix height={10} />
                      <div className='list--content--card--price'>{item.price} đ</div>
                    </Card>
                  )
                })}
            </div> */}
          </div>
        </div>
      </WrapperIndex>
    )
  }
}

Index.Layout = DefaultLayout
export default Index
