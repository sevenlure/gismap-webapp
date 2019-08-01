import React from 'react'
import PropTypes from 'prop-types'
import KhaiThacNuocDuoiDatForm from 'src/containers/ttmoitruong/khaithacnuocduoidat/form'
import { Button, Affix, message } from 'antd'
import { create as postCreateKhaiThacNuocDuoiDat } from 'src/api/ttmoitruong/khaithacnuocduoidatApi'
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
class KhaiThacNuocDuoiDatCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  state = {
    isLoading: false
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.ttmoitruong.khaithacnuocduoidat.create])
  }

  handleSubmit = async () => {
    const dataForm = await this.KhaiThacNuocDuoiDatForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateKhaiThacNuocDuoiDat(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.ttmoitruong.khaithacnuocduoidat.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <KhaiThacNuocDuoiDatForm getRef={ref => (this.KhaiThacNuocDuoiDatForm = ref)} />
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

KhaiThacNuocDuoiDatCreate.Layout = DefaultLayout
export default KhaiThacNuocDuoiDatCreate
