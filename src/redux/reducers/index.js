import { combineReducers } from 'redux'
import authReducer from './authReducer'
// import gereralReducer from './generalReducer'
import filterReducer from './filterReducer'
import layerReducer from './layerReducer'

export default combineReducers({
  AuthStore: authReducer,
  // GeneralStore: gereralReducer,
  FilterStore: filterReducer,
  LayerReducer: layerReducer
})
