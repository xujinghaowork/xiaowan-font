import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/manage',
  name: 'manage',
  meta,
  redirect: { name: 'user-info' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'announcement', name: `${pre}announcement`, component: () => import('@/pages/xiaowan/manage/announcement/index'), meta: { meta, title: '公告管理' } },
    { path: 'pay', name: `${pre}pay`, component: () => import('@/pages/xiaowan/manage/pay/index'), meta: { meta, title: '缴费管理' } },
    { path: 'complaint', name: `${pre}complaint`, component: () => import('@/pages/xiaowan/manage/complaint/index'), meta: { meta, title: '投诉管理' } },
    { path: 'repair', name: `${pre}repair`, component: () => import('@/pages/xiaowan/manage/repair/index'), meta: { meta, title: '报修管理' } },
    { path: 'user', name: `${pre}user`, component: () => import('@/pages/xiaowan/manage/user/index'), meta: { meta, title: '用户管理' } },
    { path: 'role', name: `${pre}role`, component: () => import('@/pages/xiaowan/manage/role/index'), meta: { meta, title: '角色管理' } },
  ])('manage-')
}
