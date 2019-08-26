import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Result, Button, Icon } from 'antd'
import DefaultLayout from 'src/layout/default'
import Clearfix from 'src/components/elements/clearfix'
import ResultSuccess from 'static/images/icon/ic-result-success.svg'
import Router from 'next/router'
import slug from 'src/routes'

const ResultPageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .result--containt {
    width: 496px;
    padding:40px;
    border-radius: 20px;
    border: solid 1px #9ea7d0;
    background-color: white;
    border-style: dashed;
  }
`

class ResultPage extends React.Component {
  hanldeToHome = () => {
    // console.log(slug.basic,"slug.base")
    Router.push(slug.basic)
  }

  render() {
    return (
      <ResultPageWrapper>
        <Clearfix height={60} />
        <div className='result--containt'>
          <Result
            title={<h4>Đăng ký thành công</h4>}
            subTitle={
              <span>
                Chúc mừng bạn đã đăng ký thành công,
                <br /> hãy cùng nhau trải nghiệm nào.
              </span>
            }
            icon={<Icon component={ResultSuccess} />}
            // <Icon className='search--form--from-to__icon'  />
            extra={
              <Button type='default' onClick={this.hanldeToHome}>
                Về trang chủ
              </Button>
            }
          />
        </div>
      </ResultPageWrapper>
    )
  }
}

ResultPage.Layout = DefaultLayout
export default ResultPage
