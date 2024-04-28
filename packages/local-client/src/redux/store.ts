import { legacy_createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import { thunk } from 'redux-thunk'
import reducers from './reducers'
import { persistMiddleware } from './middlewares/persistMiddleware'

export const store = legacy_createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(persistMiddleware, thunk))
)
