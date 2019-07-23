import React from 'react'
import PropTypes from 'prop-types'
import { Button, Affix, message } from 'antd'
import { connect } from 'react-redux'
import { setBreadCrumb } from 'src/redux/actions/generalAction'
import { create as postCreateCoso } from 'src/api/CosoApi'
import CosoForm from 'src/containers/coso/form'
import Router from 'next/router'
import slug, { breadcrumb } from 'src/routes'

@connect(
  null,
  {
    setBreadCrumb
  }
)
export default class CosoCreate extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }
  
  componentDidMount(){
    this.props.setBreadCrumb(breadcrumb[slug.coso.create])
  }

  state = {
    isLoading: false
  }

  handleSubmit = async () => {
    const dataForm = await this.CosoForm.getFormData()
    const { err, values } = dataForm
    if (err) {
      this.setState({ isLoading: false })
      return
    }
    postCreateCoso(values)
      .then(() => {
        message.success('Thêm mới thành công')
        Router.push(slug.coso.list)
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div>
        <CosoForm getRef={ref => (this.CosoForm = ref)} />
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