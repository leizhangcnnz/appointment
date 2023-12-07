import * as TYPES from '@/redux/types'
import axios from '@/utils/axios'
import { message } from 'antd'
import * as PSW from '@/utils/password'

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
    params.password = PSW.default.encrypt(params.password)
  }
  return dispatch =>
    axios.post('/register', params).then(res => {
      message.success('注册成功，请重新登录您的账号！')
      return res
    })
}

export const loginout = () => ({
  type: TYPES.USER_LOGIN_OUT
})
