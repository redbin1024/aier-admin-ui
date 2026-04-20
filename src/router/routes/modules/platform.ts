import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

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
  ],
};

export default PLATFORM;
