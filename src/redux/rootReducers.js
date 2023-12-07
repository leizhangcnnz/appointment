import { combineReducers } from 'redux'

import user from './user/reducer'
import tiedOperators from './tiedOperators/reducer'
import tradeUserReducer from './tradeUser/reducer'

export default combineReducers({
  user,
  tiedOperators,
  tradeUserReducer
})
