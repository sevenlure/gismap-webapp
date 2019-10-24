import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Table, Icon, Divider, Skeleton, Button, Popconfirm, message, Checkbox, Row, Col, Form, Input } from 'antd'
import RealEstateProjectApi from 'src/api/RealEstateProjectApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import Link from 'next/link'
import Clearfix from 'src/components/elements/clearfix'
import { UNIT_CURRENCY } from 'src/config/format.js'

const RealEstateProjectSearchWrapper = styled.div``

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class RealEstateProjectSearch extends React.Component {
  static propTypes = {
    getFieldDecorator: PropTypes.func,
    form: PropTypes.any
  }
  state = {}

  handleSubmit = () => {}

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <RealEstateProjectSearchWrapper>
        <Form layout='horizontal' onSubmit={this.handleSubmit}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label='Tên dự án'>
                {getFieldDecorator('FullName', {})(<Input size='large' placeholder='Tên dự án' />)}
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
        </Form>
      </RealEstateProjectSearchWrapper>
    )
  }
}

export default Form.create({})(RealEstateProjectSearch)
