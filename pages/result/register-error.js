import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Result, Button, Icon, Modal } from 'antd'
import DefaultLayout from 'src/layout/default'
import windowSize from 'react-window-size'

import Clearfix from 'src/components/elements/clearfix'
import ResultSuccess from 'static/images/icon/ic-result-error.svg'
import Register from 'src/containers/register'
import Router from 'next/router'
import slug from 'src/routes'

const ResultPageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .result--containt {
    width: 100%;
    padding: 24px;
    max-width: 496px;
  }
`
@windowSize
class ResultPage extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number
  }
  hanldeToHome = () => {
    // console.log(slug.basic,"slug.base")
    Router.push(slug.basic)
  }
  state = {
    isRegister: false
  }
  hanldeRegister = () => {
    this.setState({
      isRegister: true
    })
  }
  handleOnSucces = status => {
    // console.log(isSuccess, 'isSuccess')

    this.setState({
      isRegister: false
    })
    if (status) {
      Router.replace(slug.result.base)
    } else {
      Router.replace(slug.result.registerError)
    }
  }

  getStyleReponsive = () => {
    const { windowWidth } = this.props
    let style
    if (windowWidth >= 992) {
      style = {
        width: 968,
        bodyStyle: {
          padding: '30px 70px'
        }
      }
    } else if (windowWidth >= 576) {
      style = {
        width: 500,
        bodyStyle: {
          padding: '30px 70px'
        }
      }
    } else if (windowWidth < 576) {
      style = {}
    }
    return {
      ...style
    }
  }

  render() {
    return (
      <ResultPageWrapper windowWidth={this.props.windowWidth}>
        <Clearfix height={60} />
        <div className='result--containt'>
          <Result
            title={<h4>Đăng ký thất bại</h4>}
            subTitle={<span>Đã có sự cố xảy ra, vui lòng thử lại.</span>}
            icon={<Icon component={ResultSuccess} />}
            // <Icon className='search--form--from-to__icon'  />
            extra={
              <Row gutter={8}>
                <Col xs={12} sm={12} lg={12}>
                  <Button style={{ width: '100%' }} type='default' onClick={this.hanldeToHome}>
                    Về trang chủ
                  </Button>
                </Col>
                <Col xs={12} sm={12} lg={12}>
                  <Button style={{ width: '100%' }} type='danger' onClick={this.hanldeRegister}>
                    Thử lại
                  </Button>
                </Col>
              </Row>
            }
          />
          <Modal
            title={<h2 style={{ marginBottom: 0 }}>Đăng ký tài khoản</h2>}
            visible={this.state.isRegister}
            footer={null}
            centered
            destroyOnClose={false}
            // onOk={this.handleOk}
            {...this.getStyleReponsive()}
          >
            <Register onSuccess={this.handleOnSucces} />
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '20px',
                zIndex: 10
              }}
            >
              <Button
                type='default'
                onClick={() => {
                  this.setState({
                    isRegister: false
                  })
                }}
              >
                Đóng
              </Button>
            </div>
          </Modal>
        </div>
      </ResultPageWrapper>
    )
  }
}

ResultPage.Layout = DefaultLayout
export default ResultPage
