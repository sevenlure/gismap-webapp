import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['GeneralStore']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export function initializeStore() {
  let storeEnhance = applyMiddleware(thunkMiddleware)

  if (process.env.isDev) {
    // MARK gắn devTool vao
    storeEnhance = composeWithDevTools(storeEnhance)
  }

  return createStore(persistedReducer, undefined, storeEnhance)
}
