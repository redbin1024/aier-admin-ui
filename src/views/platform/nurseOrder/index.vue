<template>
  <div class="order-page">
    <a-card :bordered="false" class="main-card">
      <!-- 搜索栏 -->
      <div class="toolbar">
        <a-space wrap>
          <a-input
            v-model="queryParams.customerName"
            placeholder="客户姓名搜索"
            allow-clear
            style="width: 200px"
            @press-enter="handleQuery"
          >
            <template #prefix><icon-search /></template>
          </a-input>
          <a-input
            v-model="queryParams.nurseName"
            placeholder="月嫂姓名搜索"
            allow-clear
            style="width: 200px"
            @press-enter="handleQuery"
          >
            <template #prefix><icon-search /></template>
          </a-input>
          <a-button type="primary" @click="handleQuery">
            <template #icon><icon-search /></template>
            搜索
          </a-button>
          <a-button @click="resetQuery">
            <template #icon><icon-refresh /></template>
            重置
          </a-button>
        </a-space>
        <a-button type="primary" @click="handleCreate">
          <template #icon><icon-plus /></template>
          新建订单
        </a-button>
      </div>

      <!-- Tab 状态筛选 -->
      <a-tabs v-model:active-key="activeTab" @change="handleTabChange">
        <a-tab-pane key="">
          <template #title>全部</template>
        </a-tab-pane>
        <a-tab-pane key="PENDING">
          <template #title>
            <a-badge :count="pendingCount" :offset="[12, -4]"> 待确认 </a-badge>
          </template>
        </a-tab-pane>
        <a-tab-pane key="CONFIRMED" title="已确认" />
        <a-tab-pane key="IN_SERVICE" title="服务中" />
        <a-tab-pane key="COMPLETED" title="已完成" />
        <a-tab-pane key="CANCELLED" title="已取消" />
      </a-tabs>

      <!-- 订单列表 -->
      <a-spin :loading="loading" style="display: block">
        <a-empty v-if="!dataList.length && !loading" description="暂无订单" />
        <div class="order-list">
          <div
            v-for="order in dataList"
            :key="order.orderId"
            class="order-card"
          >
            <div class="order-card-header">
              <div class="order-no">
                <icon-file :size="14" />
                <span>{{ order.orderNo }}</span>
              </div>
              <a-tag
                :color="getOrderStatusColor(order.orderStatus)"
                size="small"
              >
                {{ getOrderStatusText(order.orderStatus) }}
              </a-tag>
            </div>
            <div class="order-card-body">
              <a-row :gutter="16">
                <a-col :span="8">
                  <div class="info-label">客户</div>
                  <div class="info-value">{{ order.customerName }}</div>
                  <div class="info-sub">{{ order.customerTel }}</div>
                </a-col>
                <a-col :span="8">
                  <div class="info-label">月嫂</div>
                  <div class="info-value">{{
                    order.nurseName || '待指派'
                  }}</div>
                  <div class="info-sub">{{ order.packageName || '-' }}</div>
                </a-col>
                <a-col :span="8">
                  <div class="info-label">服务日期</div>
                  <div class="info-value">
                    {{ order.serviceStartDate || '-' }}
                  </div>
                  <div class="info-sub">
                    至 {{ order.serviceEndDate || '-' }}
                  </div>
                </a-col>
              </a-row>
            </div>
            <div class="order-card-footer">
              <div class="order-amount">
                <span class="amount-label">订单金额</span>
                <span class="amount-value">
                  ¥{{ order.totalAmount ?? '0.00' }}
                </span>
              </div>
              <a-space>
                <a-button type="text" size="small" @click="handleDetail(order)">
                  详情
                </a-button>
                <a-button
                  v-if="order.orderStatus === 'PENDING'"
                  type="primary"
                  size="small"
                  @click="handleChangeStatus(order, 'CONFIRMED')"
                >
                  确认
                </a-button>
                <a-button
                  v-if="order.orderStatus === 'CONFIRMED'"
                  type="primary"
                  status="success"
                  size="small"
                  @click="handleChangeStatus(order, 'IN_SERVICE')"
                >
                  开始服务
                </a-button>
                <a-button
                  v-if="order.orderStatus === 'IN_SERVICE'"
                  type="primary"
                  size="small"
                  @click="handleChangeStatus(order, 'COMPLETED')"
                >
                  完成
                </a-button>
                <a-popconfirm
                  v-if="
                    order.orderStatus !== 'CANCELLED' &&
                    order.orderStatus !== 'COMPLETED'
                  "
                  content="确认取消该订单吗？"
                  @ok="handleChangeStatus(order, 'CANCELLED')"
                >
                  <a-button type="text" size="small" status="danger">
                    取消
                  </a-button>
                </a-popconfirm>
                <a-popconfirm
                  v-if="
                    order.orderStatus === 'CANCELLED' ||
                    order.orderStatus === 'COMPLETED'
                  "
                  content="确认删除该订单吗？"
                  @ok="handleDelete(order)"
                >
                  <a-button type="text" size="small" status="danger">
                    删除
                  </a-button>
                </a-popconfirm>
              </a-space>
            </div>
          </div>
        </div>
      </a-spin>

      <!-- 分页 -->
      <div v-if="total > queryParams.pageSize!" class="pager">
        <a-pagination
          :total="total"
          :current="queryParams.pageNum"
          :page-size="queryParams.pageSize"
          show-total
          show-page-size
          :page-size-options="[10, 20, 50]"
          @change="handleCurrentChange"
          @page-size-change="handleSizeChange"
        />
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onActivated } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import {
    IconSearch,
    IconRefresh,
    IconPlus,
    IconFile,
  } from '@arco-design/web-vue/es/icon';
  import {
    listOrder,
    changeOrderStatus,
    delOrder,
  } from '@/api/platform/nurseOrder';
  import {
    getOrderStatusText,
    getOrderStatusColor,
    type NurseOrder,
    type NurseOrderQuery,
  } from '@/types/maternity';

  const router = useRouter();
  const loading = ref(false);
  const dataList = ref<NurseOrder[]>([]);
  const total = ref(0);
  const pendingCount = ref(0);
  const activeTab = ref('');

  const queryParams = reactive<NurseOrderQuery>({
    pageNum: 1,
    pageSize: 10,
    customerName: undefined,
    nurseName: undefined,
    orderStatus: '',
  });

  async function getList() {
    loading.value = true;
    try {
      const params = { ...queryParams };
      if (!params.orderStatus) delete params.orderStatus;
      const res: any = await listOrder(params);
      dataList.value = res.rows || [];
      total.value = res.total || 0;
    } catch {
      Message.error('获取订单列表失败');
    } finally {
      loading.value = false;
    }
  }

  async function loadPendingCount() {
    try {
      const res: any = await listOrder({
        pageNum: 1,
        pageSize: 1,
        orderStatus: 'PENDING',
      });
      pendingCount.value = res.total || 0;
    } catch {
      // silent
    }
  }

  function handleQuery() {
    queryParams.pageNum = 1;
    getList();
  }

  function resetQuery() {
    queryParams.pageNum = 1;
    queryParams.pageSize = 10;
    queryParams.customerName = undefined;
    queryParams.nurseName = undefined;
    queryParams.orderStatus = '';
    activeTab.value = '';
    getList();
  }

  function handleTabChange(key: string | number) {
    queryParams.orderStatus = key as string;
    queryParams.pageNum = 1;
    getList();
  }

  function handleCurrentChange(page: number) {
    queryParams.pageNum = page;
    getList();
  }

  function handleSizeChange(size: number) {
    queryParams.pageSize = size;
    queryParams.pageNum = 1;
    getList();
  }

  function handleCreate() {
    router.push({ name: 'NurseOrderCreate' });
  }

  function handleDetail(order: NurseOrder) {
    router.push({
      name: 'NurseOrderDetail',
      params: { orderId: order.orderId },
    });
  }

  async function handleChangeStatus(order: NurseOrder, status: string) {
    try {
      await changeOrderStatus(order.orderId!, status);
      Message.success('操作成功');
      getList();
      loadPendingCount();
    } catch {
      Message.error('操作失败');
    }
  }

  async function handleDelete(order: NurseOrder) {
    try {
      await delOrder(order.orderId!);
      Message.success('删除成功');
      getList();
    } catch {
      Message.error('删除失败');
    }
  }

  getList();
  loadPendingCount();

  // 从创建/详情页返回时自动刷新列表
  onActivated(() => {
    getList();
    loadPendingCount();
  });
</script>

<style lang="less" scoped>
  .order-page {
    .main-card {
      border-radius: 12px;

      :deep(.arco-card-body) {
        padding: 20px;
      }
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    :deep(.arco-input-wrapper) {
      border-radius: 8px;
    }

    :deep(.arco-btn) {
      border-radius: 8px;
    }

    :deep(.arco-tabs-nav-tab) {
      margin-bottom: 16px;
    }

    :deep(.arco-tag) {
      border-radius: 6px;
    }
  }

  .order-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .order-card {
    overflow: hidden;
    background: var(--color-bg-2);
    border: 1px solid var(--color-border-2);
    border-radius: 12px;
    transition: all 0.25s ease;

    &:hover {
      border-color: rgb(var(--primary-6));
      box-shadow: 0 4px 16px rgb(0 0 0 / 6%);
    }
  }

  .order-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    background: var(--color-fill-1);
    border-bottom: 1px solid var(--color-border-1);
  }

  .order-no {
    display: flex;
    gap: 6px;
    align-items: center;
    color: var(--color-text-2);
    font-weight: 500;
    font-size: 13px;
  }

  .order-card-body {
    padding: 16px 20px;

    .info-label {
      margin-bottom: 4px;
      color: var(--color-text-3);
      font-size: 12px;
    }

    .info-value {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 14px;
    }

    .info-sub {
      margin-top: 2px;
      color: var(--color-text-3);
      font-size: 12px;
    }
  }

  .order-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    border-top: 1px solid var(--color-border-1);
  }

  .order-amount {
    display: flex;
    gap: 8px;
    align-items: baseline;

    .amount-label {
      color: var(--color-text-3);
      font-size: 12px;
    }

    .amount-value {
      color: rgb(var(--danger-6));
      font-weight: 700;
      font-size: 18px;
    }
  }

  .pager {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>
