<template>
  <div class="order-detail-page">
    <a-page-header title="订单详情" @back="goBack" />

    <a-spin :loading="loading" style="display: block">
      <!-- 状态进度条 -->
      <a-card :bordered="false" class="section-card">
        <div v-if="order.orderStatus === 'CANCELLED'" class="cancelled-banner">
          <icon-close-circle :size="24" />
          <span>订单已取消</span>
        </div>
        <a-steps v-else :current="currentStep" class="status-steps">
          <a-step description="提交订单">待确认</a-step>
          <a-step description="确认接单">已确认</a-step>
          <a-step description="月嫂上门">服务中</a-step>
          <a-step description="服务结束">已完成</a-step>
        </a-steps>
      </a-card>

      <a-row :gutter="16">
        <a-col :xs="24" :lg="14">
          <!-- 订单信息 -->
          <a-card :bordered="false" class="section-card">
            <template #title>
              <div class="section-title">
                <icon-file :size="18" />
                <span>订单信息</span>
              </div>
            </template>
            <a-descriptions :column="2" bordered size="medium">
              <a-descriptions-item label="订单编号">{{
                order.orderNo || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="订单状态">
                <a-tag
                  :color="getOrderStatusColor(order.orderStatus)"
                  size="small"
                >
                  {{ getOrderStatusText(order.orderStatus) }}
                </a-tag>
              </a-descriptions-item>
              <a-descriptions-item label="客户姓名">{{
                order.customerName || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="联系电话">{{
                order.customerTel || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="服务开始">{{
                order.serviceStartDate || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="服务结束">{{
                order.serviceEndDate || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="服务地址" :span="2">{{
                order.serviceAddress || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="套餐名称">{{
                order.packageName || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="订单金额">
                <span class="amount-text"
                  >¥{{ order.totalAmount ?? '0.00' }}</span
                >
              </a-descriptions-item>
              <a-descriptions-item label="来源">{{
                order.source || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="创建时间">{{
                order.createTime || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="备注" :span="2">{{
                order.notes || '-'
              }}</a-descriptions-item>
            </a-descriptions>
          </a-card>

          <!-- 服务日志 -->
          <a-card :bordered="false" class="section-card">
            <template #title>
              <div class="section-title">
                <icon-schedule :size="18" />
                <span>服务日志</span>
              </div>
            </template>
            <template #extra>
              <a-button
                v-if="order.orderStatus === 'IN_SERVICE'"
                type="primary"
                size="small"
                @click="serviceLogVisible = true"
              >
                <template #icon><icon-plus /></template>
                录入日志
              </a-button>
            </template>

            <a-empty v-if="!serviceLogs.length" description="暂无服务日志" />
            <a-timeline v-else>
              <a-timeline-item
                v-for="log in serviceLogs"
                :key="log.logId"
                :dot-color="'rgb(var(--primary-6))'"
              >
                <div class="log-card">
                  <div class="log-date">
                    <icon-calendar :size="14" />
                    <span>{{ log.serviceDate }}</span>
                  </div>
                  <div class="log-content">{{ log.serviceContent }}</div>
                  <div
                    v-if="log.photos && log.photos.length"
                    class="log-photos"
                  >
                    <a-image-preview-group>
                      <a-image
                        v-for="(photo, idx) in log.photos"
                        :key="idx"
                        :src="photo"
                        width="80"
                        height="80"
                        fit="cover"
                        class="log-photo"
                      />
                    </a-image-preview-group>
                  </div>
                  <div v-if="log.notes" class="log-notes">
                    备注：{{ log.notes }}
                  </div>
                  <div class="log-time">{{ log.createTime }}</div>
                </div>
              </a-timeline-item>
            </a-timeline>
          </a-card>
        </a-col>

        <a-col :xs="24" :lg="10">
          <!-- 月嫂信息 -->
          <a-card :bordered="false" class="section-card">
            <template #title>
              <div class="section-title">
                <icon-user :size="18" />
                <span>月嫂信息</span>
              </div>
            </template>
            <div v-if="order.nurseName" class="nurse-info-card">
              <div class="nurse-name">{{ order.nurseName }}</div>
              <div class="nurse-meta">月嫂ID：{{ order.nurseId || '-' }}</div>
            </div>
            <a-empty v-else description="暂未指派月嫂" />
          </a-card>

          <!-- 客户评价 -->
          <a-card :bordered="false" class="section-card">
            <template #title>
              <div class="section-title">
                <icon-star :size="18" />
                <span>客户评价</span>
              </div>
            </template>
            <a-spin :loading="reviewLoading" style="display: block">
              <a-empty
                v-if="!reviews.length && !reviewLoading"
                description="暂无评价"
              />
              <div
                v-for="review in reviews"
                :key="review.reviewId"
                class="review-item"
              >
                <div class="review-header">
                  <a-avatar v-if="review.avatar" :size="32">
                    <img :src="review.avatar" />
                  </a-avatar>
                  <a-avatar v-else :size="32">{{
                    (review.nickname || '用')[0]
                  }}</a-avatar>
                  <div class="review-user">
                    <div class="review-nickname">{{
                      review.nickname || '匿名用户'
                    }}</div>
                    <a-rate
                      :model-value="review.rating"
                      readonly
                      :count="5"
                      size="small"
                    />
                  </div>
                  <span class="review-time">{{ review.createTime }}</span>
                </div>
                <div class="review-content">{{ review.content }}</div>
                <div
                  v-if="review.photos && review.photos.length"
                  class="review-photos"
                >
                  <a-image-preview-group>
                    <a-image
                      v-for="(photo, idx) in review.photos"
                      :key="idx"
                      :src="photo"
                      width="60"
                      height="60"
                      fit="cover"
                      class="review-photo"
                    />
                  </a-image-preview-group>
                </div>
                <div v-if="review.reply" class="review-reply">
                  <span class="reply-label">商家回复：</span>
                  {{ review.reply }}
                </div>
              </div>
            </a-spin>
          </a-card>
        </a-col>
      </a-row>

      <!-- 底部操作按钮 -->
      <div class="detail-footer">
        <a-space>
          <a-button @click="goBack">返回</a-button>
          <a-button
            v-if="order.orderStatus === 'PENDING'"
            type="primary"
            @click="handleChangeStatus('CONFIRMED')"
          >
            确认订单
          </a-button>
          <a-button
            v-if="order.orderStatus === 'CONFIRMED'"
            type="primary"
            status="success"
            @click="handleChangeStatus('IN_SERVICE')"
          >
            开始服务
          </a-button>
          <a-button
            v-if="order.orderStatus === 'IN_SERVICE'"
            type="primary"
            @click="handleChangeStatus('COMPLETED')"
          >
            完成服务
          </a-button>
          <a-button
            v-if="
              order.orderStatus !== 'CANCELLED' &&
              order.orderStatus !== 'COMPLETED'
            "
            status="danger"
            @click="handleCancel"
          >
            取消订单
          </a-button>
        </a-space>
      </div>
    </a-spin>

    <!-- 服务日志录入弹窗 -->
    <service-log-modal
      v-model:visible="serviceLogVisible"
      :order="order"
      @success="loadDetail"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    IconFile,
    IconUser,
    IconStar,
    IconSchedule,
    IconCalendar,
    IconPlus,
    IconCloseCircle,
  } from '@arco-design/web-vue/es/icon';
  import { getOrder, changeOrderStatus } from '@/api/platform/nurseOrder';
  import { listReview } from '@/api/platform/nurseReview';
  import {
    getOrderStatusText,
    getOrderStatusColor,
    getOrderStepIndex,
    type NurseOrder,
    type ServiceLog,
    type NurseReview,
  } from '@/types/maternity';
  import ServiceLogModal from './serviceLog.vue';

  const route = useRoute();
  const router = useRouter();
  const loading = ref(false);
  const reviewLoading = ref(false);
  const serviceLogVisible = ref(false);

  const orderId = computed(() => Number(route.params.orderId));

  const order = ref<NurseOrder>({
    customerName: '',
    customerTel: '',
    serviceAddress: '',
    orderStatus: 'PENDING',
  });
  const serviceLogs = ref<ServiceLog[]>([]);
  const reviews = ref<NurseReview[]>([]);

  const currentStep = computed(() => getOrderStepIndex(order.value.orderStatus));

  async function loadDetail() {
    loading.value = true;
    try {
      const res: any = await getOrder(orderId.value);
      const data = res.data || res;
      order.value = data as NurseOrder;
      serviceLogs.value = data.serviceLogs || [];
    } catch {
      Message.error('获取订单详情失败');
    } finally {
      loading.value = false;
    }
  }

  async function loadReviews() {
    if (!order.value.nurseId) return;
    reviewLoading.value = true;
    try {
      const res: any = await listReview({
        nurseId: order.value.nurseId,
        pageNum: 1,
        pageSize: 5,
      });
      reviews.value = res.rows || [];
    } catch {
      // silent
    } finally {
      reviewLoading.value = false;
    }
  }

  async function handleChangeStatus(status: string) {
    try {
      await changeOrderStatus(orderId.value, status);
      Message.success('操作成功');
      await loadDetail();
    } catch {
      Message.error('操作失败');
    }
  }

  function handleCancel() {
    Modal.confirm({
      title: '提示',
      content: '确认取消该订单吗？',
      onOk: async () => {
        await handleChangeStatus('CANCELLED');
      },
    });
  }

  function goBack() {
    router.push({ name: 'NurseOrder' });
  }

  async function init() {
    await loadDetail();
    loadReviews();
  }

  init();
</script>

<style lang="less" scoped>
  .order-detail-page {
    padding: 16px 20px;

    :deep(.arco-page-header) {
      padding: 0 0 12px;
    }
  }

  .section-card {
    margin-bottom: 16px;
  }

  .section-title {
    display: flex;
    gap: 8px;
    align-items: center;
    font-weight: 600;
  }

  .cancelled-banner {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    padding: 16px;
    color: rgb(var(--danger-6));
    font-weight: 600;
    font-size: 16px;
  }

  .status-steps {
    padding: 8px 0;

    :deep(.arco-steps-item-title) {
      font-weight: 500;
    }
  }

  .amount-text {
    color: rgb(var(--danger-6));
    font-weight: 700;
    font-size: 16px;
  }

  // 月嫂信息卡片
  .nurse-info-card {
    .nurse-name {
      margin-bottom: 4px;
      color: var(--color-text-1);
      font-weight: 600;
      font-size: 18px;
    }

    .nurse-meta {
      color: var(--color-text-3);
      font-size: 13px;
    }
  }

  // 服务日志
  .log-card {
    padding: 12px 16px;
    background: var(--color-fill-1);
    border: 1px solid var(--color-border-1);
    border-radius: 10px;
  }

  .log-date {
    display: flex;
    gap: 6px;
    align-items: center;
    margin-bottom: 8px;
    color: var(--color-text-1);
    font-weight: 600;
  }

  .log-content {
    margin-bottom: 8px;
    color: var(--color-text-2);
    line-height: 1.6;
  }

  .log-photos {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;

    .log-photo {
      overflow: hidden;
      border-radius: 8px;
    }

    :deep(.arco-image) {
      border-radius: 8px;
    }
  }

  .log-notes {
    margin-bottom: 4px;
    color: var(--color-text-3);
    font-size: 12px;
  }

  .log-time {
    color: var(--color-text-4);
    font-size: 12px;
  }

  // 客户评价
  .review-item {
    padding: 12px 0;
    border-bottom: 1px solid var(--color-border-1);

    &:last-child {
      border-bottom: none;
    }
  }

  .review-header {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 8px;
  }

  .review-user {
    flex: 1;

    .review-nickname {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 14px;
    }
  }

  .review-time {
    color: var(--color-text-4);
    font-size: 12px;
  }

  .review-content {
    margin-bottom: 8px;
    color: var(--color-text-2);
    line-height: 1.6;
  }

  .review-photos {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;

    .review-photo {
      overflow: hidden;
      border-radius: 6px;
    }

    :deep(.arco-image) {
      border-radius: 6px;
    }
  }

  .review-reply {
    padding: 8px 12px;
    color: var(--color-text-2);
    font-size: 13px;
    background: var(--color-fill-2);
    border-radius: 8px;

    .reply-label {
      color: rgb(var(--primary-6));
      font-weight: 500;
    }
  }

  // 底部按钮
  .detail-footer {
    display: flex;
    justify-content: flex-end;
    padding: 16px 0;

    :deep(.arco-btn) {
      min-width: 100px;
      border-radius: 8px;
    }
  }
</style>
