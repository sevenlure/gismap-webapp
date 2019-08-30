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
import queryString from 'query-string'

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
  state = {
    title: '',
    message: ''
  }
  hanldeToHome = () => {
    // console.log(slug.basic,"slug.base")
    Router.push(slug.basic)
  }
  state = {
    isRegister: false
  }
  componentDidMount = () => {
    const parsed = queryString.parse(location.search)
    // console.log(parsed)
    if (parsed) {
      this.setState({
        title: parsed.title,
        message: parsed.message
      })
    }
    //=> {foo: 'bar'}
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
            title={<h4>{this.state.title}</h4>}
            subTitle={<span>{this.state.message ? this.state.message + '.' : <span>&nbsp;</span>}</span>}
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
