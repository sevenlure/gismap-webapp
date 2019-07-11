import { combineReducers } from 'redux'
import authReducer from './authReducer'
import gereralReducer from './generalReducer'

export default combineReducers({ AuthStore: authReducer, GeneralStore: gereralReducer })
