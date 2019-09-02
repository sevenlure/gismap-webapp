import React from 'react'
import PropTypes from 'prop-types'
import ScrollMenu from 'react-horizontal-scrolling-menu'
import { Avatar, Icon } from 'antd'
import moment from 'moment'
import IconSvg from 'icons'

function getTextFromDate(momentDate = moment()) {
  const today = moment().endOf('day')
  // prettier-ignore
  const tomorrow = moment().endOf('day').add(1, 'day')

  if (momentDate <= today) return 'Hôm nay'
  if (momentDate <= tomorrow) return 'Ngày mai'

  let dayName = ''
  const currentDay = momentDate.day()
  // console.log('currentDay', currentDay)
  switch (currentDay) {
    case 0:
      dayName = 'Chủ nhật'
      break
    case 1:
      dayName = 'Thứ 2'
      break
    case 2:
      dayName = 'Thứ 3'
      break
    case 3:
      dayName = 'Thứ 4'
      break
    case 4:
      dayName = 'Thứ 5'
      break
    case 5:
      dayName = 'Thứ 6'
      break
    case 6:
      dayName = 'Thứ 7'
      break
  }
  return dayName
}

const MenuItem = ({ text, selected, textAvatar }) => {
  return (
    <div style={{ width: 95 }} className=''>
      <div>
        <Avatar style={{ marginBottom: 8 }} size='large'>
          {textAvatar}
        </Avatar>
      </div>
      <div className='date-step-item-textdate'>{text}</div>
    </div>
  )
}

export default class StepPicker extends React.Component {
  constructor(props) {
    super(props)
    const dataGen = this.genDate(new Date(), 15)
    this.state = {
      // prettier-ignore
      selected: moment().endOf('day').unix(),
      data: dataGen,
      scrollToSelected: false
    }
  }

  static propTypes = {
    getRef: PropTypes.func,
    onChange: PropTypes.func
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
  }

  genDate(target = new Date(), count) {
    //target là date
    let result = []
    const today = moment().endOf('day')
    for (let i = 0; i < count; i++) {
      // prettier-ignore
      const dayTamp = moment(target).endOf('day').add('days', i)
      if (dayTamp >= today)
        result.push({
          momentDate: dayTamp
        })
    }
    return result
  }

  plusData = () => {
    const { data } = this.state
    const lastData = data[data.length - 1]
    this.setState({
      data: [
        ...data,
        {
          name: 'item plus',
          momentDate: lastData.momentDate.clone().add('days', 1)
        }
      ]
    })
  }

  onSelect = key => {
    this.setState({ selected: key })
    if (this.props.onChange) {
      this.props.onChange(moment.unix(key))
    }
  }

  changeVal(momentDate = moment()) {
    const toDay = moment()
    const dayDiff = momentDate.diff(toDay, 'days') + 1
    // prettier-ignore
    const dateBefore = momentDate.clone().endOf('day').add('days', dayDiff * -1)
    const dataGen = this.genDate(dateBefore.toDate(), dayDiff + 7)
    this.setState(
      {
        // prettier-ignore
        selected: momentDate.endOf('day').unix().toString(),
        data: dataGen,
        scrollToSelected: true
      },
      () => {
        this.setState({ scrollToSelected: false })
      }
    )
  }

  render() {
    const { selected } = this.state
    return (
      <ScrollMenu
        alignCenter={false}
        alignOnResize={false}
        dragging={false}
        wheel={false}
        scrollBy={1}
        data={this.state.data.map(el => {
          const { momentDate } = el
          return (
            <MenuItem
              text={getTextFromDate(momentDate)}
              textAvatar={momentDate.date()}
              // prettier-ignore
              key={momentDate.endOf('day').unix().toString()}
            />
          )
        })}
        arrowLeft={
          <div className='arrow-prev'>
            <Icon className='rotateimg180' style={{ fontSize: 24 }} component={IconSvg.right} />
          </div>
        }
        arrowRight={
          <div onClick={() => this.plusData()} className='arrow-next'>
            <Icon style={{ fontSize: 24 }} component={IconSvg.right} />
          </div>
        }
        hideSingleArrow
        transition={0.2}
        selected={selected}
        onSelect={this.onSelect}
        scrollToSelected={this.state.scrollToSelected}
        itemClass='date-step-item'
        arrowClass='date-step-scroll-menu-arrow'
        wrapperClass='date-step-wrapper'
      />
    )
  }
}
