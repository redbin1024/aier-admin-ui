import request from '@/utils/request';
import type { NursePackageForm, NursePackageQuery } from '@/types/maternity';

/**
 * 分页查询套餐列表
 */
export function listPackage(params: NursePackageQuery) {
  return request.get('/platform/nanny_package/page', { params });
}

/**
 * 查询套餐详情
 */
export function getPackage(packageId: number) {
  return request.get(`/platform/nanny_package/info/${packageId}`);
}

/**
 * 新增套餐
 */
export function addPackage(data: NursePackageForm) {
  return request.put('/platform/nanny_package/save', data);
}

/**
 * 修改套餐
 */
export function updatePackage(data: NursePackageForm) {
  return request.post('/platform/nanny_package/update', data);
}

/**
 * 删除套餐
 */
export function delPackage(packageId: number) {
  return request.delete(`/platform/nanny_package/${packageId}`);
}
