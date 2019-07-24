import React from 'react'
import PropTypes from 'prop-types'
import KehoachbaovemoitruongForm from 'src/containers/ttmoitruong/kehoachbaovemoitruong/form'
import { Button, Affix, message } from 'antd'
import { create as postCreateKeHoachBaoVeMoiTruong } from 'src/api/ttmoitruong/kehoachbaovemoitruongApi'
import Router from 'next/router'
import slug, { breadcrumb } from 'src/routes'
import { connect } from 'react-redux'
import { setBreadCrumb } from 'src/redux/actions/generalAction'

@connect(
  null,
  {
    setBreadCrumb
  }
)
export default class KeHoachBaoVeMoiTruongCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  state = {
    isLoading: false
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.ttmoitruong.kehoachbaovemoitruong.create])
  }

  handleSubmit = async () => {
    const dataForm = await this.KehoachbaovemoitruongForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateKeHoachBaoVeMoiTruong(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.ttmoitruong.kehoachbaovemoitruong.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <KehoachbaovemoitruongForm getRef={ref => (this.KehoachbaovemoitruongForm = ref)} />
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
