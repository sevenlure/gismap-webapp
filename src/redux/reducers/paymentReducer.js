import update from 'react-addons-update'
import { SET_PAYMENT_INFO_TICKET, CLEAR_PAYMENT_INFO_TICKET } from '../actions/paymentAction'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const InitialState = {
  paymentInfoTicket:{}
}

// REDUCERS
const paymentReducer = (state = InitialState, action) => {
  switch (action.type) {
    case SET_PAYMENT_INFO_TICKET: {
      return update(state, {
        paymentInfoTicket: { $set: action.payload }
      })
    }
    case CLEAR_PAYMENT_INFO_TICKET: {
      return update(state, {
        paymentInfoTicket: { $set: {} }
      })
    }
    default:
      return state
  }
}

const paymentPersistConfig = {
  key: 'PaymentStore',
  storage: storage,
  blacklist: ['paymentInfoTicket']
}

export default persistReducer(paymentPersistConfig, paymentReducer)
