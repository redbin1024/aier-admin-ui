import request from '@/utils/request';

export function getTemplateByNodeId(nodeId: string | number, query?: any) {
  return request.get(
    `/platform/templateDynamic/getTemplateByNodeId?nodeId=${nodeId}`,
    { params: query }
  );
}
