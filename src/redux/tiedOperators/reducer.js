import * as TYPES from '@/redux/types'
import { get } from '@/utils/storage'

let defaultState = []

const tiedOperators = get('tiedOperators')

if (tiedOperators) {
  defaultState = { ...defaultState, tiedOperators }
}

export default function tiedOperatorsReducer(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case TYPES.TIED_OPERATORS:
      return { ...state, tiedOperators: payload }
    default:
      return state
  }
}
