import React from 'react'
import PropTypes from 'prop-types'
import { getById, updateById } from 'src/api/thuphiApi'
import { Button, Affix, message, Spin } from 'antd'
import Router from 'next/router'
import slug, { breadcrumb } from 'src/routes'
import { connect } from 'react-redux'
import { setBreadCrumb } from 'src/redux/actions/generalAction'
import ThuPhiForm from 'src/containers/thuphi/form'
import DefaultLayout from 'src/layout/default'

@connect(
  null,
  {
    setBreadCrumb
  }
)
class ThuPhiEdit extends React.Component {
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
    this.props.setBreadCrumb(breadcrumb[slug.thuphi.edit])

    getById(this.props._id)
      .then(response => {
        const { data } = response
        this.ThuPhiForm.tranformData2Form(data)
      })
      .finally(() => {
        this.setState({
          isLoadedForm: true
        })
      })
  }

  handleSubmit = async () => {
    const dataForm = await this.ThuPhiForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    updateById(this.props._id, values)
      .then(() => {
        message.success('Cập nhật thành công')
        Router.push(slug.thuphi.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <Spin spinning={!this.state.isLoadedForm}>
          <ThuPhiForm isEdit getRef={ref => (this.ThuPhiForm = ref)} />
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

ThuPhiEdit.Layout = DefaultLayout
export default ThuPhiEdit
