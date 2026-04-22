<template>
  <div class="crm-page">
    <a-card :bordered="false" class="section-card">
      <template #title>订单数据</template>
      <a-grid :cols="4" :col-gap="16" :row-gap="16">
        <a-grid-item v-for="item in statsCards" :key="item.key">
          <div
            class="stat-tile"
            :class="{
              active: activeStatKey === item.key,
              disabled: item.key === 'totalAmount',
            }"
            :style="{ borderLeftColor: item.color }"
            role="button"
            tabindex="0"
            @click="handleStatClick(item)"
            @keydown.enter="handleStatClick(item)"
          >
            <div class="stat-value" :style="{ color: item.color }">
              <span v-if="item.key === 'totalAmount'"
                >¥{{ formatAmount(orderStats.totalAmount) }}</span
              >
              <span v-else>{{ orderStats[item.key] ?? 0 }}</span>
            </div>
            <div class="stat-label">{{ item.label }}</div>
          </div>
        </a-grid-item>
      </a-grid>
    </a-card>

    <a-card :bordered="false" class="section-card">
      <a-tabs v-model:active-key="activeTab" @change="handleTabChange">
        <a-tab-pane key="0" title="已交定金" />
        <a-tab-pane key="1" title="已交合同金" />
        <a-tab-pane key="all" title="全部" />
      </a-tabs>

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
            v-model="queryParams.userId"
            placeholder="签约人"
            allow-clear
            style="width: 160px"
            :options="salesOptions"
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
          <a-select
            v-model="queryParams.dateType"
            placeholder="时间范围"
            allow-clear
            style="width: 160px"
            :options="dateTypeOptions"
            @change="handleDateTypeChange"
          />
          <a-range-picker
            v-if="queryParams.dateType === 5"
            v-model="dateRange"
            value-format="YYYY-MM-DD"
            style="width: 280px"
            @change="handleQuery"
          />
          <a-button type="primary" @click="handleQuery">搜索</a-button>
          <a-button @click="resetQuery">重置</a-button>
        </a-space>
        <a-space>
          <a-button type="primary" status="warning" @click="handleExport">
            <template #icon><icon-download /></template>
            导出
          </a-button>
        </a-space>
      </div>

      <a-table
        row-key="id"
        :loading="loading"
        :data="orderList"
        :pagination="pagination"
        @page-change="handleCurrentChange"
        @page-size-change="handleSizeChange"
      >
        <template #columns>
          <a-table-column
            title="客户姓名"
            data-index="customerName"
            :width="120"
            ellipsis
            tooltip
          />
          <a-table-column title="联系电话" data-index="tel" :width="140" />
          <a-table-column title="实收类型" :width="110" align="center">
            <template #cell="{ record }">
              <a-tag
                :color="record.actualPaymentType === 0 ? 'orange' : 'green'"
                size="small"
              >
                {{ record.actualPaymentType === 0 ? '定金' : '合同金' }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="实收金额" :width="120" align="right">
            <template #cell="{ record }">
              <span v-if="record.paymentAmount != null" class="money"
                >¥{{ record.paymentAmount }}</span
              >
              <span v-else>-</span>
            </template>
          </a-table-column>
          <a-table-column title="签约人" data-index="salesName" :width="100" />
          <a-table-column
            title="套餐名称"
            data-index="packageName"
            :width="160"
            ellipsis
            tooltip
          />
          <a-table-column
            title="来源"
            data-index="source"
            :width="100"
            ellipsis
            tooltip
          />
          <a-table-column
            title="签约时间"
            data-index="contractSignDate"
            :width="120"
          />
          <a-table-column
            title="服务开始"
            data-index="serviceStartDate"
            :width="120"
          >
            <template #cell="{ record }">
              {{ record.serviceStartDate || '-' }}
            </template>
          </a-table-column>
          <a-table-column
            title="服务结束"
            data-index="serviceEndDate"
            :width="120"
          >
            <template #cell="{ record }">
              {{ record.serviceEndDate || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="房间号" data-index="roomNumber" :width="90" />
          <a-table-column title="状态" :width="90" align="center">
            <template #cell="{ record }">
              <a-tag v-if="record.isCancel" color="red" size="small"
                >已取消</a-tag
              >
              <a-tag v-else color="green" size="small">正常</a-tag>
            </template>
          </a-table-column>
          <a-table-column
            title="操作"
            :width="320"
            align="center"
            fixed="right"
          >
            <template #cell="{ record }">
              <a-space>
                <a-link @click="handleDetail(record)">详情</a-link>
                <a-link v-if="!record.isCancel" @click="handleEdit(record)"
                  >编辑</a-link
                >
                <a-link
                  v-if="!record.isCancel"
                  status="danger"
                  @click="handleCancel(record)"
                  >取消</a-link
                >
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:visible="detailDialogVisible"
      title="订单详情"
      :footer="false"
      width="760px"
      @cancel="detailDialogVisible = false"
    >
      <a-descriptions v-if="currentOrder" :column="2" bordered size="medium">
        <a-descriptions-item label="客户姓名">{{
          currentOrder.customerName
        }}</a-descriptions-item>
        <a-descriptions-item label="联系电话">{{
          currentOrder.tel
        }}</a-descriptions-item>
        <a-descriptions-item label="实收类型">
          <a-tag
            :color="currentOrder.actualPaymentType === 0 ? 'orange' : 'green'"
            size="small"
          >
            {{ currentOrder.actualPaymentType === 0 ? '定金' : '合同金' }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="实收金额">
          <span class="money">¥{{ currentOrder.paymentAmount }}</span>
        </a-descriptions-item>
        <a-descriptions-item label="定金">
          <span>{{
            currentOrder.depositAmount != null
              ? `¥${currentOrder.depositAmount}`
              : '-'
          }}</span>
        </a-descriptions-item>
        <a-descriptions-item label="合同金">
          <span>{{
            currentOrder.contractAmount != null
              ? `¥${currentOrder.contractAmount}`
              : '-'
          }}</span>
        </a-descriptions-item>
        <a-descriptions-item label="未收金额">
          <span class="danger">{{
            currentOrder.unpaidAmount != null
              ? `¥${currentOrder.unpaidAmount}`
              : '-'
          }}</span>
        </a-descriptions-item>
        <a-descriptions-item label="其他费用">
          <span>{{
            currentOrder.otherAmount != null
              ? `¥${currentOrder.otherAmount}`
              : '-'
          }}</span>
        </a-descriptions-item>
        <a-descriptions-item label="签约人">{{
          currentOrder.salesName || '-'
        }}</a-descriptions-item>
        <a-descriptions-item label="来源">{{
          currentOrder.source || '-'
        }}</a-descriptions-item>
        <a-descriptions-item label="套餐名称">{{
          currentOrder.packageName || '-'
        }}</a-descriptions-item>
        <a-descriptions-item label="套餐价格">
          <span>{{
            currentOrder.mealPrice != null ? `¥${currentOrder.mealPrice}` : '-'
          }}</span>
        </a-descriptions-item>
        <a-descriptions-item label="房间号">{{
          currentOrder.roomNumber || '-'
        }}</a-descriptions-item>
        <a-descriptions-item label="签约时间">{{
          currentOrder.contractSignDate || '-'
        }}</a-descriptions-item>
        <a-descriptions-item label="服务开始">{{
          currentOrder.serviceStartDate || '-'
        }}</a-descriptions-item>
        <a-descriptions-item label="服务结束">{{
          currentOrder.serviceEndDate || '-'
        }}</a-descriptions-item>
        <a-descriptions-item label="合同天数">{{
          currentOrder.contractDays || '-'
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">
          <a-tag v-if="currentOrder.isCancel" color="red" size="small"
            >已取消</a-tag
          >
          <a-tag v-else color="green" size="small">正常</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="备注" :span="2">{{
          currentOrder.contractNotes || '-'
        }}</a-descriptions-item>
      </a-descriptions>
      <div v-if="currentOrder && !currentOrder.isCancel" class="detail-footer">
        <a-space>
          <a-button
            v-if="currentOrder.actualPaymentType === 0"
            type="primary"
            @click="handleCollectPayment"
          >
            收取合同金
          </a-button>
          <a-button status="warning" @click="handleExtension"
            >订单延期</a-button
          >
          <a-button @click="detailDialogVisible = false">关闭</a-button>
        </a-space>
      </div>
      <div v-else class="detail-footer">
        <a-button @click="detailDialogVisible = false">关闭</a-button>
      </div>
    </a-modal>

    <a-modal
      v-model:visible="editDialogVisible"
      title="编辑订单"
      width="700px"
      :ok-loading="submitLoading"
      @ok="submitEdit"
      @cancel="editDialogVisible = false"
    >
      <a-form
        ref="editFormRef"
        :model="editForm"
        :rules="editRules"
        auto-label-width
      >
        <a-form-item label="套餐" field="mealId">
          <a-select
            v-model="editForm.mealId"
            :options="packageOptions"
            allow-clear
            @change="handlePackageChange"
          />
        </a-form-item>
        <a-form-item label="实收金额" field="paymentAmount">
          <a-input-number
            v-model="editForm.paymentAmount"
            :min="0"
            :precision="2"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="其他费用" field="otherAmount">
          <a-input-number
            v-model="editForm.otherAmount"
            :min="0"
            :precision="2"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="未收金额" field="unpaidAmount">
          <a-input-number
            v-model="editForm.unpaidAmount"
            :min="0"
            :precision="2"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="服务开始" field="serviceStartDate">
          <a-date-picker
            v-model="editForm.serviceStartDate"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="服务结束" field="serviceEndDate">
          <a-date-picker
            v-model="editForm.serviceEndDate"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="备注" field="contractNotes">
          <a-textarea
            v-model="editForm.contractNotes"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="paymentDialogVisible"
      title="收取合同金"
      :ok-loading="submitLoading"
      @ok="submitPayment"
      @cancel="paymentDialogVisible = false"
    >
      <a-form
        ref="paymentFormRef"
        :model="paymentForm"
        :rules="paymentRules"
        auto-label-width
      >
        <a-form-item label="合同金额" field="contractAmount">
          <a-input-number
            v-model="paymentForm.contractAmount"
            :min="0"
            :precision="2"
            style="width: 100%"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="extensionDialogVisible"
      title="订单延期"
      :ok-loading="submitLoading"
      @ok="submitExtension"
      @cancel="extensionDialogVisible = false"
    >
      <a-form
        ref="extensionFormRef"
        :model="extensionForm"
        :rules="extensionRules"
        auto-label-width
      >
        <a-form-item label="延期至" field="serviceEndDate">
          <a-date-picker
            v-model="extensionForm.serviceEndDate"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import { IconDownload } from '@arco-design/web-vue/es/icon';
  import {
    cancelOrder,
    collectContractPayment,
    extensionOrder,
    getContractDetail,
    getContractPage,
    getContractStats,
    getPackageList,
    updateOrder,
  } from '@/api/crm/customerOrder';
  import { getSourceList, getUserPage } from '@/api/crm/customerTrack';
  import { downloadRequest } from '@/utils/download';

  const loading = ref(false);
  const submitLoading = ref(false);

  const activeTab = ref<'0' | '1' | 'all'>('all');

  const orderStats = ref<Record<string, any>>({
    totalOrders: 0,
    depositOrders: 0,
    contractOrders: 0,
    totalAmount: 0,
  });
  const statsCards = [
    { key: 'totalOrders', label: '全部订单', color: 'rgb(var(--primary-6))' },
    { key: 'depositOrders', label: '已交定金', color: 'rgb(var(--warning-6))' },
    {
      key: 'contractOrders',
      label: '已交合同金',
      color: 'rgb(var(--success-6))',
    },
    { key: 'totalAmount', label: '总金额', color: 'rgb(var(--danger-6))' },
  ];
  const activeStatKey = ref<string | null>(null);

  const orderList = ref<any[]>([]);
  const total = ref(0);
  const queryParams = ref<Record<string, any>>({
    pageNum: 1,
    pageSize: 10,
    actualPaymentType: undefined,
    keyword: '',
    userId: undefined,
    source: undefined,
    dateType: undefined,
    startDate: undefined,
    endDate: undefined,
  });
  const dateRange = ref<string[]>([]);

  const salesList = ref<any[]>([]);
  const sourceList = ref<string[]>([]);
  const packageList = ref<any[]>([]);

  const salesOptions = computed(() =>
    salesList.value.map((u) => ({ label: u.nickname, value: u.userId }))
  );
  const sourceOptions = computed(() =>
    sourceList.value.map((s) => ({ label: s, value: s }))
  );
  const packageOptions = computed(() =>
    packageList.value.map((p) => ({ label: p.packageName, value: p.packageId }))
  );

  const dateTypeOptions = [
    { label: '近一个月', value: 1 },
    { label: '近三个月', value: 2 },
    { label: '近半年', value: 3 },
    { label: '近一年', value: 4 },
    { label: '自定义', value: 5 },
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

  const detailDialogVisible = ref(false);
  const currentOrder = ref<any>(null);

  const editDialogVisible = ref(false);
  const editFormRef = ref();
  const editForm = ref<Record<string, any>>({});
  const editRules = {
    paymentAmount: [{ required: true, message: '请输入实收金额' }],
    serviceStartDate: [{ required: true, message: '请选择服务开始时间' }],
    serviceEndDate: [{ required: true, message: '请选择服务结束时间' }],
  };

  const paymentDialogVisible = ref(false);
  const paymentFormRef = ref();
  const paymentForm = ref<Record<string, any>>({});
  const paymentRules = {
    contractAmount: [{ required: true, message: '请输入合同金额' }],
  };

  const extensionDialogVisible = ref(false);
  const extensionFormRef = ref();
  const extensionForm = ref<Record<string, any>>({});
  const extensionRules = {
    serviceEndDate: [{ required: true, message: '请选择延期日期' }],
  };

  const formatAmount = (val: any) => {
    const num = Number(val ?? 0);
    if (Number.isNaN(num)) return '0.00';
    return num.toFixed(2);
  };

  const loadStats = async () => {
    const res: any = await getContractStats();
    orderStats.value = res.data || {};
  };

  const loadList = async () => {
    loading.value = true;
    try {
      const res: any = await getContractPage(queryParams.value);
      orderList.value = res.rows || [];
      total.value = res.total || 0;
    } finally {
      loading.value = false;
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

  const loadPackageList = async () => {
    const res: any = await getPackageList();
    packageList.value = res.data || [];
  };

  const handleStatClick = async (item: any) => {
    if (item.key === 'totalAmount') return;
    if (activeStatKey.value === item.key) {
      activeStatKey.value = null;
      activeTab.value = 'all';
      queryParams.value.actualPaymentType = undefined;
    } else {
      activeStatKey.value = item.key;
      if (item.key === 'totalOrders') {
        activeTab.value = 'all';
        queryParams.value.actualPaymentType = undefined;
      } else if (item.key === 'depositOrders') {
        activeTab.value = '0';
        queryParams.value.actualPaymentType = 0;
      } else if (item.key === 'contractOrders') {
        activeTab.value = '1';
        queryParams.value.actualPaymentType = 1;
      }
    }
    queryParams.value.pageNum = 1;
    await loadList();
  };

  const handleTabChange = async (key: string | number) => {
    activeStatKey.value = null;
    if (key === 'all') {
      queryParams.value.actualPaymentType = undefined;
    } else {
      queryParams.value.actualPaymentType = Number(key);
    }
    queryParams.value.pageNum = 1;
    await loadList();
  };

  const handleQuery = async () => {
    if (queryParams.value.dateType === 5 && dateRange.value.length === 2) {
      const [startDate, endDate] = dateRange.value;
      queryParams.value.startDate = startDate;
      queryParams.value.endDate = endDate;
    } else {
      queryParams.value.startDate = undefined;
      queryParams.value.endDate = undefined;
    }
    queryParams.value.pageNum = 1;
    await loadList();
  };

  const handleDateTypeChange = async () => {
    if (queryParams.value.dateType !== 5) {
      dateRange.value = [];
      await handleQuery();
    }
  };

  const resetQuery = async () => {
    queryParams.value = {
      pageNum: 1,
      pageSize: 10,
      actualPaymentType:
        activeTab.value === 'all' ? undefined : Number(activeTab.value),
      keyword: '',
      userId: undefined,
      source: undefined,
      dateType: undefined,
      startDate: undefined,
      endDate: undefined,
    };
    dateRange.value = [];
    activeStatKey.value = null;
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

  const handleDetail = async (row: any) => {
    const res: any = await getContractDetail({ id: row.id });
    currentOrder.value = res.data || row;
    detailDialogVisible.value = true;
  };

  const handleEdit = (row: any) => {
    editForm.value = { ...row };
    editDialogVisible.value = true;
  };

  const handlePackageChange = (val: any) => {
    if (!val) {
      editForm.value.mealName = '';
      return;
    }
    const pkg = packageList.value.find((p) => p.packageId === val);
    if (pkg) editForm.value.mealName = pkg.packageName;
  };

  const submitEdit = async () => {
    const errors = await editFormRef.value?.validate();
    if (errors) return;
    submitLoading.value = true;
    try {
      await updateOrder(editForm.value);
      Message.success('修改成功');
      editDialogVisible.value = false;
      await Promise.all([loadList(), loadStats()]);
    } finally {
      submitLoading.value = false;
    }
  };

  const handleCancel = (row: any) => {
    Modal.confirm({
      title: '提示',
      content: '确认取消该订单吗？',
      onOk: async () => {
        await cancelOrder({ id: row.id });
        Message.success('已取消');
        await Promise.all([loadList(), loadStats()]);
      },
    });
  };

  const handleCollectPayment = () => {
    paymentForm.value = {
      customerContractId: currentOrder.value.id,
      contractAmount: undefined,
    };
    paymentDialogVisible.value = true;
  };

  const submitPayment = async () => {
    const errors = await paymentFormRef.value?.validate();
    if (errors) return;
    submitLoading.value = true;
    try {
      await collectContractPayment(paymentForm.value);
      Message.success('收取成功');
      paymentDialogVisible.value = false;
      detailDialogVisible.value = false;
      await Promise.all([loadList(), loadStats()]);
    } finally {
      submitLoading.value = false;
    }
  };

  const handleExtension = () => {
    extensionForm.value = {
      id: currentOrder.value.id,
      customerId: currentOrder.value.customerId,
      serviceEndDate: currentOrder.value.serviceEndDate,
    };
    extensionDialogVisible.value = true;
  };

  const submitExtension = async () => {
    const errors = await extensionFormRef.value?.validate();
    if (errors) return;
    submitLoading.value = true;
    try {
      await extensionOrder(extensionForm.value);
      Message.success('延期成功');
      extensionDialogVisible.value = false;
      detailDialogVisible.value = false;
      await loadList();
    } finally {
      submitLoading.value = false;
    }
  };

  const handleExport = () => {
    Modal.confirm({
      title: '提示',
      content: '是否确认导出订单数据？',
      onOk: async () => {
        await downloadRequest({
          url: '/mp/customer_track/exportOrder',
          method: 'POST',
          data: queryParams.value,
          filename: '客资订单.xlsx',
        });
      },
    });
  };

  const init = async () => {
    await Promise.all([
      loadStats(),
      loadSalesList(),
      loadSourceList(),
      loadPackageList(),
    ]);
    await loadList();
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

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 12px;
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

    &.disabled {
      cursor: default;
      &:hover {
        transform: none;
        box-shadow: none;
      }
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

  .money {
    color: rgb(var(--warning-6));
    font-weight: 600;
  }

  .danger {
    color: rgb(var(--danger-6));
  }

  .detail-footer {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
</style>
