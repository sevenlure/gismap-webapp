import React from 'react'
import PropTypes from 'prop-types'
import HTXuLyNuocThaiForm from 'src/containers/ttmoitruong/htxulynuocthai/form'
import { Button, Affix, message } from 'antd'
import { create as postCreateHTXuLyNuocThai } from 'src/api/ttmoitruong/htxulynuocthaiApi'
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
class HTXuLyNuocThaiCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  state = {
    isLoading: false
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.ttmoitruong.htxulynuocthai.create])
  }

  handleSubmit = async () => {
    const dataForm = await this.HTXuLyNuocThaiForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateHTXuLyNuocThai(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.ttmoitruong.htxulynuocthai.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <HTXuLyNuocThaiForm getRef={ref => (this.HTXuLyNuocThaiForm = ref)} />
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

HTXuLyNuocThaiCreate.Layout = DefaultLayout
export default HTXuLyNuocThaiCreate
