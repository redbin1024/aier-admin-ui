import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const ROUTE_VIEW = () => import('@/layout/route-view.vue');

const PLATFORM: AppRouteRecordRaw = {
  path: '/platform',
  name: 'Platform',
  component: DEFAULT_LAYOUT,
  redirect: '/platform/videoTutorial',
  meta: {
    locale: '门店系统',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 3,
    roles: ['*'],
  },
  children: [
    {
      path: 'videoTutorial',
      name: 'VideoTutorial',
      component: () => import('@/views/platform/videoTutorial/index.vue'),
      meta: {
        locale: '教学视频',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'maternity',
      name: 'MaternityManage',
      component: ROUTE_VIEW,
      redirect: '/platform/maternity/nurse',
      meta: {
        locale: '月嫂管理',
        requiresAuth: true,
        roles: ['*'],
      },
      children: [
        {
          path: 'nurse',
          name: 'MaternityNurse',
          component: () => import('@/views/platform/maternityNurse/index.vue'),
          meta: {
            locale: '月嫂列表',
            requiresAuth: true,
            roles: ['*'],
          },
        },
        {
          path: 'package',
          name: 'NursePackage',
          component: () => import('@/views/platform/nursePackage/index.vue'),
          meta: {
            locale: '套餐管理',
            requiresAuth: true,
            roles: ['*'],
          },
        },
        {
          path: 'order',
          name: 'NurseOrder',
          component: () => import('@/views/platform/nurseOrder/index.vue'),
          meta: {
            locale: '订单管理',
            requiresAuth: true,
            roles: ['*'],
          },
        },
        {
          path: 'order/create',
          name: 'NurseOrderCreate',
          component: () => import('@/views/platform/nurseOrder/create.vue'),
          meta: {
            locale: '新建订单',
            requiresAuth: true,
            hideInMenu: true,
            activeMenu: 'NurseOrder',
            roles: ['*'],
          },
        },
        {
          path: 'order/detail/:orderId',
          name: 'NurseOrderDetail',
          component: () => import('@/views/platform/nurseOrder/detail.vue'),
          meta: {
            locale: '订单详情',
            requiresAuth: true,
            hideInMenu: true,
            activeMenu: 'NurseOrder',
            roles: ['*'],
          },
        },
      ],
    },
  ],
};

export default PLATFORM;
