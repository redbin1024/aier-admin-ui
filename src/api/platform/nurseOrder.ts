import request from '@/utils/request';
import type { NurseOrderForm, NurseOrderQuery } from '@/types/maternity';

/**
 * 分页查询订单列表
 */
export function listOrder(params: NurseOrderQuery) {
  return request.get('/platform/nanny_order/page', { params });
}

/**
 * 查询订单详情（含服务日志）
 */
export function getOrder(orderId: number) {
  return request.get(`/platform/nanny_order/info/${orderId}`);
}

/**
 * 创建订单
 */
export function createOrder(data: NurseOrderForm) {
  return request.put('/platform/nanny_order/create', data);
}

/**
 * 修改订单
 */
export function updateOrder(data: NurseOrderForm) {
  return request.post('/platform/nanny_order/update', data);
}

/**
 * 变更订单状态
 */
export function changeOrderStatus(orderId: number, orderStatus: string) {
  return request.post('/platform/nanny_order/status', null, {
    params: { orderId, orderStatus },
  });
}

/**
 * 删除订单
 */
export function delOrder(orderId: number) {
  return request.delete(`/platform/nanny_order/${orderId}`);
}
