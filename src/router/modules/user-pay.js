import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/userPay',
  name: 'userPay',
  meta,
  redirect: { name: 'user-pay' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'pay', name: `${pre}pay`, component: () => import('@/pages/xiaowan/user/pay/index'), meta: { meta, title: '生活缴费' } },
  ])('user-')
}
