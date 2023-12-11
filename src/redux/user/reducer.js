import * as TYPES from '@/redux/types'
import { save, get, remove } from '@/utils/storage'

// ====== state
let defaultState = {
  username: '',
  role: 2,
  userId: 0,
  github: null,
  email: null
}

const userInfo = get('userInfo')

if (userInfo) {
  defaultState = { ...defaultState, ...userInfo }
}

export default function UserReducer(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case TYPES.USER_LOGIN:
      const { username, nickname, role, authorities, token } = payload
      save('token', token)
      save('userInfo', { username, nickname, role, authorities })
      return { ...state, username, nickname, role, authorities }
    case TYPES.USER_LOGIN_OUT:
      remove('userInfo')
      remove('token')
      return { ...state, username: '', userId: 0, role: 2, github: null, email: null}
    default:
      return state
  }
}
