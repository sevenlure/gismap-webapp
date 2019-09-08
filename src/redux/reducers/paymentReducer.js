import update from 'react-addons-update'
import { SET_PAYMENT_INFO_TICKET, CLEAR_PAYMENT_INFO_TICKET } from '../actions/paymentAction'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const InitialState = {
  infoTicket: {},
  promotion: {}
}

// REDUCERS
const paymentReducer = (state = InitialState, action) => {
  switch (action.type) {
    case SET_PAYMENT_INFO_TICKET: {
      return update(state, {
        infoTicket: { $set: action.payload }
      })
    }
    case CLEAR_PAYMENT_INFO_TICKET: {
      return update(state, {
        infoTicket: { $set: {} }
      })
    }
    default:
      return state
  }
}

const paymentPersistConfig = {
  key: 'PaymentStore',
  storage: storage,
  blacklist: ['infoTicket', 'promotion']
}

export default persistReducer(paymentPersistConfig, paymentReducer)
