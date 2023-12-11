import * as TYPES from 'redux/types'
import axios from '@/utils/axios'

export const addTradeUser = user => {
  const body = { ...user }
  return dispatch => axios.post('/users/trade', body).then(data => {
    const userData = data.data
    dispatch({
      type: TYPES.ADD_TRADE_USER,
      payload: userData
    })
    return userData
  })
}

export const getTradeUserById = code => {
  return dispatch => axios.get(`/users/trade/${code}`).then(data => {
    const userData = data.data
    dispatch({
      type: TYPES.GET_TRADE_USER,
      payload: userData
    })
    return userData
  })
}

export const validateTraceUser = (code, etPassword) => {
  const config = {
    skipErrorHandler: true,
    params: { code, etPassword }

  }
  return dispatch => axios.get('/users/trade/check', config).catch(error => {
    if (error.response) {
      return error.response.data
    }
  }).then(data => {
    let message
    if (data.success) {
      message = 'Gainer端配置正常'
    } else {
      message = data.message.toString()
    }
    dispatch({
      type: TYPES.VALIDATE_TRADE_USER,
      payload: message
    })
    return message
  })
}

export const getTradeUserTied = code => {
  const config = {
    params: { code }

  }
  return dispatch => axios.get('/tied-operators', config).then(data => {
    dispatch({
      type: TYPES.TIED_OPERATORS,
      payload: data.data.tiedOperators
    })
    return data.data.tiedOperators
  })
}

export const getTradeUserMt4Budget = code => {
  const config = {
    params: { code }

  }
  return dispatch => axios.get('/users/trade/budget', config).then(data => {
    dispatch({
      type: TYPES.TRADE_USER_BUDGET,
      payload: data.data
    })
    return data.data
  })
}

export const tieAllLeftOperators = code => {
  const config = {
    timeout: 1000 * 60 * 5,
    params: { code }

  }
  return dispatch => axios.put('/tied-operators/all', null, config).then(response => {
    if (response.success) {
      return '成功绑定所有信号源'
    } else {
      return '未成功绑定所有信号源'
    }
  })
}

export const saveAllTieOperators = code => {
  const config = {
    timeout: 1000 * 60,
    params: { code }

  }
  return dispatch => axios.post('/tied-operators/otie', null, config).then(response => {
    if (response.success) {
      return '成功绑定所有信号源'
    } else {
      return '未成功绑定所有信号源'
    }
  })
}

export const refreshEtToken = (code, etPassword) => {
  const config = {
    params: { code, etPassword }

  }
  return dispatch => axios.put('/users/trade/token', null, config).then(response => {
    if (response.success) {
      return '成功生成Et令牌'
    } else {
      return '生成Et令牌失败'
    }
  })
}
