import Layout from '@/layout/admin'
import lazy from '@/components/Lazy'

export default {
  path: '/admin',
  name: 'home',
  component: Layout,
  childRoutes: [
    { path: '/', component: lazy(() => import('@/views/admin/home')) },
    { path: 'cloud-host/edit/:hostname', component: lazy(() => import('@/views/admin/cloudHost/edit')) },
    { path: 'cloud-host/add', component: lazy(() => import('@/views/admin/cloudHost/edit')) },
    { path: 'cloud-host/manager', component: lazy(() => import('@/views/admin/cloudHost/manager')) },
    { path: 'trade-user/add', component: lazy(() => import('@/views/admin/fragment/edit')) },
    { path: 'trade-user/edit/:code', component: lazy(() => import('@/views/admin/fragment/edit')) },
    { path: 'trade-user/manager', component: lazy(() => import('@/views/admin/fragment/manager')) },
    { path: 'user/manager', component: lazy(() => import('@/views/admin/user')) },
    { path: 'monitor', component: lazy(() => import('@/views/admin/monitor')) },
  ],
}
