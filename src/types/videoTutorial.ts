/**
 * 视频教程模块类型定义
 */

/**
 * 视频分类选项
 */
export const VIDEO_CATEGORY_OPTIONS = [
  { label: '使用教程', value: 0 },
  { label: '操作指南', value: 1 },
  { label: '培训视频', value: 2 },
  { label: '其他', value: 3 },
];

/**
 * 视频状态选项
 */
export const VIDEO_STATUS_OPTIONS = [
  { label: '下架', value: 0 },
  { label: '上架', value: 1 },
];

/**
 * 获取视频分类文本
 */
export function getVideoCategoryText(category: number): string {
  const option = VIDEO_CATEGORY_OPTIONS.find((item) => item.value === category);
  return option?.label || '未知';
}

/**
 * 获取视频状态文本
 */
export function getVideoStatusText(status: number): string {
  const option = VIDEO_STATUS_OPTIONS.find((item) => item.value === status);
  return option?.label || '未知';
}

/**
 * 视频教程数据模型
 */
export interface VideoTutorial {
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

/**
 * 视频教程查询参数
 */
export interface VideoTutorialQuery {
  pageNum?: number;
  pageSize?: number;
  title?: string;
  category?: number;
  status?: number;
}

/**
 * 视频教程表单数据
 */
export interface VideoTutorialForm {
  tutorialId?: number;
  title: string;
  description?: string;
  videoUrl: string;
  coverImage?: string;
  category: number;
  sort?: number;
  status: number;
}
