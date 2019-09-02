import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Button } from 'antd'
import moment from 'moment'
import StepPicker from './step'
import Clearfix from 'src/components/elements/clearfix'

moment.defineLocale('en-au', {
  monthsShort: 'Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12'.split(
    '_'
  ),
  weekdays: 'Chủ nhật_Thứ 2_Thứ 3_Thứ 4_Thứ 5_Thứ 6_Thứ 7'.split('_')
})

export default class DateStepPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      targetDate: moment(),
      isOpenCalendar: false
    }
  }

  static propTypes = {
    getRef: PropTypes.func
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
  }

  closeCalendar = () => {
    this.setState({ isOpenCalendar: false })
  }

  render() {
    return (
      <div>
        <DatePicker
          locale={{ monthFormat: 'YYYY' }}
          open={this.state.isOpenCalendar}
          format='dddd, [ngày] D [tháng] M, YYYY'
          defaultValue={this.state.targetDate}
          value={this.state.targetDate}
          showToday={false}
          style={{ width: '100%' }}
          onOpenChange={status => {
            this.setState({ isOpenCalendar: status })
          }}
          dropdownClassName='custom-calendar'
          onChange={date => {
            this.setState({ targetDate: date, isOpenCalendar: true }, () => {
              this.StepPicker.changeVal(date)
            })
          }}
          disabledDate={current => {
            const today = moment()
            const yesterday = today.add('day', -1).endOf('day')
            return current && current <= yesterday
          }}
          renderExtraFooter={() => (
            <div style={{ textAlign: 'right', padding: '8px 12px', marginBottom: 8 }}>
              <Button onClick={this.closeCalendar} type='primary'>
                <strong>Xong</strong>
              </Button>
            </div>
          )}
        />
        <Clearfix height={20} />
        <StepPicker
          getRef={ref => (this.StepPicker = ref)}
          onChange={val => {
            this.setState({ targetDate: val })
          }}
        />
      </div>
    )
  }
}
