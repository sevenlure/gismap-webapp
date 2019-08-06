import React from 'react'
import PropTypes from 'prop-types'
import KhaiThacNuocMatForm from 'src/containers/ttmoitruong/khaithacnuocmat/form'
import { Button, Affix, message } from 'antd'
import { create as postCreateKhaiThacNuocMat } from 'src/api/ttmoitruong/khaithacnuocmatApi'
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
class KhaiThacNuocMatCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  state = {
    isLoading: false
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.ttmoitruong.khaithacnuocmat.create])
  }

  handleSubmit = async () => {
    const dataForm = await this.KhaiThacNuocMatForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateKhaiThacNuocMat(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.ttmoitruong.khaithacnuocmat.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <KhaiThacNuocMatForm getRef={ref => (this.KhaiThacNuocMatForm = ref)} />
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

KhaiThacNuocMatCreate.Layout = DefaultLayout
export default KhaiThacNuocMatCreate
