import axios from 'axios'
import { API_BASE_URL } from '@/config'

import { message } from 'antd'
import { getToken } from '@/utils'
import { loginout } from '@/redux/user/actions'
import store from '@/redux'

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:54188',
  timeout: 10000
})

let timer

// 拦截请求
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.common['Authorization'] = token
    }
    return config
  },
  error => {
    message.error('bed request')
    Promise.reject(error)
  }
)

// 拦截响应
service.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data
  },
  err => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (err.response) {
        const { status, data } = err.response
        if (status !== 401 && err.config.skipErrorHandler) {
          return
        }
        switch (status) {
          case 401:
            message.error((data && data.message) || '登录信息过期或未授权，请重新登录！')
            const { dispatch } = store
            dispatch(loginout())
            break

          default:
            message.error(data.message || `连接错误 ${status}！`)
            break
        }
      } else {
        console.log(err.message)
        // message.error(err.message)
      }
    }, 200) // 200 毫秒内重复报错则只提示一次！

    return Promise.reject(err)
  }
)

export default service
