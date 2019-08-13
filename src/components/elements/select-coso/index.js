import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Select, Spin, Empty } from 'antd'
import { map as _map, debounce as _debounce, isObject, get as _get } from 'lodash-es'
import { getList } from 'src/api/CosoApi'

const { Option } = Select

const ElementWrapper = styled.div`
  flex: 1;
`

const LoadingContainer = () => (
  <div
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', justifyItems: 'cener', minHeight: 134 }} //height 134 == voi emty
  >
    <Spin size='large' />
  </div>
)

// const PICK_LIST = ['_id', 'Ten']

// NOTE  Cơ sở đặc thù là search remote server nên khi edit cần _id và Name
class SelectCoso extends React.Component {
  static propTypes = {
    initialOptions: PropTypes.array,
    danhMucIsLoaded: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.any,
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    isDisabled: false
  }

  state = {
    options: [],
    isLoaded: false,
    value: undefined,
    isLoadingSearch: false
  }

  componentDidMount() {
    this.initialData()
  }

  initialData = () => {
    getList({}).then(response => {
      const { data } = response
      const { list } = data
      this.setState({ options: list, isLoaded: true })
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.state.value) {
      if (isObject(nextProps.value))
        this.setState({
          value: {
            key: _get(nextProps, 'value._id'),
            label: `${_get(nextProps, 'value.Ten')} - ${_get(nextProps, 'value.SoGiayPhep_DKKD')}`
          }
        })
      else this.setState({ value: { key: nextProps.value } })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isLoadingSearch && this.state.isLoadingSearch === nextState.isLoadingSearch) return false
    return true
  }

  hanldeOnchange = value => {
    this.setState({
      value: value
    })
    if (this.props.onChange) this.props.onChange(value.key)
  }

  handleSearch = value => {
    let query = {}
    if (value) query.search = value
    getList(query).then(response => {
      const { data } = response
      const { list } = data
      this.setState({ options: list, isLoadingSearch: false })
    })
  }

  debounceSearch = _debounce(this.handleSearch, 400)

  render() {
    return (
      <ElementWrapper>
        <Spin spinning={!this.state.isLoaded}>
          <Select
            showSearch
            labelInValue
            disabled={this.props.isDisabled}
            defaultActiveFirstOption={false}
            showArrow={false}
            notFoundContent={
              this.state.isLoadingSearch ? <LoadingContainer /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
            dropdownClassName='pop-height-400'
            style={{ width: '100%' }}
            value={this.state.value}
            onChange={this.hanldeOnchange}
            placeholder='Vui lòng chọn'
            filterOption={false}
            onSearch={val => {
              this.setState({ isLoadingSearch: true, options: [] }, this.debounceSearch.bind(this, val))
            }}
            loading={this.state.isLoadingSearch}
          >
            {_map(this.state.options, item => {
              return (
                <Option key={item._id} value={item._id}>
                  {item.Ten} - {item.SoGiayPhep_DKKD}
                </Option>
              )
            })}
          </Select>
        </Spin>
      </ElementWrapper>
    )
  }
}
export default SelectCoso
