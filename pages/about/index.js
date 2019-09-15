import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'

const WrapperPage = styled.div`
  min-height: calc(100vh - 140px);
  background: #fff;
  display: flex;
  justify-content: center;

  .content {
    margin: 50px 24px;
    max-width: 800px;
    width: 100%;

    .slogan--container {
      margin-bottom: 24px;
      .slogan--container--title {
        font-size: 1.5rem;
        font-family: myFont-Bold;
        font-weight: bold;
      }
      .slogan--container--body {
        color: #9ea7d0;
        font-family: myFont-Light;
      }
    }

    .info--container {
      margin-bottom: 16px;
      .info--container--title {
        font-size: 1.125rem;
        font-family: myFont-Bold;
        font-weight: bold;
      }
      .info--container--body {
        font-family: myFont-Light;
      }
    }
  }

  .subtitle {
    font-size: 1.125rem;
  }
`

class AboutPage extends React.Component {
  render() {
    return (
      <WrapperPage>
        <div className='content'>
          <div className='slogan--container'>
            <div className='slogan--container--title'>Bến xe Đồng Phước</div>
            <div className='slogan--container--body'>[Slogan] Xe khách chất lượng cao</div>
          </div>
          <div className='info--container'>
            <div className='info--container--title'>Địa chỉ nhà xe</div>
            <div className='info--container--body'>
              - 01 Võ Văn Truyện, Phường 2, Thành phố Tây Ninh (Bến Xe Khách Tây Ninh).
            </div>
            <div className='info--container--body'>- 137 Đào Duy Từ, Hồ Chí Minh.</div>
          </div>

          <div className='info--container'>
            <div className='info--container--title'>Thông tin tổng quát</div>
            <div className='info--container--body'>(Có xe trung chuyển tại 2 đầu)</div>
            <div className='info--container--body'>Tổ chức tour du lịch, vận chuyển khách theo hợp đồng.</div>
            <div className='info--container--body'>Xe đời mới: 07 chỗ - 16 chỗ - 39 chỗ - 47 chỗ.</div>
            <div className='info--container--body'>Nhận Chuyển Hàng Hóa - Bưu Phẩm hỏa tốc.</div>
            <div className='info--container--body'>Nhanh Chóng - Thuận Tiện - An Toàn - Văn Minh.</div>
          </div>

          <div className='info--container'>
            <div className='info--container--title'>Tuyến đi</div>
            <div className='info--container--body'>- Tây Ninh đi Cà Mau và ngược lại.</div>
            <div className='info--container--body'>- Tây Ninh đi Hà Tiên và ngược lại.</div>
            <div className='info--container--body'>- Tây Ninh đi Cần Thơ và ngược lại.</div>
            <div className='info--container--body'>- Tây Ninh đi Thạnh Phú (Bến Tre) và ngược lại.</div>
          </div>
        </div>
      </WrapperPage>
    )
  }
}

AboutPage.Layout = DefaultLayout
export default AboutPage
