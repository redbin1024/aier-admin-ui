import request from '@/utils/request';

/**
 * 根据订单查询服务日志列表
 */
export function listServiceLog(orderId: number) {
  return request.get(`/platform/nanny_service_log/list/${orderId}`);
}

/**
 * 删除服务日志
 */
export function delServiceLog(logId: number) {
  return request.delete(`/platform/nanny_service_log/${logId}`);
}
