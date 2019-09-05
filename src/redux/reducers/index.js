import { combineReducers } from 'redux'
import authReducer from './authReducer'
import gereralReducer from './generalReducer'
import bookingReducer from './BookingReducer'

export default combineReducers({
  AuthStore: authReducer,
  GeneralStore: gereralReducer,
  BookingStore: bookingReducer
})
