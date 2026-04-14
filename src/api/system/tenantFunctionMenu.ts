import request from '@/utils/request';

export function getMenusByFunction(functionId: string | number, query?: any) {
  return request.get(`/system/tenant-function-menu/function/${functionId}`, {
    params: query,
  });
}

export function getFunctionsByMenu(menuId: string | number, query?: any) {
  return request.get(`/system/tenant-function-menu/menu/${menuId}`, {
    params: query,
  });
}

export function saveFunctionMenus(data?: any, query?: any) {
  return request.post('/system/tenant-function-menu/save', data, {
    params: query,
  });
}

export function deleteFunctionMenus(functionId: string | number, query?: any) {
  return request.delete(`/system/tenant-function-menu/function/${functionId}`, {
    params: query,
  });
}
