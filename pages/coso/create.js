import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Row, Col, Button, Input, DatePicker, Radio, Affix, message } from 'antd'
import { create as postCreateCoso } from 'src/api/CosoApi'
import CosoForm from 'src/containers/coso/form'
import Router from 'next/router'
import slug from 'src/routes'
// import SelectNganhNghe from 'src/components/elements/select-nganh-nghe'

const ContainerCustomRow = styled.div`
  .ant-col.ant-form-item-label,
  .has-error {
    line-height: 20px;
  }

  .ant-form-item {
    margin-bottom: 0px;
  }
`

export default class CosoCreate extends React.Component {
  static propTypes = {
    // form: PropTypes.object.isRequired
  }

  state = {
    isLoading: false
  }

  handleSubmit = async () => {
    const dataForm = await this.CosoForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateCoso(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.coso.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <CosoForm getRef={ref => (this.CosoForm = ref)} />
        <Affix offsetBottom={20}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              loading={this.state.isLoading}
              size='large'
              style={{ marginRight: 8, width: 120 }}
              type='primary'
              onClick={() => {
                this.setState(
                  {
                    isLoading: true
                  },
                  () => {
                    this.handleSubmit()
                  }
                )
              }}
            >
              Tạo mới
            </Button>
          </div>
        </Affix>
      </div>
    )
  }
}
