import React from 'react'
import { EditOutline, FolderOutline, HomeOutline, StarOutline, SwitcherOutline, FolderOpenOutline, UserOutline, MonitorOutline } from 'utils/antdIcon'

const menu = [
  {
    path: '/admin',
    icon: <HomeOutline />,
    name: '首页',
  },
  {
    path: '/admin/article',
    icon: <SwitcherOutline />,
    name: '文章',
    children: [
      {
        path: '/admin/article/manager',
        icon: <FolderOutline />,
        name: '管理',
      },
      {
        path: '/admin/article/add',
        icon: <EditOutline />,
        name: '新增',
      },
      {
        path: '/admin/article/graph',
        icon: <StarOutline />,
        name: '图表',
      },
    ],
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
    path: '/admin/monitor',
    icon: <MonitorOutline />,
    name: '系统监控',
  },
]

export default menu
