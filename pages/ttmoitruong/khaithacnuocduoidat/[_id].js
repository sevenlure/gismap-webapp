import React from 'react'
import PropTypes from 'prop-types'
import { getById, updateById } from 'src/api/ttmoitruong/khaithacnuocduoidatApi'
import { Button, Affix, message, Spin } from 'antd'
import Router from 'next/router'
import slug, { breadcrumb } from 'src/routes'
import { connect } from 'react-redux'
import { setBreadCrumb } from 'src/redux/actions/generalAction'
import KhaiThacNuocDuoiDatForm from 'src/containers/ttmoitruong/khaithacnuocduoidat/form'
import DefaultLayout from 'src/layout/default'

@connect(
  null,
  {
    setBreadCrumb
  }
)
class KhaiThacNuocDuoiDatEdit extends React.Component {
  static propTypes = {
    _id: PropTypes.string,
    setBreadCrumb: PropTypes.any
  }

  static getInitialProps = ({ query }) => {
    const { _id } = query
    return {
      _id
    }
  }
  state = {
    isLoadedForm: false,
    isLoading: false
  }

  async componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.ttmoitruong.khaithacnuocduoidat.edit])

    getById(this.props._id)
      .then(response => {
        const { data } = response
        this.KhaiThacNuocDuoiDatForm.tranformData2Form(data)
      })
      .finally(() => {
        this.setState({
          isLoadedForm: true
        })
      })
  }

  handleSubmit = async () => {
    const dataForm = await this.KhaiThacNuocDuoiDatForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    updateById(this.props._id, values)
      .then(() => {
        message.success('Cập nhật thành công')
        Router.push(slug.ttmoitruong.khaithacnuocduoidat.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <Spin spinning={!this.state.isLoadedForm}>
          <KhaiThacNuocDuoiDatForm isEdit getRef={ref => (this.KhaiThacNuocDuoiDatForm = ref)} />
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
                Cập nhật
              </Button>
            </div>
          </Affix>
        </Spin>
      </div>
    )
  }
}

KhaiThacNuocDuoiDatEdit.Layout = DefaultLayout
export default KhaiThacNuocDuoiDatEdit
