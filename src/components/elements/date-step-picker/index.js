import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DatePicker, Button, Icon } from 'antd'
import moment from 'moment'
import StepPicker from './step'
import Clearfix from 'src/components/elements/clearfix'
import IconSvg from 'icons'

moment.updateLocale('en-au', {
  monthsShort: 'Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12'.split(
    '_'
  ),
  weekdays: 'Chủ nhật_Thứ 2_Thứ 3_Thứ 4_Thứ 5_Thứ 6_Thứ 7'.split('_'),
  weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
  weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_')
})

const Wrapper = styled.div`
  .ant-calendar-picker-input,
  .ant-calendar-picker {
    cursor: pointer;
  }
`
export default class DateStepPicker extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.any,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      targetDate: this.props.defaultValue,
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
      <Wrapper>
        <DatePicker
          allowClear={false}
          size='large'
          locale={{ monthFormat: 'YYYY' }}
          open={this.state.isOpenCalendar}
          format='dddd, [ngày] D [tháng] M, YYYY'
          defaultValue={this.state.targetDate}
          value={this.state.targetDate}
          showToday={false}
          style={{ width: '100%' }}
          suffixIcon={
            <Icon style={{ fontSize: 24, transform: 'translate(-6px, -4px)' }} component={IconSvg.calendar} />
          }
          onOpenChange={status => {
            this.setState({ isOpenCalendar: status })
          }}
          dropdownClassName='custom-calendar'
          onChange={date => {
            if (date) {
              this.setState({ targetDate: date, isOpenCalendar: true }, () => {
                this.StepPicker.changeVal(date)
                if (this.props.onChange) this.props.onChange(date)
              })
            }
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
            if (this.props.onChange) {
              this.props.onChange(val)
            }
          }}
        />
      </Wrapper>
    )
  }
}
