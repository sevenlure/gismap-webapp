import React from 'react'
import PropTypes from 'prop-types'
import HTXuLyKhiThaiForm from 'src/containers/ttmoitruong/htxulykhithai/form'
import { Button, Affix, message } from 'antd'
import { create as postCreateHTXuLyKhiThai } from 'src/api/ttmoitruong/htxulykhithaiApi'
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
class HTXuLyKhiThaiCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  state = {
    isLoading: false
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.ttmoitruong.htxulykhithai.create])
  }

  handleSubmit = async () => {
    const dataForm = await this.HTXuLyKhiThaiForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateHTXuLyKhiThai(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.ttmoitruong.htxulykhithai.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <HTXuLyKhiThaiForm getRef={ref => (this.HTXuLyKhiThaiForm = ref)} />
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

HTXuLyKhiThaiCreate.Layout = DefaultLayout
export default HTXuLyKhiThaiCreate
