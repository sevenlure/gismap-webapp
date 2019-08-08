import React from 'react'
import PropTypes from 'prop-types'
import BaoCaoGiamSatMoiTruongForm from 'src/containers/baocaogiamsatmoitruong/form'
import { Button, Affix, message } from 'antd'
import { create as postCreateBaoCaoGiamSatMoiTruong } from 'src/api/baocaogiamsatmoitruongApi'
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
class BaoCaoGiamSatMoiTruongCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  state = {
    isLoading: false
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.baocaogiamsatmoitruong.create])
  }

  handleSubmit = async () => {
    const dataForm = await this.BaoCaoGiamSatMoiTruongForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateBaoCaoGiamSatMoiTruong(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.baocaogiamsatmoitruong.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <BaoCaoGiamSatMoiTruongForm getRef={ref => (this.BaoCaoGiamSatMoiTruongForm = ref)} />
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

BaoCaoGiamSatMoiTruongCreate.Layout = DefaultLayout
export default BaoCaoGiamSatMoiTruongCreate
