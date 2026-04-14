import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const CRM: AppRouteRecordRaw = {
  path: '/crm',
  name: 'CRM',
  component: DEFAULT_LAYOUT,
  redirect: '/crm/customer',
  meta: {
    locale: 'CRM管理',
    requiresAuth: true,
    icon: 'icon-user-group',
    order: 1,
    roles: ['*'],
  },
  children: [
    {
      path: 'customer',
      name: 'CrmCustomer',
      component: () => import('@/views/crm/customer/index.vue'),
      meta: {
        locale: '客资管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'seas',
      name: 'CrmSeas',
      component: () => import('@/views/crm/customer/seas.vue'),
      meta: {
        locale: '客户公海',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'order',
      name: 'CrmOrder',
      component: () => import('@/views/crm/order/index.vue'),
      meta: {
        locale: '订单查看',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'room',
      name: 'CrmRoom',
      component: () => import('@/views/crm/room/index.vue'),
      meta: {
        locale: '房态管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'customer/detail/:customerId?',
      name: 'CrmCustomerDetail',
      component: () => import('@/views/crm/customer/detail.vue'),
      meta: {
        locale: '客户详情',
        requiresAuth: true,
        hideInMenu: true,
        activeMenu: 'CrmCustomer',
        roles: ['*'],
      },
    },
  ],
};

export default CRM;
