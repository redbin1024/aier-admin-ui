import request from '@/utils/request';

export interface VideoTutorialVo {
  tutorialId?: number;
  title: string;
  description?: string;
  videoUrl: string;
  coverImage?: string;
  category: number;
  sort: number;
  status: number;
  createTime?: string;
  createBy?: number;
  updateTime?: string;
  updateBy?: number;
}

export interface VideoTutorialBo {
  tutorialId?: number;
  title: string;
  description?: string;
  videoUrl: string;
  coverImage?: string;
  category: number;
  sort?: number;
  status: number;
}

export interface VideoTutorialListParams {
  pageNum?: number;
  pageSize?: number;
  title?: string;
  category?: number;
  status?: number;
}

/**
 * 查询视频教程列表
 */
export function listVideoTutorial(params: VideoTutorialListParams) {
  return request.get('/platform/biz/videoTutorial/list', { params });
}

/**
 * 获取视频教程详情
 */
export function getVideoTutorial(tutorialId: number) {
  return request.get(`/platform/biz/videoTutorial/${tutorialId}`);
}

/**
 * 新增视频教程
 */
export function addVideoTutorial(data: VideoTutorialBo) {
  return request.post('/platform/biz/videoTutorial/add', data);
}

/**
 * 修改视频教程
 */
export function updateVideoTutorial(data: VideoTutorialBo) {
  return request.put('/platform/biz/videoTutorial/update', data);
}

/**
 * 删除视频教程
 */
export function delVideoTutorial(tutorialIds: number | number[]) {
  const ids = Array.isArray(tutorialIds) ? tutorialIds.join(',') : tutorialIds;
  return request.delete(`/platform/biz/videoTutorial/${ids}`);
}

/**
 * 导出视频教程列表
 */
export function exportVideoTutorial(params: VideoTutorialListParams) {
  return request.post('/platform/biz/videoTutorial/export', params, {
    responseType: 'blob',
  });
}

// ==================== 小程序端接口 ====================

/**
 * 查询视频教程列表(小程序)
 */
export function mpListVideoTutorial(params: Omit<VideoTutorialListParams, 'status'>) {
  return request.get('/mp/biz/videoTutorial/list', { params });
}

/**
 * 获取视频教程详情(小程序)
 */
export function mpGetVideoTutorial(tutorialId: number) {
  return request.get(`/mp/biz/videoTutorial/${tutorialId}`);
}
