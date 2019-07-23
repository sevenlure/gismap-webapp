import React from 'react'
import { Button, Affix, message } from 'antd'
import { create as postCreateCoso } from 'src/api/CosoApi'
import CosoForm from 'src/containers/coso/form'
import Router from 'next/router'
import slug from 'src/routes'

export default class CosoCreate extends React.Component {
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
