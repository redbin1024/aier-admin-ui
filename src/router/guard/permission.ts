import type { Router, RouteRecordNormalized } from 'vue-router';
import usePermission from '@/hooks/permission';
import { useUserStore, useAppStore } from '@/store';
import { appRoutes } from '../routes';
import { WHITE_LIST, NOT_FOUND } from '../constants';

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const appStore = useAppStore();
    const userStore = useUserStore();
    const Permission = usePermission();
    const permissionsAllow = Permission.accessRouter(to);
    if (appStore.menuFromServer) {
      // 针对来自服务端的菜单配置进行处理
      // Handle routing configuration from the server

      // 根据需要自行完善来源于服务端的菜单配置的permission逻辑
      // Refine the permission logic from the server's menu configuration as needed
      let isFetched = false;
      if (
        !appStore.serverMenuFetched &&
        !WHITE_LIST.find((el) => el.name === to.name)
      ) {
        try {
          const asyncRoutes = (await appStore.fetchServerMenuConfig()) || [];
          asyncRoutes.forEach((route: RouteRecordNormalized) => {
            try {
              if (route.name && !router.hasRoute(route.name)) {
                router.addRoute(route);
              }
            } catch (e) {
              // eslint-disable-next-line no-console
              console.warn(`[Router] 注册路由失败: ${String(route.name)}`, e);
            }
          });
          isFetched = true;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('[Router] 获取或注册菜单路由失败:', error);
          next(NOT_FOUND);
          return;
        }
      }

      if (isFetched) {
        next({ path: to.fullPath, replace: true, query: to.query });
        return;
      }

      // 将本地静态路由和服务端菜单合并检查
      const serverMenuConfig = [
        ...appRoutes,
        ...appStore.appAsyncMenus,
        ...WHITE_LIST,
      ] as unknown as RouteRecordNormalized[];

      let exist = false;
      while (serverMenuConfig.length && !exist) {
        const element = serverMenuConfig.shift();
        if (element?.name === to.name) exist = true;

        if (element?.children) {
          serverMenuConfig.push(
            ...(element.children as unknown as RouteRecordNormalized[])
          );
        }
      }
      // If to.name is notFound, it means the route doesn't exist even after fetching.
      if (exist && permissionsAllow) {
        next();
      } else next(NOT_FOUND);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (permissionsAllow) next();
      else {
        const destination =
          Permission.findFirstPermissionRoute(appRoutes, userStore.role) ||
          NOT_FOUND;
        next(destination);
      }
    }
  });
}
