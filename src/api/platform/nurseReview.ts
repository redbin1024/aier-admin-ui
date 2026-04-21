import request from '@/utils/request';
import type { NurseReviewQuery } from '@/types/maternity';

/**
 * 分页查询评价列表
 */
export function listReview(params: NurseReviewQuery) {
  return request.get('/platform/nanny_review/page', { params });
}

/**
 * 回复评价
 */
export function replyReview(reviewId: number, reply: string) {
  return request.post('/platform/nanny_review/reply', null, {
    params: { reviewId, reply },
  });
}

/**
 * 删除评价
 */
export function delReview(reviewId: number) {
  return request.delete(`/platform/nanny_review/${reviewId}`);
}
