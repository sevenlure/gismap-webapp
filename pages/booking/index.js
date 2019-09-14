import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import Booking from 'src/containers/booking'
import DefaultLayout from 'src/layout/default'
import { connect } from 'react-redux'
import { get as _get, isEmpty as _isEmpty } from 'lodash-es'
import { getListTourSearch, setIsLoadedListTourSearch } from 'src/redux/actions/BookingAction'

const mapStateToProps = state => ({
  filter: _get(state, 'BookingStore.filter', {})
})
const mapDispatchToProps = {
  getListTourSearch,
  setIsLoadedListTourSearch
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class BookingPage extends React.Component {
  static propTypes = {
    filter: PropTypes.object,
    getListTourSearch: PropTypes.func,
    setIsLoadedListTourSearch: PropTypes.func
  }

  componentDidMount = async () => {
    if (!_isEmpty(this.props.filter)) {
      this.props.setIsLoadedListTourSearch(false)
      await Promise.all([
        this.props.getListTourSearch({
          ...this.props.filter
        })
      ]).then(() => {
        this.props.setIsLoadedListTourSearch(true)
      })
    }
  }
  render() {
    // console.log('--', this.props)
    return (
      <div>
        <Booking querySearch={this.props.filter} />
      </div>
    )
  }
}

BookingPage.Layout = DefaultLayout
export default BookingPage
