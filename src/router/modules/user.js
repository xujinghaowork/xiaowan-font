import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/user',
  name: 'user',
  meta,
  redirect: { name: 'user-info' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'info', name: `${pre}info`, component: () => import('@/pages/xiaowan/user/userInfo/index'), meta: { meta, title: '个人信息' } },
    { path: 'pay', name: `${pre}pay`, component: () => import('@/pages/xiaowan/user/pay/index'), meta: { meta, title: '生活缴费' } },
    { path: 'complaint', name: `${pre}complaint`, component: () => import('@/pages/xiaowan/user/complaint/index'), meta: { meta, title: '投诉' } },
    { path: 'repair', name: `${pre}repair`, component: () => import('@/pages/xiaowan/user/repair/index'), meta: { meta, title: '物品报修' } },
  ])('user-')
}
