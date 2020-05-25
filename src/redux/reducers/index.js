import { combineReducers } from 'redux'
import authReducer from './authReducer'
// import gereralReducer from './generalReducer'
import filterReducer from './filterReducer'
import layerReducer from './layerReducer'
import analyticsReducer from './analyticsReducer'

export default combineReducers({
  AuthStore: authReducer,
  // GeneralStore: gereralReducer,
  FilterStore: filterReducer,
  LayerStore: layerReducer,
  AnalyticsStore: analyticsReducer
})
