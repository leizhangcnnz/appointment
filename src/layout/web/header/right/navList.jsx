import React from 'react'
import { EditOutline, FolderOutline, HomeOutline, MessageOutline, UserOutline } from 'utils/antdIcon'

export default [
  {
    icon: <HomeOutline style={{ marginRight: 15 }} />,
    title: '首页',
    link: '/home'
  },
  {
    icon: <MessageOutline style={{ marginRight: 15 }} />,
    title: '用户跟单',
    link: '/tied-operators'
  }
]
