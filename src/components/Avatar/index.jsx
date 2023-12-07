import React from 'react'
import PropTypes from 'prop-types'
import './index.less'
import { Avatar} from 'antd'
import { SIDEBAR } from '@/config'

function AppAvatar(props) {
  const { username } = props.userInfo
  return <Avatar src={SIDEBAR.avatar}>{username}</Avatar>
}

AppAvatar.propTypes = {
  userInfo: PropTypes.object.isRequired
}

export default AppAvatar
