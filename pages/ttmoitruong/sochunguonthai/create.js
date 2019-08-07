import React from 'react'
import PropTypes from 'prop-types'
import SoChuNguonThaiForm from 'src/containers/ttmoitruong/sochunguonthai/form'
import { Button, Affix, message } from 'antd'
import { create as postCreateSoChuNguonThai } from 'src/api/ttmoitruong/sochunguonthaiApi'
import Router from 'next/router'
import slug, { breadcrumb } from 'src/routes'
import { connect } from 'react-redux'
import { setBreadCrumb } from 'src/redux/actions/generalAction'
import DefaultLayout from 'src/layout/default'

@connect(
  null,
  {
    setBreadCrumb
  }
)
class SoChuNguonThaiCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  state = {
    isLoading: false
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.ttmoitruong.sochunguonthai.create])
  }

  handleSubmit = async () => {
    const dataForm = await this.SoChuNguonThaiForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateSoChuNguonThai(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.ttmoitruong.sochunguonthai.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <SoChuNguonThaiForm getRef={ref => (this.SoChuNguonThaiForm = ref)} />
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

SoChuNguonThaiCreate.Layout = DefaultLayout
export default SoChuNguonThaiCreate
