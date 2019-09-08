import { combineReducers } from 'redux'
import authReducer from './authReducer'
import gereralReducer from './generalReducer'
import bookingReducer from './bookingReducer'
import paymentReducer from './paymentReducer'

export default combineReducers({
  AuthStore: authReducer,
  GeneralStore: gereralReducer,
  BookingStore: bookingReducer,
  PaymentStore: paymentReducer
})
