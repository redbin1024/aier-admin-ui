<template>
  <div class="crm-page">
    <a-card :bordered="false" class="section-card">
      <template #title>线索数据</template>
      <template #extra>
        <a-space>
          <a-radio-group
            v-model="statsPeriod"
            type="button"
            @change="loadLeadStats"
          >
            <a-radio :value="2">今日</a-radio>
            <a-radio :value="0">本月</a-radio>
            <a-radio :value="1">历史</a-radio>
          </a-radio-group>
          <a-date-picker
            v-if="statsPeriod === 1"
            v-model="historyMonth"
            type="month"
            value-format="YYYY-MM"
            style="width: 160px"
            @change="loadLeadStats"
          />
        </a-space>
      </template>

      <a-grid :cols="6" :col-gap="16" :row-gap="16">
        <a-grid-item v-for="item in statsCards" :key="item.key">
          <div
            class="stat-tile"
            :class="{ active: activeStatKey === item.key }"
            :style="{ borderLeftColor: item.color }"
            role="button"
            tabindex="0"
            @click="handleStatClick(item)"
            @keydown.enter="handleStatClick(item)"
          >
            <div class="stat-value" :style="{ color: item.color }">
              <span v-if="item.key === 'amount'"
                >¥{{ formatAmount(leadStats.amount) }}</span
              >
              <span v-else>{{ leadStats[item.key] ?? 0 }}</span>
            </div>
            <div class="stat-label">{{ item.label }}</div>
          </div>
        </a-grid-item>
      </a-grid>
    </a-card>

    <a-card :bordered="false" class="section-card">
      <div class="toolbar">
        <a-space wrap>
          <a-input
            v-model="queryParams.keyword"
            placeholder="搜索客户姓名或手机号"
            allow-clear
            style="width: 240px"
            @press-enter="handleQuery"
          />
          <a-select
            v-model="queryParams.followerId"
            placeholder="负责人"
            allow-clear
            style="width: 160px"
            :options="salesOptions"
            @change="handleQuery"
          />
          <a-select
            v-model="queryParams.intentLeve"
            placeholder="意向度"
            allow-clear
            style="width: 140px"
            :options="intentOptions"
            @change="handleQuery"
          />
          <a-select
            v-model="queryParams.source"
            placeholder="来源"
            allow-clear
            style="width: 160px"
            :options="sourceOptions"
            @change="handleQuery"
          />
          <a-button type="primary" @click="handleQuery">搜索</a-button>
          <a-button @click="resetQuery">重置</a-button>
        </a-space>
        <a-space>
          <a-button type="primary" status="success" @click="handleAdd"
            >新增客户</a-button
          >
          <a-button status="warning" @click="handleExport">导出</a-button>
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
            title="业务负责人"
            data-index="followerName"
            :width="120"
          >
            <template #cell="{ record }">
              <span>{{ record.followerName || '未分配' }}</span>
            </template>
          </a-table-column>
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
            title="跟进状态"
            data-index="leadStatus"
            :width="100"
            align="center"
          >
            <template #cell="{ record }">
              <a-tag
                v-if="record.leadStatus === 'FOLLOWED_UP'"
                color="green"
                size="small"
                >已跟进</a-tag
              >
              <a-tag v-else color="gray" size="small">未跟进</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="成交状态" :width="100" align="center">
            <template #cell="{ record }">
              <a-tag v-if="record.isDeal" color="orange" size="small"
                >已成交</a-tag
              >
              <span v-else>-</span>
            </template>
          </a-table-column>
          <a-table-column
            title="操作"
            :width="240"
            align="center"
            fixed="right"
          >
            <template #cell="{ record }">
              <a-space>
                <a-link @click="handleDetail(record)">详情</a-link>
                <a-link @click="handleFollowUp(record)">跟进</a-link>
                <a-link @click="handleRemark(record)">备注</a-link>
                <a-link status="danger" @click="handleDelete(record)"
                  >删除</a-link
                >
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :ok-loading="submitLoading"
      @ok="submitCustomer"
      @cancel="dialogVisible = false"
    >
      <a-form
        ref="customerFormRef"
        :model="customerForm"
        :rules="customerRules"
        auto-label-width
      >
        <a-form-item label="客户姓名" field="name">
          <a-input v-model="customerForm.name" allow-clear />
        </a-form-item>
        <a-form-item label="联系电话" field="tel">
          <a-input v-model="customerForm.tel" allow-clear />
        </a-form-item>
        <a-form-item label="客户来源" field="source">
          <a-select
            v-model="customerForm.source"
            :options="sourceOptions"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="意向度" field="intentLeve">
          <a-select
            v-model="customerForm.intentLeve"
            :options="intentOptions"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="预产期" field="dueDate">
          <a-date-picker
            v-model="customerForm.dueDate"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="备注" field="notes">
          <a-textarea
            v-model="customerForm.notes"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="followDialogVisible"
      title="跟进客户"
      :ok-loading="submitLoading"
      @ok="submitFollow"
      @cancel="followDialogVisible = false"
    >
      <a-form
        ref="followFormRef"
        :model="followForm"
        :rules="followRules"
        auto-label-width
      >
        <a-form-item label="跟进内容" field="content">
          <a-textarea
            v-model="followForm.content"
            :auto-size="{ minRows: 4, maxRows: 8 }"
          />
        </a-form-item>
        <a-form-item label="意向度" field="intentLeve">
          <a-select
            v-model="followForm.intentLeve"
            :options="intentOptions"
            allow-clear
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="remarkDialogVisible"
      title="备注"
      :ok-loading="submitLoading"
      @ok="submitRemark"
      @cancel="remarkDialogVisible = false"
    >
      <a-form ref="remarkFormRef" :model="remarkForm" auto-label-width>
        <a-form-item label="备注内容" field="notes">
          <a-textarea
            v-model="remarkForm.notes"
            :auto-size="{ minRows: 4, maxRows: 8 }"
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
    createCustomer,
    customerOperate,
    deleteCustomer,
    getCustomerPage,
    getLeadStats,
    getSourceList,
    getUserPage,
  } from '@/api/crm/customerTrack';
  import { downloadRequest } from '@/utils/download';

  const router = useRouter();

  const loading = ref(false);
  const submitLoading = ref(false);

  const statsPeriod = ref<number>(0);
  const historyMonth = ref<string>('');
  const leadStats = ref<Record<string, any>>({});
  const activeStatKey = ref<string | null>(null);

  const customerList = ref<any[]>([]);
  const total = ref(0);
  const queryParams = ref<Record<string, any>>({
    pageNum: 1,
    pageSize: 10,
    keyword: '',
    followerId: undefined,
    intentLeve: undefined,
    source: undefined,
  });

  const salesList = ref<any[]>([]);
  const sourceList = ref<string[]>([]);

  const salesOptions = computed(() =>
    salesList.value.map((u) => ({ label: u.nickname, value: u.userId }))
  );
  const sourceOptions = computed(() =>
    sourceList.value.map((s) => ({ label: s, value: s }))
  );

  const intentOptions = [
    { label: '高意向', value: '高意向' },
    { label: '中意向', value: '中意向' },
    { label: '低意向', value: '低意向' },
  ];

  const statsCards = [
    {
      key: 'leads',
      label: '毛客',
      color: 'rgb(var(--primary-6))',
      customerType: 0,
    },
    {
      key: 'followUp',
      label: '跟进',
      color: 'rgb(var(--warning-6))',
      customerType: 1,
    },
    {
      key: 'validLeads',
      label: '有效',
      color: 'rgb(var(--success-6))',
      customerType: 2,
    },
    {
      key: 'arrivals',
      label: '到店',
      color: 'rgb(var(--arcoblue-6))',
      customerType: 3,
    },
    {
      key: 'deals',
      label: '成交',
      color: 'rgb(var(--danger-6))',
      customerType: 4,
    },
    {
      key: 'amount',
      label: '金额',
      color: 'rgb(var(--orange-6))',
      customerType: 5,
    },
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

  const customerFormRef = ref();
  const dialogVisible = ref(false);
  const dialogTitle = ref('新增客户');
  const customerForm = ref<Record<string, any>>({});
  const customerRules = {
    name: [{ required: true, message: '请输入客户姓名' }],
    tel: [{ required: true, message: '请输入联系电话' }],
  };

  const followFormRef = ref();
  const followDialogVisible = ref(false);
  const followForm = ref<Record<string, any>>({});
  const followRules = {
    content: [{ required: true, message: '请输入跟进内容' }],
  };

  const remarkFormRef = ref();
  const remarkDialogVisible = ref(false);
  const remarkForm = ref<Record<string, any>>({
    customerId: undefined,
    notes: '',
  });

  const formatDate = (value: string) => {
    if (!value) return '-';
    const d = dayjs(value);
    return d.isValid() ? d.format('YYYY-MM-DD HH:mm:ss') : String(value);
  };

  const formatAmount = (val: any) => {
    const num = Number(val ?? 0);
    if (Number.isNaN(num)) return '0.00';
    if (num >= 10000) return `${(num / 10000).toFixed(1)}万`;
    return num.toFixed(2);
  };

  const getIntentColor = (level: string) => {
    const map: Record<string, string> = {
      高意向: 'green',
      中意向: 'orange',
      低意向: 'gray',
    };
    return map[level] || 'gray';
  };

  const syncPeriodToQuery = () => {
    queryParams.value.queryPeriod = statsPeriod.value;
    if (statsPeriod.value === 1 && historyMonth.value) {
      const [yearStr, monthStr] = historyMonth.value.split('-');
      queryParams.value.year = Number(yearStr);
      queryParams.value.month = Number(monthStr) - 1;
    } else {
      delete queryParams.value.year;
      delete queryParams.value.month;
    }
  };

  const loadSalesList = async () => {
    const res: any = await getUserPage({ pageNum: 1, pageSize: 999 });
    salesList.value = res.rows || [];
  };

  const loadSourceList = async () => {
    const res: any = await getSourceList();
    sourceList.value = res.data || [];
  };

  const loadCustomerList = async () => {
    loading.value = true;
    try {
      syncPeriodToQuery();
      const res: any = await getCustomerPage(queryParams.value);
      customerList.value = res.rows || [];
      total.value = res.total || 0;
    } finally {
      loading.value = false;
    }
  };

  const loadLeadStats = async () => {
    const query: Record<string, any> = { queryPeriod: statsPeriod.value };
    if (statsPeriod.value === 1 && historyMonth.value) {
      const [yearStr, monthStr] = historyMonth.value.split('-');
      query.year = Number(yearStr);
      query.month = Number(monthStr) - 1;
    }
    const res: any = await getLeadStats(query);
    leadStats.value = res.data || {};
    queryParams.value.pageNum = 1;
    await loadCustomerList();
  };

  const handleStatClick = async (item: any) => {
    if (activeStatKey.value === item.key) {
      activeStatKey.value = null;
      delete queryParams.value.customerType;
    } else {
      activeStatKey.value = item.key;
      queryParams.value.customerType = item.customerType;
    }
    queryParams.value.pageNum = 1;
    await loadCustomerList();
  };

  const handleQuery = async () => {
    queryParams.value.pageNum = 1;
    await loadCustomerList();
  };

  const resetQuery = async () => {
    activeStatKey.value = null;
    statsPeriod.value = 0;
    historyMonth.value = '';
    queryParams.value = {
      pageNum: 1,
      pageSize: 10,
      keyword: '',
      followerId: undefined,
      intentLeve: undefined,
      source: undefined,
    };
    await loadLeadStats();
  };

  const handleSizeChange = async (pageSize: number) => {
    queryParams.value.pageSize = pageSize;
    queryParams.value.pageNum = 1;
    await loadCustomerList();
  };

  const handleCurrentChange = async (pageNum: number) => {
    queryParams.value.pageNum = pageNum;
    await loadCustomerList();
  };

  const handleAdd = () => {
    dialogTitle.value = '新增客户';
    customerForm.value = {
      name: '',
      tel: '',
      source: undefined,
      intentLeve: undefined,
      dueDate: undefined,
      notes: '',
    };
    dialogVisible.value = true;
  };

  const submitCustomer = async () => {
    const errors = await customerFormRef.value?.validate();
    if (errors) return;
    submitLoading.value = true;
    try {
      await createCustomer(customerForm.value);
      Message.success('新增成功');
      dialogVisible.value = false;
      await loadCustomerList();
      await loadLeadStats();
    } finally {
      submitLoading.value = false;
    }
  };

  const handleDetail = (row: any) => {
    router.push({
      name: 'CrmCustomerDetail',
      params: { customerId: row.customerId },
    });
  };

  const handleFollowUp = (row: any) => {
    followForm.value = {
      customerId: row.customerId,
      content: '',
      intentLeve: row.intentLeve || undefined,
    };
    followDialogVisible.value = true;
  };

  const submitFollow = async () => {
    const errors = await followFormRef.value?.validate();
    if (errors) return;
    submitLoading.value = true;
    try {
      await customerOperate(followForm.value);
      Message.success('跟进成功');
      followDialogVisible.value = false;
      await loadCustomerList();
    } finally {
      submitLoading.value = false;
    }
  };

  const handleRemark = (row: any) => {
    remarkForm.value = { customerId: row.customerId, notes: row.notes || '' };
    remarkDialogVisible.value = true;
  };

  const submitRemark = async () => {
    submitLoading.value = true;
    try {
      await customerOperate({
        customerId: remarkForm.value.customerId,
        notes: remarkForm.value.notes,
        content: '修改备注',
      });
      Message.success('备注成功');
      remarkDialogVisible.value = false;
      await loadCustomerList();
    } finally {
      submitLoading.value = false;
    }
  };

  const handleDelete = (row: any) => {
    Modal.confirm({
      title: '提示',
      content: `确认删除客户「${row.name}」吗？`,
      onOk: async () => {
        await deleteCustomer({ customerId: row.customerId });
        Message.success('删除成功');
        await loadCustomerList();
        await loadLeadStats();
      },
    });
  };

  const handleExport = () => {
    Modal.confirm({
      title: '提示',
      content: '是否确认导出客资数据？',
      onOk: async () => {
        syncPeriodToQuery();
        await downloadRequest({
          url: '/mp/customer_track/export',
          method: 'POST',
          data: queryParams.value,
          filename: '客资列表.xlsx',
        });
      },
    });
  };

  const init = async () => {
    await Promise.all([loadSalesList(), loadSourceList()]);
    await loadLeadStats();
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
    border-left: 4px solid transparent;
    padding: 12px 12px 10px;
    background: var(--color-bg-2);
    cursor: pointer;
    transition: all 0.15s ease;
    user-select: none;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
    }

    &.active {
      background: var(--color-primary-light-1);
      border-color: var(--color-primary-light-3);
    }

    .stat-value {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.2;
    }

    .stat-label {
      margin-top: 6px;
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
