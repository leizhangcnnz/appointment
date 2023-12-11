import axios from '@/utils/axios'

export const getNUserHost = (numberOfUsers, callback) => {
  const config = {
    params: { numberOfUsers }

  }
  axios.get('/cloud-hosts/with-n-users', config).then(response => {
    if (response.success) {
      callback(response.data.map(hostInfo => `${hostInfo.hostname}: ${hostInfo.following}`).join(' '))
    } else {
      callback('获取失败')
    }
  })
}

export const refreshCache = callback => {
  axios.put('/caches/refresh').then(response => {
    if (response.success) {
      callback('成功刷新cache')
    } else {
      callback('未成功刷新cache')
    }
  })
}

export const restartServices = callback => {
  axios.put('/services/daily-restart').then(response => {
    if (response.success) {
      callback('服务已重启')
    } else {
      callback('重启服务失败')
    }
  })
}
