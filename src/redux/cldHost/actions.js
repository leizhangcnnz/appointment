import axios from '@/utils/axios'

export const addHost = host => {
  const body = { ...host }
  return dispatch => axios.post('/cloud-hosts', body).then(response => {
    return response.success
  })
}

export const getCldHostByHostname = hostname => {
  return () => axios.get(`/cloud-hosts/${hostname}`).then(data => {
    return data.data
  })
}

export const deleteHost = hostname => {
  return axios.delete(`/cloud-hosts/${hostname}`)
}
