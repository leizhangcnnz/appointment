import React from 'react'
import { SIDEBAR } from '@/config'

// components
import { Link } from 'react-router-dom'
import Href from '@/components/Href'
import { Divider, Tag } from 'antd'

import { Alert } from 'antd'
import { ANNOUNCEMENT } from '@/config'

function SideBar(props) {
  return (
    <aside className='app-sidebar'>
      <img src={SIDEBAR.avatar} className='sider-avatar' alt='' />
      <h2 className='title'>{SIDEBAR.title}</h2>
      <h5 className='sub-title'>{SIDEBAR.subTitle}</h5>

      {ANNOUNCEMENT.enable && <Alert message={ANNOUNCEMENT.content} type='info' />}
      <Divider orientation='left'>友情连接</Divider>
    </aside>
  )
}

export default SideBar
