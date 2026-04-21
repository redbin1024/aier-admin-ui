import type { Router } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { setRouteEmitter } from '@/utils/route-listener';
import setupUserLoginInfoGuard from './userLoginInfo';
import setupPermissionGuard from './permission';

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    setRouteEmitter(to);
  });
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router);
  setupUserLoginInfoGuard(router);
  setupPermissionGuard(router);

  // 确保每次路由导航完成后关闭进度条
  router.afterEach(() => {
    NProgress.done();
  });
}
