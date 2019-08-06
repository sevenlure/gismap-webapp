import React from 'react'
import PropTypes from 'prop-types'
import { getById, updateById } from 'src/api/ttmoitruong/htxulynuocthaiApi'
import { Button, Affix, message, Spin } from 'antd'
import Router from 'next/router'
import slug, { breadcrumb } from 'src/routes'
import { connect } from 'react-redux'
import { setBreadCrumb } from 'src/redux/actions/generalAction'
import HTXuLyNuocThaiForm from 'src/containers/ttmoitruong/htxulynuocthai/form'
import DefaultLayout from 'src/layout/default'

@connect(
  null,
  {
    setBreadCrumb
  }
)
class HTXuLyNuocThaiEdit extends React.Component {
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
    this.props.setBreadCrumb(breadcrumb[slug.ttmoitruong.htxulynuocthai.edit])

    getById(this.props._id)
      .then(response => {
        const { data } = response
        this.HTXuLyNuocThaiForm.tranformData2Form(data)
      })
      .finally(() => {
        this.setState({
          isLoadedForm: true
        })
      })
  }

  handleSubmit = async () => {
    const dataForm = await this.HTXuLyNuocThaiForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    updateById(this.props._id, values)
      .then(() => {
        message.success('Cập nhật thành công')
        Router.push(slug.ttmoitruong.htxulynuocthai.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <Spin spinning={!this.state.isLoadedForm}>
          <HTXuLyNuocThaiForm isEdit getRef={ref => (this.HTXuLyNuocThaiForm = ref)} />
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

HTXuLyNuocThaiEdit.Layout = DefaultLayout
export default HTXuLyNuocThaiEdit
