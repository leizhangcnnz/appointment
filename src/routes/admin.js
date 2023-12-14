import AdminLayout from '@/layout/admin'
import lazy from '@/components/Lazy'

export default {
  path: '/admin',
  name: 'home',
  component: AdminLayout,
  childRoutes: [
    { path: '/', component: lazy(() => import('@/views/admin/home')) },
    { path: 'cld-host/edit/:hostname', component: lazy(() => import('@/views/admin/cloudHost/edit')) },
    { path: 'cld-host/add', component: lazy(() => import('@/views/admin/cloudHost/edit')) },
    { path: 'cld-host/manager', component: lazy(() => import('@/views/admin/cloudHost/manager')) },
    { path: 'trade-user/add', component: lazy(() => import('@/views/admin/tradeUser/edit')) },
    { path: 'trade-user/edit/:code', component: lazy(() => import('@/views/admin/tradeUser/edit')) },
    { path: 'trade-user/manager', component: lazy(() => import('@/views/admin/tradeUser/manager')) },
    { path: 'user/manager', component: lazy(() => import('@/views/admin/user')) },
    { path: 'tied-operators', component: lazy(() => import('@/views/admin/tiedOperators')) },
  ],
}
