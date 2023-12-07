import * as TYPES from 'redux/types'
import axios from '@/utils/axios'

export const tieOperators = () => {
  return dispatch => axios.get('/tied-operators').then(data => {
    const tiedOperators = data.data
    dispatch({
      type: TYPES.TIED_OPERATORS,
      payload: tiedOperators
    })
    return tiedOperators
  })
}
