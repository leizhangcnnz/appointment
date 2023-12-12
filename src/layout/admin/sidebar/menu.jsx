import React from 'react'
import { EditOutline, FolderOutline, HomeOutline, StarOutline, SwitcherOutline, FolderOpenOutline, UserOutline, MonitorOutline } from 'utils/antdIcon'

const menu = [
  {
    path: '/admin',
    icon: <HomeOutline />,
    name: '首页',
  },
  {
    path: '/admin/trade-user',
    icon: <FolderOpenOutline />,
    name: '交易用户',
    children: [
      {
        path: '/admin/trade-user/manager',
        icon: <FolderOutline />,
        name: '管理',
      },
      {
        path: '/admin/trade-user/add',
        icon: <EditOutline />,
        name: '新增',
      },
    ],
  },
  {
    path: '/admin/cld-host',
    icon: <SwitcherOutline />,
    name: '主机管理',
    children: [
      {
        path: '/admin/cld-host/manager',
        icon: <FolderOutline />,
        name: '管理',
      },
      {
        path: '/admin/cld-host/add',
        icon: <EditOutline />,
        name: '新增',
      }
    ],
  },
  {
    path: '/admin/user',
    icon: <UserOutline />,
    name: '系统用户',
    children: [
      {
        path: '/admin/user/manager',
        icon: <FolderOutline />,
        name: '管理',
      },
      {
        path: '/admin/user/add',
        icon: <EditOutline />,
        name: '新增',
      },
    ],
  },
  {
    path: '/admin/tied-operators',
    icon: <MonitorOutline />,
    name: '用户跟单',
  },
]

export default menu
