import React from 'react'
import PropTypes from 'prop-types'
import ThanhTraKiemTraForm from 'src/containers/thanhtrakiemtra/form'
import { Button, Affix, message } from 'antd'
import { create as postCreateThanhTraKiemTra } from 'src/api/thanhtrakiemtraApi'
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
class ThanhTraKiemTraCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  state = {
    isLoading: false
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.thanhtrakiemtra.create])
  }

  handleSubmit = async () => {
    const dataForm = await this.ThanhTraKiemTraForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateThanhTraKiemTra(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.thanhtrakiemtra.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <ThanhTraKiemTraForm getRef={ref => (this.ThanhTraKiemTraForm = ref)} />
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

ThanhTraKiemTraCreate.Layout = DefaultLayout
export default ThanhTraKiemTraCreate
