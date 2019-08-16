import React from 'react'
import PropTypes from 'prop-types'
import TableListContainer from 'src/containers/log/tableListContainer'
import SearchContainer from 'src/containers/searchContainer/forLog'
import { get, pick, pickBy, identity } from 'lodash-es'
import Clearfix from 'src/components/elements/clearfix'
import { setBreadCrumb } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes'
import { connect } from 'react-redux'
import DefaultLayout from 'src/layout/default'

@connect(
  null,
  {
    setBreadCrumb
  }
)
class Index extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.manager.log.list])
  }

  onClickSearch = values => {
    const onChangeSearch = get(this.TableList, 'props.onChangeSearch')
    if (onChangeSearch) {
      let querySearch = pick(values, ['Module', 'Action', 'ActionBy', 'search'])
      querySearch = pickBy(querySearch, identity)
      onChangeSearch({
        ...querySearch,
        ['DiaChi.ValueSelected']: get(values, 'DiaChi.ValueSelected')
      })
    }
  }

  render() {
    return (
      <div>
        <Clearfix height={8} />
        <SearchContainer onClickButtonSearch={this.onClickSearch}></SearchContainer>
        <TableListContainer getRef={ref => (this.TableList = ref)} />
      </div>
    )
  }
}
Index.Layout = DefaultLayout
export default Index
