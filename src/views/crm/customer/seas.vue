<template>
  <div class="crm-page">
    <a-card :bordered="false" class="section-card">
      <a-grid :cols="3" :col-gap="16" :row-gap="16">
        <a-grid-item>
          <div
            class="stat-tile"
            :class="{ active: currentTab === 'all' }"
            role="button"
            tabindex="0"
            @click="switchTab('all')"
            @keydown.enter="switchTab('all')"
          >
            <div class="stat-value">{{ seasTotal.sumTotal || 0 }}</div>
            <div class="stat-label">全部客户</div>
          </div>
        </a-grid-item>
        <a-grid-item>
          <div
            class="stat-tile warning"
            :class="{ active: currentTab === 'unassigned' }"
            role="button"
            tabindex="0"
            @click="switchTab('unassigned')"
            @keydown.enter="switchTab('unassigned')"
          >
            <div class="stat-value">{{ seasTotal.unTotal || 0 }}</div>
            <div class="stat-label">待分配</div>
          </div>
        </a-grid-item>
        <a-grid-item>
          <div
            class="stat-tile success"
            :class="{ active: currentTab === 'assigned' }"
            role="button"
            tabindex="0"
            @click="switchTab('assigned')"
            @keydown.enter="switchTab('assigned')"
          >
            <div class="stat-value">{{ seasTotal.stTotal || 0 }}</div>
            <div class="stat-label">已分配</div>
          </div>
        </a-grid-item>
      </a-grid>
    </a-card>

    <a-card :bordered="false" class="section-card">
      <div class="toolbar">
        <a-space wrap>
          <a-input
            v-model="queryParams.name"
            placeholder="客户姓名"
            allow-clear
            style="width: 200px"
            @press-enter="handleQuery"
          />
          <a-input
            v-model="queryParams.tel"
            placeholder="手机号"
            allow-clear
            style="width: 200px"
            @press-enter="handleQuery"
          />
          <a-select
            v-model="queryParams.intentLeve"
            placeholder="意向度"
            allow-clear
            style="width: 160px"
            :options="intentOptions"
            @change="handleQuery"
          />
          <a-button type="primary" @click="handleQuery">搜索</a-button>
          <a-button @click="resetQuery">重置</a-button>
        </a-space>
      </div>

      <a-table
        row-key="customerId"
        :loading="loading"
        :data="customerList"
        :pagination="pagination"
        @page-change="handleCurrentChange"
        @page-size-change="handleSizeChange"
      >
        <template #columns>
          <a-table-column
            title="客户姓名"
            data-index="name"
            :width="120"
            ellipsis
            tooltip
          />
          <a-table-column title="联系电话" data-index="tel" :width="140" />
          <a-table-column
            title="意向度"
            data-index="intentLeve"
            :width="100"
            align="center"
          >
            <template #cell="{ record }">
              <a-tag
                v-if="record.intentLeve"
                :color="getIntentColor(record.intentLeve)"
                size="small"
              >
                {{ record.intentLeve }}
              </a-tag>
              <span v-else>-</span>
            </template>
          </a-table-column>
          <a-table-column title="负责人" data-index="followerName" :width="120">
            <template #cell="{ record }">
              {{ record.followerName || '未分配' }}
            </template>
          </a-table-column>
          <a-table-column
            title="来源"
            data-index="source"
            :width="120"
            ellipsis
            tooltip
          />
          <a-table-column title="创建时间" data-index="createTime" :width="180">
            <template #cell="{ record }">
              {{ formatDate(record.createTime) }}
            </template>
          </a-table-column>
          <a-table-column
            title="操作"
            :width="200"
            align="center"
            fixed="right"
          >
            <template #cell="{ record }">
              <a-space>
                <a-link @click="handleDetail(record)">详情</a-link>
                <a-link
                  v-if="!record.followerName"
                  @click="handleAllocate(record)"
                  >分配</a-link
                >
                <a-link v-else status="danger" @click="handleRefund(record)"
                  >退回</a-link
                >
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:visible="allocateDialogVisible"
      title="分配客户"
      :ok-loading="submitLoading"
      @ok="submitAllocate"
      @cancel="allocateDialogVisible = false"
    >
      <a-form auto-label-width>
        <a-form-item label="分配给">
          <a-select
            v-model="allocateTarget"
            placeholder="请选择销售人员"
            allow-clear
            :options="salesOptions"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import dayjs from 'dayjs';
  import {
    allocationCustomer,
    getSeasPage,
    getSeasTotal,
    getUserPage,
    refundSeas,
  } from '@/api/crm/customerTrack';

  const router = useRouter();

  const loading = ref(false);
  const submitLoading = ref(false);

  const currentTab = ref<'all' | 'unassigned' | 'assigned'>('all');
  const seasTotal = ref<Record<string, any>>({});
  const customerList = ref<any[]>([]);
  const total = ref(0);
  const queryParams = ref<Record<string, any>>({
    pageNum: 1,
    pageSize: 10,
    name: '',
    tel: '',
    intentLeve: undefined,
    isAllocation: undefined,
  });

  const salesList = ref<any[]>([]);
  const salesOptions = computed(() =>
    salesList.value.map((u) => ({ label: u.nickname, value: u.userId }))
  );

  const intentOptions = [
    { label: '高意向', value: '高意向' },
    { label: '中意向', value: '中意向' },
    { label: '低意向', value: '低意向' },
  ];

  const pagination = computed(() => ({
    current: queryParams.value.pageNum,
    pageSize: queryParams.value.pageSize,
    total: total.value,
    showTotal: true,
    showJumper: true,
    showPageSize: true,
    pageSizeOptions: [10, 20, 50, 100],
  }));

  const allocateDialogVisible = ref(false);
  const allocateTarget = ref<number | undefined>(undefined);
  const allocateCustomerId = ref<number | undefined>(undefined);

  const formatDate = (value: string) => {
    if (!value) return '-';
    const d = dayjs(value);
    return d.isValid() ? d.format('YYYY-MM-DD HH:mm:ss') : String(value);
  };

  const getIntentColor = (level: string) => {
    const map: Record<string, string> = {
      高意向: 'green',
      中意向: 'orange',
      低意向: 'gray',
    };
    return map[level] || 'gray';
  };

  const loadSeasTotal = async () => {
    const res: any = await getSeasTotal();
    seasTotal.value = res.data || {};
  };

  const loadList = async () => {
    loading.value = true;
    try {
      const res: any = await getSeasPage(queryParams.value);
      customerList.value = res.rows || [];
      total.value = res.total || 0;
    } finally {
      loading.value = false;
    }
  };

  const loadSalesList = async () => {
    const res: any = await getUserPage({ pageNum: 1, pageSize: 999 });
    salesList.value = res.rows || [];
  };

  const switchTab = async (tab: 'all' | 'unassigned' | 'assigned') => {
    currentTab.value = tab;
    if (tab === 'all') {
      queryParams.value.isAllocation = undefined;
    } else if (tab === 'unassigned') {
      queryParams.value.isAllocation = 1;
    } else {
      queryParams.value.isAllocation = 2;
    }
    queryParams.value.pageNum = 1;
    await loadList();
  };

  const handleQuery = async () => {
    queryParams.value.pageNum = 1;
    await loadList();
  };

  const resetQuery = async () => {
    queryParams.value = {
      pageNum: 1,
      pageSize: 10,
      name: '',
      tel: '',
      intentLeve: undefined,
      isAllocation: undefined,
    };
    currentTab.value = 'all';
    await loadList();
  };

  const handleSizeChange = async (pageSize: number) => {
    queryParams.value.pageSize = pageSize;
    queryParams.value.pageNum = 1;
    await loadList();
  };

  const handleCurrentChange = async (pageNum: number) => {
    queryParams.value.pageNum = pageNum;
    await loadList();
  };

  const handleDetail = (row: any) => {
    router.push({
      name: 'CrmCustomerDetail',
      params: { customerId: row.customerId },
    });
  };

  const handleAllocate = (row: any) => {
    allocateCustomerId.value = row.customerId;
    allocateTarget.value = undefined;
    allocateDialogVisible.value = true;
  };

  const submitAllocate = async () => {
    if (!allocateCustomerId.value || !allocateTarget.value) {
      Message.warning('请选择销售人员');
      return;
    }
    submitLoading.value = true;
    try {
      await allocationCustomer({
        customerId: allocateCustomerId.value,
        followerId: allocateTarget.value,
      });
      Message.success('分配成功');
      allocateDialogVisible.value = false;
      await Promise.all([loadList(), loadSeasTotal()]);
    } finally {
      submitLoading.value = false;
    }
  };

  const handleRefund = (row: any) => {
    Modal.confirm({
      title: '提示',
      content: `确认将客户「${row.name}」退回公海？`,
      onOk: async () => {
        await refundSeas({ customerId: row.customerId });
        Message.success('已退回公海');
        await Promise.all([loadList(), loadSeasTotal()]);
      },
    });
  };

  const init = async () => {
    await Promise.all([loadSeasTotal(), loadList(), loadSalesList()]);
  };

  init();
</script>

<style scoped lang="less">
  .crm-page {
    padding: 16px 20px;
  }

  .section-card {
    margin-bottom: 16px;
  }

  .stat-tile {
    border-radius: 6px;
    border: 1px solid var(--color-border-2);
    padding: 14px 14px 12px;
    background: var(--color-bg-2);
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: center;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
    }

    &.active {
      border-color: rgb(var(--primary-6));
      background: var(--color-primary-light-1);
    }

    &.warning {
      .stat-value {
        color: rgb(var(--warning-6));
      }
    }

    &.success {
      .stat-value {
        color: rgb(var(--success-6));
      }
    }

    .stat-value {
      font-size: 26px;
      font-weight: 700;
      color: rgb(var(--primary-6));
      line-height: 1.1;
    }

    .stat-label {
      margin-top: 8px;
      color: var(--color-text-3);
      font-size: 12px;
    }
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }
</style>
