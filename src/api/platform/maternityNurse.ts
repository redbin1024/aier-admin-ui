import request from '@/utils/request';
import type {
  MaternityNurseForm,
  MaternityNurseQuery,
} from '@/types/maternity';

/**
 * 分页查询月嫂列表
 */
export function listNurse(params: MaternityNurseQuery) {
  return request.get('/platform/mobile_nanny/page', { params });
}

/**
 * 查询月嫂详情
 */
export function getNurse(nurseId: number) {
  return request.get(`/platform/mobile_nanny/info/${nurseId}`);
}

/**
 * 新增月嫂
 */
export function addNurse(data: MaternityNurseForm) {
  return request.put('/platform/mobile_nanny/save', data);
}

/**
 * 修改月嫂
 */
export function updateNurse(data: MaternityNurseForm) {
  return request.post('/platform/mobile_nanny/update', data);
}

/**
 * 删除月嫂
 */
export function delNurse(nurseId: number) {
  return request.delete(`/platform/mobile_nanny/${nurseId}`);
}
