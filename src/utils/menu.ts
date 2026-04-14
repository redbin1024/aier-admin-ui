import { DEFAULT_LAYOUT } from '@/router/routes/base';

const modules = import.meta.glob('../views/**/*.vue');

// 占位页面，当目标视图不存在时使用
const PlaceholderView = () => import('@/views/placeholder/index.vue');

// 已使用的路由 name 集合，用于去重
const usedNames = new Set<string>();

/**
 * 加载视图组件，如果找不到则返回占位页面
 */
export const loadView = (view: string) => {
  let res;
  Object.keys(modules).forEach((path) => {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = modules[path];
    }
  });
  if (!res) {
    // eslint-disable-next-line no-console
    console.warn(`[Menu] 视图组件不存在: views/${view}.vue，使用占位页面`);
    return PlaceholderView;
  }
  return res;
};

/**
 * 规范化路径：去除双斜杠、修正子路由绝对路径
 */
function normalizePath(path: string, isChild = false): string {
  if (!path) return path;
  // 去除多余的连续斜杠 (// -> /)
  let normalized = path.replace(/\/+/g, '/');
  // 子路由不应以 / 开头（除非是根级别）
  if (isChild && normalized.startsWith('/') && normalized.length > 1) {
    normalized = normalized.substring(1);
  }
  return normalized;
}

/**
 * 确保路由 name 唯一
 */
function ensureUniqueName(route: any, parentPath = ''): string {
  let { name } = route;
  if (!name) {
    // 生成基于路径的 name
    const pathSegments = (route.path || parentPath || 'unnamed')
      .replace(/^\/+/, '')
      .replace(/\/+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');
    name =
      pathSegments ||
      `Route_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  }
  // 去掉 name 前面的 /
  name = name.replace(/^\/+/, '');
  // 检查是否已使用
  if (usedNames.has(name)) {
    const baseName = name;
    let counter = 1;
    while (usedNames.has(name)) {
      name = `${baseName}_${counter}`;
      counter += 1;
    }
  }
  usedNames.add(name);
  return name;
}

/**
 * 检查 icon 是否为有效的 Arco Design 图标名
 * Arco 图标名是纯英文 + 数字 + 横杠的组合
 */
function isValidArcoIcon(icon: string): boolean {
  if (!icon || icon === '#') return false;
  // 排除中文字符和特殊字符
  return /^[a-zA-Z][a-zA-Z0-9-]*$/.test(icon);
}

function filterChildren(childrenMap: any[], lastRouter: any = false) {
  let children: any[] = [];
  childrenMap.forEach((el) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c: any) => {
          c.path = `${el.path}/${c.path}`;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    if (lastRouter) {
      el.path = `${lastRouter.path}/${el.path}`;
      if (el.children && el.children.length) {
        children = children.concat(filterChildren(el.children, el));
        return;
      }
    }
    children = children.concat(el);
  });
  return children;
}

export const filterAsyncRouter = (
  asyncRouterMap: any[],
  lastRouter: any = false,
  type = false
) => {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }

    // 规范化路径
    route.path = normalizePath(route.path, !!lastRouter);

    // Convert RuoYi's meta to Arco Pro's meta
    if (route.meta) {
      route.meta.locale = route.meta.title;
      route.meta.requiresAuth = true;
      route.meta.hideInMenu = route.hidden;

      // 规范化 icon：非法图标设置为 undefined
      if (route.meta.icon && !isValidArcoIcon(route.meta.icon)) {
        route.meta.icon = undefined;
      }
    } else {
      route.meta = {
        locale: route.name || route.path,
        requiresAuth: true,
        hideInMenu: route.hidden,
      };
    }

    if (route.component) {
      if (route.component === 'Layout') {
        route.component = DEFAULT_LAYOUT;
      } else if (route.component === 'ParentView') {
        route.component = DEFAULT_LAYOUT;
      } else if (route.component === 'InnerLink') {
        route.component = DEFAULT_LAYOUT;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
    } else {
      delete route.children;
      delete route.redirect;
    }

    // RuoYi 单子路由包装器处理：
    // path="/" 且只有一个子路由 且没有 alwaysShow 的是纯 Layout 包装器
    // 需要将子路由的 title/icon 提升到父级，显示为单个菜单项
    if (
      route.path === '/' &&
      !route.alwaysShow &&
      route.children &&
      route.children.length === 1
    ) {
      const child = route.children[0];
      // 把子路由的 meta 信息提升到父级
      if (child.meta) {
        route.meta.locale = child.meta.locale || child.meta.title;
        route.meta.icon = child.meta.icon;
      }
      // 隐藏子菜单，只显示为单个菜单项
      route.meta.hideChildrenInMenu = true;
    }

    // 确保 name 唯一（放在最后，这样可以使用已确定的 path）
    route.name = ensureUniqueName(route, lastRouter?.path);

    return true;
  });
};

/**
 * 在新一轮获取菜单前重置 name 去重集合
 */
export function resetNameRegistry() {
  usedNames.clear();
}
