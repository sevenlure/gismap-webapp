import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Skeleton, Row, Col, Collapse, Button, Affix } from 'antd'
import organizationApi from 'src/api/organizationApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { get as _get, map as _map } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import ImageToken from 'src/components/elements/image-token'
import Link from 'next/link'
import Clearfix from 'src/components/elements/clearfix'

const { Panel } = Collapse
const ManagerOrganizationWrapper = styled.div`
  display: flex;

  .image {
    max-height: 300px;
    display: flex;
  }
`

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath,
  updateBackgroundColor
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class ManagerOrganization extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func,
    updateBackgroundColor: PropTypes.func
  }
  state = {
    isLoading: true,
    dataSource: null
  }

  getInitial = async () => {
    try {
      const res = await organizationApi.getInfo()
      if (res.status === 200) {
        this.setState({
          dataSource: _get(res, 'data', [])
        })
      }
    } catch (ex) {
      const { response } = ex
      // console.log('catch', response)
      getInfoErrorfetch(response)
    } finally {
      this.setState({
        isLoading: false
      })
    }
  }

  componentDidMount = async () => {
    const pathPage = slug.manager.organization.info
    this.props.updateBackgroundColor('#fff')
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
    this.getInitial()
  }

  renderUser = dataListUser => {
    return _map(dataListUser, (itemUser, index) => {
      return <p key={index}>{`${index + 1} - ${itemUser.FullName} - ${itemUser.PosittionName}`}</p>
    })
  }

  render() {
    const url = _get(this.state.dataSource, 'LinkFile', null)
    const Structure = _get(this.state.dataSource, 'Structure', null)
    // console.log('render', this.state.dataSource)
    return (
      <ManagerOrganizationWrapper>
        {this.state.isLoading && <Skeleton paragraph={{ rows: 7 }} />}
        {!this.state.isLoading && (
          <div style={{ flex: 1 }}>
            <Row>
              <Col span={24}>
                <h4>Sơ đồ tổ chức</h4>
              </Col>
              <Col span={24}>
                <div className='image' style={{}}>
                  <ImageToken src={url} />
                </div>
              </Col>
            </Row>
            <Clearfix height={16} />
            <Row>
              <Col span={24}>
                <h4>Cán bộ hiển thị theo phòng ban</h4>
              </Col>
              <Col span={24}>
                <Collapse
                // activeKey={['1', '2']}
                //   defaultActiveKey={['1', '2']}
                >
                  {_map(Structure, itemDepartment => {
                    const headerName = _get(itemDepartment, 'Department.Name', '')
                    const key = _get(itemDepartment, 'Department._id', '')
                    const dataListUser = _get(itemDepartment, 'ListUserShow', [])
                    return (
                      <Panel showArrow={false} header={headerName} key={key}>
                        {this.renderUser(dataListUser)}
                      </Panel>
                    )
                  })}
                </Collapse>
              </Col>
            </Row>
            <Clearfix height={32} />
            <Affix offsetBottom={20}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href={slug.manager.organization.edit} as={`${slug.manager.organization.edit}`}>
                  <Button type='primary' icon='edit'>
                    Cập nhật
                  </Button>
                </Link>
              </div>
            </Affix>
          </div>
        )}
      </ManagerOrganizationWrapper>
    )
  }
}

ManagerOrganization.Layout = DefaultLayout
export default ManagerOrganization
