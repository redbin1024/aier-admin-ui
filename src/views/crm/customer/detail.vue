<template>
  <div class="crm-page">
    <a-page-header title="客户详情" @back="goBack" />

    <a-spin :loading="loading" style="display: block">
      <a-row :gutter="16" style="margin-top: 16px">
        <a-col :xs="24" :lg="10">
          <a-card :bordered="false" class="section-card">
            <template #title>基本信息</template>
            <template #extra>
              <a-button type="text" @click="handleEdit">编辑</a-button>
            </template>

            <a-descriptions :column="1" bordered size="medium">
              <a-descriptions-item label="客户姓名">{{
                customer.name || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="联系电话">{{
                customer.tel || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="意向度">
                <a-tag
                  v-if="customer.intentLeve"
                  :color="getIntentColor(customer.intentLeve)"
                  size="small"
                >
                  {{ customer.intentLeve }}
                </a-tag>
                <span v-else>-</span>
              </a-descriptions-item>
              <a-descriptions-item label="客户来源">{{
                customer.source || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="负责人">{{
                customer.followerName || '未分配'
              }}</a-descriptions-item>
              <a-descriptions-item label="预产期">{{
                customer.dueDate || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="微信">{{
                customer.wechat || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="地址">{{
                customer.address || '-'
              }}</a-descriptions-item>
              <a-descriptions-item label="创建时间">{{
                formatDate(customer.createTime)
              }}</a-descriptions-item>
              <a-descriptions-item label="跟进状态">
                <a-tag
                  v-if="customer.leadStatus === 'FOLLOWED_UP'"
                  color="green"
                  size="small"
                  >已跟进</a-tag
                >
                <a-tag v-else color="gray" size="small">未跟进</a-tag>
              </a-descriptions-item>
              <a-descriptions-item label="到店状态">
                <a-tag v-if="customer.isToStore" color="green" size="small"
                  >已到店</a-tag
                >
                <span v-else>未到店</span>
              </a-descriptions-item>
              <a-descriptions-item label="成交状态">
                <a-tag v-if="customer.isDeal" color="orange" size="small"
                  >已成交</a-tag
                >
                <span v-else>未成交</span>
              </a-descriptions-item>
              <a-descriptions-item label="备注">{{
                customer.notes || '-'
              }}</a-descriptions-item>
            </a-descriptions>

            <div class="action-row">
              <a-space wrap>
                <a-button type="primary" @click="handleFollowUp">跟进</a-button>
                <a-button
                  v-if="!customer.isToStore"
                  type="primary"
                  status="success"
                  @click="handleConfirmArrival"
                >
                  确认到店
                </a-button>
                <a-button status="warning" @click="handleTransfer"
                  >转移</a-button
                >
                <a-button status="danger" @click="handleRefundSeas"
                  >退回公海</a-button
                >
              </a-space>
            </div>
          </a-card>
        </a-col>

        <a-col :xs="24" :lg="14">
          <a-card :bordered="false" class="section-card">
            <template #title>跟进记录</template>

            <a-empty
              v-if="!followLogs.length && !loading"
              description="暂无跟进记录"
            />
            <a-timeline v-else>
              <a-timeline-item v-for="log in followLogs" :key="log.id">
                <template #label>
                  <span class="time">{{ formatDate(log.createTime) }}</span>
                </template>
                <a-card :bordered="true" class="timeline-card">
                  <div class="log-header">
                    <span class="operator">{{
                      log.operatorName || '系统'
                    }}</span>
                    <a-tag size="small" color="gray">{{
                      log.operateType || '跟进'
                    }}</a-tag>
                  </div>
                  <div class="content">{{
                    log.content || log.remark || '-'
                  }}</div>
                  <div v-if="log.intentLeve" class="intent">
                    意向度变更为：
                    <a-tag
                      size="small"
                      :color="getIntentColor(log.intentLeve)"
                      >{{ log.intentLeve }}</a-tag
                    >
                  </div>
                </a-card>
              </a-timeline-item>
            </a-timeline>

            <div v-if="followTotal > followQuery.pageSize" class="pager">
              <a-pagination
                simple
                :total="followTotal"
                :page-size="followQuery.pageSize"
                :current="followQuery.pageNum"
                @change="handleFollowPageChange"
              />
            </div>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>

    <a-modal
      v-model:visible="editDialogVisible"
      title="编辑客户信息"
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
        <a-form-item label="客户姓名" field="name">
          <a-input v-model="editForm.name" allow-clear />
        </a-form-item>
        <a-form-item label="联系电话" field="tel">
          <a-input v-model="editForm.tel" allow-clear />
        </a-form-item>
        <a-form-item label="客户来源" field="source">
          <a-select
            v-model="editForm.source"
            :options="sourceOptions"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="意向度" field="intentLeve">
          <a-select
            v-model="editForm.intentLeve"
            :options="intentOptions"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="预产期" field="dueDate">
          <a-date-picker
            v-model="editForm.dueDate"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="微信" field="wechat">
          <a-input v-model="editForm.wechat" allow-clear />
        </a-form-item>
        <a-form-item label="地址" field="address">
          <a-input v-model="editForm.address" allow-clear />
        </a-form-item>
        <a-form-item label="备注" field="notes">
          <a-textarea
            v-model="editForm.notes"
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
      v-model:visible="transferDialogVisible"
      title="转移客户"
      :ok-loading="submitLoading"
      @ok="submitTransfer"
      @cancel="transferDialogVisible = false"
    >
      <a-form auto-label-width>
        <a-form-item label="目标人员">
          <a-select
            v-model="transferTarget"
            :options="salesOptions"
            allow-clear
            placeholder="请选择转移目标"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import { useRoute, useRouter } from 'vue-router';
  import dayjs from 'dayjs';
  import {
    confirmArrivedAtStore,
    customerOperate,
    getCustomerDetail,
    getFollowedLogs,
    getSourceList,
    getUserPage,
    refundSeas,
    transfer,
    updateDetail,
  } from '@/api/crm/customerTrack';

  const router = useRouter();
  const route = useRoute();

  const customerId = computed(
    () => (route.params.customerId || route.query.customerId) as string
  );

  const loading = ref(false);
  const submitLoading = ref(false);

  const customer = ref<Record<string, any>>({});

  const followLogs = ref<any[]>([]);
  const followTotal = ref(0);
  const followQuery = ref({ pageNum: 1, pageSize: 10 });

  const editDialogVisible = ref(false);
  const editFormRef = ref();
  const editForm = ref<Record<string, any>>({});
  const editRules = {
    name: [{ required: true, message: '请输入客户姓名' }],
    tel: [{ required: true, message: '请输入联系电话' }],
  };

  const followDialogVisible = ref(false);
  const followFormRef = ref();
  const followForm = ref<Record<string, any>>({});
  const followRules = {
    content: [{ required: true, message: '请输入跟进内容' }],
  };

  const transferDialogVisible = ref(false);
  const transferTarget = ref<number | undefined>(undefined);

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

  const goBack = () => {
    router.push({ name: 'CrmCustomer' });
  };

  const loadDetail = async () => {
    loading.value = true;
    try {
      const res: any = await getCustomerDetail({
        customerId: customerId.value,
      });
      customer.value = res.data || {};
    } finally {
      loading.value = false;
    }
  };

  const loadFollowLogs = async () => {
    const res: any = await getFollowedLogs({
      customerId: customerId.value,
      ...followQuery.value,
    });
    followLogs.value = res.rows || [];
    followTotal.value = res.total || 0;
  };

  const handleFollowPageChange = async (pageNum: number) => {
    followQuery.value.pageNum = pageNum;
    await loadFollowLogs();
  };

  const loadSalesList = async () => {
    const res: any = await getUserPage({ pageNum: 1, pageSize: 999 });
    salesList.value = res.rows || [];
  };

  const loadSourceList = async () => {
    const res: any = await getSourceList();
    sourceList.value = res.data || [];
  };

  const handleEdit = () => {
    editForm.value = { ...customer.value };
    editDialogVisible.value = true;
  };

  const submitEdit = async () => {
    const errors = await editFormRef.value?.validate();
    if (errors) return;
    submitLoading.value = true;
    try {
      await updateDetail(editForm.value);
      Message.success('修改成功');
      editDialogVisible.value = false;
      await loadDetail();
    } finally {
      submitLoading.value = false;
    }
  };

  const handleFollowUp = () => {
    followForm.value = {
      customerId: customerId.value,
      content: '',
      intentLeve: customer.value.intentLeve || undefined,
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
      await Promise.all([loadDetail(), loadFollowLogs()]);
    } finally {
      submitLoading.value = false;
    }
  };

  const handleConfirmArrival = () => {
    Modal.confirm({
      title: '提示',
      content: '确认该客户已到店？',
      onOk: async () => {
        await confirmArrivedAtStore({ customerId: customerId.value });
        Message.success('已确认到店');
        await loadDetail();
      },
    });
  };

  const handleTransfer = () => {
    transferTarget.value = undefined;
    transferDialogVisible.value = true;
  };

  const submitTransfer = async () => {
    if (!transferTarget.value) {
      Message.warning('请选择转移目标');
      return;
    }
    submitLoading.value = true;
    try {
      await transfer({
        customerId: customerId.value,
        targetUserId: transferTarget.value,
      });
      Message.success('转移成功');
      transferDialogVisible.value = false;
      await loadDetail();
    } finally {
      submitLoading.value = false;
    }
  };

  const handleRefundSeas = () => {
    Modal.confirm({
      title: '提示',
      content: '确认将该客户退回公海？',
      onOk: async () => {
        await refundSeas({ customerId: customerId.value });
        Message.success('已退回公海');
        goBack();
      },
    });
  };

  const init = async () => {
    await Promise.all([loadSalesList(), loadSourceList()]);
    await Promise.all([loadDetail(), loadFollowLogs()]);
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

  .action-row {
    margin-top: 16px;
  }

  .timeline-card {
    border-radius: 6px;
  }

  .log-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;

    .operator {
      font-weight: 600;
      color: var(--color-text-1);
    }
  }

  .content {
    color: var(--color-text-2);
    line-height: 1.6;
    word-break: break-word;
  }

  .intent {
    margin-top: 8px;
    color: var(--color-text-3);
    font-size: 12px;
  }

  .pager {
    margin-top: 12px;
    display: flex;
    justify-content: center;
  }

  .time {
    color: var(--color-text-3);
    font-size: 12px;
  }
</style>
