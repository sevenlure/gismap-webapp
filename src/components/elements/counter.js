import React, { Component } from 'react'
import { connectAutoDispatch } from 'src/redux/connect'
import { incrementCount, decrementCount, resetCount } from 'src/redux/actions/timeAction'



@connectAutoDispatch( (state) => ({
  count:  state.timeReducer.count
}),
{
  incrementCount,
  decrementCount,
  resetCount
}
)
export default class Counter extends Component {
  increment = () => {
    return this.props.incrementCount()
  }

  decrement = () => {
    return this.props.decrementCount()
  }

  reset = () => {
    return this.props.resetCount()
  }

  render () {
    const { count } = this.props
    
    return (
      <div>
        <h1>
          Count: <span>{count}</span>
        </h1>
        <button onClick={this.increment}>+1</button>
        <button onClick={this.decrement}>-1</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    )
  }
}

