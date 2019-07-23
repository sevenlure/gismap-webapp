import React from 'react'
import TacdongmoitruongForm from 'src/containers/ttmoitruong/tacdongmoitruong/form'
import { Button, Affix, message } from 'antd'
import { create as postCreateTacDongMoiTruong } from 'src/api/ttmoitruong/tacdongmoitruongApi'
import slug from 'src/routes'
import Router from 'next/router'

export default class TacdongmoitruongCreate extends React.Component {
  state = {
    isLoading: false
  }

  handleSubmit = async () => {
    const dataForm = await this.TacdongmoitruongForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateTacDongMoiTruong(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.ttmoitruong.tacdongmoitruong.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <TacdongmoitruongForm getRef={ref => (this.TacdongmoitruongForm = ref)} />
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
