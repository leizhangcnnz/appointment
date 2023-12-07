import * as TYPES from '@/redux/types'

const defaultState = {
  code: '',
  etPassword: '',
  etOperationPassword: '',
  hostname: ''
}

export default function tradeUserReducer(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case TYPES.ADD_TRADE_USER:
      return { ...state, addedTradeUser: payload }
    case TYPES.GET_TRADE_USER:
      return { ...state, currentTradeUser: payload }
    case TYPES.VALIDATE_TRADE_USER:
      return { ...state, validateMessage: payload }
    case TYPES.TIED_OPERATORS:
      return { ...state, tiedOperators: payload }
    case TYPES.TRADE_USER_BUDGET:
      return { ...state, tradeUserBudget: payload }
    default:
      return state
  }
}
