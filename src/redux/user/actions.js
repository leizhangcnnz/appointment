import * as TYPES from '@/redux/types'
import axios from '@/utils/axios'
import { message } from 'antd'

const USER_DOMAIN = 'http://127.0.0.1:8970'

export const login = params => {
  return dispatch => axios.post(`${USER_DOMAIN}/login`, params).then(res => {
    dispatch({
      type: TYPES.USER_LOGIN,
      payload: res
    })
    message.success(`登录成功, 欢迎您 ${res.nickname}`)
    return res
  })
}

export const register = params => {
  if (params.password !== undefined) {
  }
  return dispatch =>
    axios.post(`${USER_DOMAIN}/register`, params).then(res => {
      message.success('暂不支持注册')
      return res
    })
}

export const loginout = () => ({
  type: TYPES.USER_LOGIN_OUT
})
