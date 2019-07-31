import React from 'react'
import PropTypes from 'prop-types'
import GiayPhepXaThaiForm from 'src/containers/ttmoitruong/giayphepxathai/form'
import { Button, Affix, message } from 'antd'
import { create as postCreateGiayPhepXaThai } from 'src/api/ttmoitruong/giayphepxathaiApi'
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
class GiayPhepXaThaiCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  state = {
    isLoading: false
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.ttmoitruong.giayphepxathai.create])
  }

  handleSubmit = async () => {
    const dataForm = await this.GiayPhepXaThaiForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateGiayPhepXaThai(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.ttmoitruong.giayphepxathai.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <GiayPhepXaThaiForm getRef={ref => (this.GiayPhepXaThaiForm = ref)} />
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

GiayPhepXaThaiCreate.Layout = DefaultLayout
export default GiayPhepXaThaiCreate
