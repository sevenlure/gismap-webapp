import React from 'react'
import PropTypes from 'prop-types'
import BaoCaoQuanLyChatThaiRanForm from 'src/containers/baocaoquanlychatthairan/form'
import { Button, Affix, message } from 'antd'
import { create as postCreateBaoCaoQuanLyChatThaiRan } from 'src/api/baocaoquanlychatthairanApi'
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
class BaoCaoQuanLyChatThaiRanCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  state = {
    isLoading: false
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.baocaoquanlychatthairan.create])
  }

  handleSubmit = async () => {
    const dataForm = await this.BaoCaoQuanLyChatThaiRanForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateBaoCaoQuanLyChatThaiRan(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.baocaoquanlychatthairan.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <BaoCaoQuanLyChatThaiRanForm getRef={ref => (this.BaoCaoQuanLyChatThaiRanForm = ref)} />
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

BaoCaoQuanLyChatThaiRanCreate.Layout = DefaultLayout
export default BaoCaoQuanLyChatThaiRanCreate
