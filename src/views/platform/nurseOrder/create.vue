<template>
  <div class="order-create-page">
    <a-page-header title="新建订单" @back="goBack" />

    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      layout="vertical"
      class="create-form"
    >
      <!-- 客户信息 -->
      <a-card :bordered="false" class="section-card">
        <template #title>
          <div class="section-title">
            <icon-user :size="18" />
            <span>客户信息</span>
          </div>
        </template>
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item label="客户姓名" field="customerName">
              <a-input
                v-model="form.customerName"
                placeholder="请输入客户姓名"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="联系电话" field="customerTel">
              <a-input
                v-model="form.customerTel"
                placeholder="请输入联系电话"
                :max-length="11"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="来源" field="source">
              <a-select
                v-model="form.source"
                placeholder="请选择来源"
                allow-clear
                :options="sourceOptions"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="服务地址" field="serviceAddress">
          <a-input
            v-model="form.serviceAddress"
            placeholder="请输入上门服务地址"
          />
        </a-form-item>
      </a-card>

      <!-- 服务信息 -->
      <a-card :bordered="false" class="section-card">
        <template #title>
          <div class="section-title">
            <icon-star :size="18" />
            <span>服务信息</span>
          </div>
        </template>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item label="选择月嫂" field="nurseId">
              <div class="picker-trigger" @click="nurseModalVisible = true">
                <div v-if="selectedNurse" class="picker-selected">
                  <a-avatar
                    v-if="selectedNurse.nursePhotoUrl?.length"
                    :size="36"
                  >
                    <img :src="selectedNurse.nursePhotoUrl[0]" />
                  </a-avatar>
                  <a-avatar v-else :size="36"><icon-user /></a-avatar>
                  <div class="picker-info">
                    <div class="picker-name">{{ selectedNurse.nurseName }}</div>
                    <div class="picker-sub">
                      <a-rate
                        :model-value="selectedNurse.level || 0"
                        readonly
                        :count="5"
                        size="small"
                      />
                    </div>
                  </div>
                  <a-button type="text" size="mini" @click.stop="clearNurse"
                    >更换</a-button
                  >
                </div>
                <div v-else class="picker-empty">
                  <icon-plus />
                  <span>点击选择月嫂</span>
                </div>
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="选择套餐" field="packageId">
              <div class="picker-trigger" @click="packageModalVisible = true">
                <div v-if="selectedPackage" class="picker-selected">
                  <div class="picker-info">
                    <div class="picker-name">{{
                      selectedPackage.packageName
                    }}</div>
                    <div class="picker-sub picker-sub--price"
                      >¥{{ selectedPackage.price }} ·
                      {{ selectedPackage.serviceDays }}天</div
                    >
                  </div>
                  <a-button type="text" size="mini" @click.stop="clearPackage"
                    >更换</a-button
                  >
                </div>
                <div v-else class="picker-empty">
                  <icon-plus />
                  <span>点击选择套餐</span>
                </div>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item label="服务开始日期" field="serviceStartDate">
              <a-date-picker
                v-model="form.serviceStartDate"
                value-format="YYYY-MM-DD"
                style="width: 100%"
                placeholder="请选择开始日期"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="服务结束日期" field="serviceEndDate">
              <a-date-picker
                v-model="form.serviceEndDate"
                value-format="YYYY-MM-DD"
                style="width: 100%"
                placeholder="请选择结束日期"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <!-- 费用信息 -->
      <a-card :bordered="false" class="section-card">
        <template #title>
          <div class="section-title">
            <icon-alipay-circle :size="18" />
            <span>费用信息</span>
          </div>
        </template>
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item label="订单金额" field="totalAmount">
              <a-input-number
                v-model="form.totalAmount"
                placeholder="请输入金额"
                :min="0"
                :precision="2"
                style="width: 100%"
              >
                <template #prefix>¥</template>
              </a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="签约礼品ID" field="contractGiftId">
              <a-input-number
                v-model="form.contractGiftId"
                placeholder="请输入礼品ID"
                :min="0"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="备注" field="notes">
          <a-textarea
            v-model="form.notes"
            placeholder="请输入备注"
            :auto-size="{ minRows: 2, maxRows: 5 }"
          />
        </a-form-item>
      </a-card>

      <div class="form-footer">
        <a-space>
          <a-button @click="goBack">取消</a-button>
          <a-button
            type="primary"
            :loading="submitLoading"
            @click="handleSubmit"
          >
            提交订单
          </a-button>
        </a-space>
      </div>
    </a-form>

    <!-- 月嫂选择弹窗 -->
    <a-modal
      v-model:visible="nurseModalVisible"
      title="选择月嫂"
      :width="720"
      :footer="false"
      modal-class="select-modal"
    >
      <a-input
        v-model="nurseSearch"
        placeholder="搜索月嫂姓名"
        allow-clear
        style="margin-bottom: 16px"
        @press-enter="searchNurses"
      >
        <template #prefix><icon-search /></template>
      </a-input>
      <a-spin :loading="nurseLoading" style="display: block; min-height: 200px">
        <a-empty v-if="!nurseList.length && !nurseLoading" />
        <div class="select-list">
          <div
            v-for="nurse in nurseList"
            :key="nurse.nurseId"
            class="select-item"
            @click="selectNurse(nurse)"
          >
            <a-avatar v-if="nurse.nursePhotoUrl?.length" :size="48">
              <img :src="nurse.nursePhotoUrl[0]" />
            </a-avatar>
            <a-avatar v-else :size="48"><icon-user /></a-avatar>
            <div class="select-item-info">
              <div class="select-item-name">{{ nurse.nurseName }}</div>
              <a-rate
                :model-value="nurse.level || 0"
                readonly
                :count="5"
                size="small"
              />
              <div class="select-item-sub">
                {{ nurse.category || '' }} · ¥{{ nurse.price ?? '-' }}
              </div>
            </div>
            <a-tag
              :color="nurse.status === 'ONLINE' ? 'green' : 'gray'"
              size="small"
            >
              {{ nurse.status === 'ONLINE' ? '上线' : '下线' }}
            </a-tag>
          </div>
        </div>
      </a-spin>
    </a-modal>

    <!-- 套餐选择弹窗 -->
    <a-modal
      v-model:visible="packageModalVisible"
      title="选择套餐"
      :width="600"
      :footer="false"
      modal-class="select-modal"
    >
      <a-spin
        :loading="packageLoading"
        style="display: block; min-height: 200px"
      >
        <a-empty v-if="!packageList.length && !packageLoading" />
        <div class="select-list">
          <div
            v-for="pkg in packageList"
            :key="pkg.packageId"
            class="select-item"
            @click="selectPackage(pkg)"
          >
            <div class="select-item-info" style="flex: 1">
              <div class="select-item-name">{{ pkg.packageName }}</div>
              <div class="select-item-sub">
                {{ pkg.serviceDays || '-' }}天 · {{ pkg.serviceContent || '' }}
              </div>
            </div>
            <div class="select-item-price">¥{{ pkg.price }}</div>
          </div>
        </div>
      </a-spin>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import {
    IconUser,
    IconStar,
    IconAlipayCircle,
    IconPlus,
    IconSearch,
  } from '@arco-design/web-vue/es/icon';
  import type { FieldRule } from '@arco-design/web-vue';
  import { createOrder } from '@/api/platform/nurseOrder';
  import { listNurse } from '@/api/platform/maternityNurse';
  import { listPackage } from '@/api/platform/nursePackage';
  import type {
    NurseOrderForm,
    MaternityNurse,
    NursePackage,
  } from '@/types/maternity';
  import dayjs from 'dayjs';

  const router = useRouter();
  const formRef = ref();
  const submitLoading = ref(false);

  const sourceOptions = [
    { label: '后台录入', value: '后台录入' },
    { label: '电话咨询', value: '电话咨询' },
    { label: '线上预约', value: '线上预约' },
    { label: '朋友推荐', value: '朋友推荐' },
    { label: '其他', value: '其他' },
  ];

  const form = ref<NurseOrderForm>({
    customerName: '',
    customerTel: '',
    serviceAddress: '',
    nurseId: undefined,
    packageId: undefined,
    serviceStartDate: undefined,
    serviceEndDate: undefined,
    totalAmount: undefined,
    contractGiftId: undefined,
    source: undefined,
    notes: '',
  });

  const rules: Record<string, FieldRule[]> = {
    customerName: [{ required: true, message: '请输入客户姓名' }],
    customerTel: [{ required: true, message: '请输入联系电话' }],
    serviceAddress: [{ required: true, message: '请输入服务地址' }],
  };

  // 月嫂选择
  const nurseModalVisible = ref(false);
  const nurseLoading = ref(false);
  const nurseList = ref<MaternityNurse[]>([]);
  const nurseSearch = ref('');
  const selectedNurse = ref<MaternityNurse | null>(null);

  async function searchNurses() {
    nurseLoading.value = true;
    try {
      const res: any = await listNurse({
        pageNum: 1,
        pageSize: 50,
        nurseName: nurseSearch.value || undefined,
      });
      nurseList.value = res.rows || [];
    } catch {
      // silent
    } finally {
      nurseLoading.value = false;
    }
  }

  function selectNurse(nurse: MaternityNurse) {
    selectedNurse.value = nurse;
    form.value.nurseId = nurse.nurseId;
    nurseModalVisible.value = false;
  }

  function clearNurse() {
    selectedNurse.value = null;
    form.value.nurseId = undefined;
  }

  watch(nurseModalVisible, (val) => {
    if (val && !nurseList.value.length) searchNurses();
  });

  // 套餐选择
  const packageModalVisible = ref(false);
  const packageLoading = ref(false);
  const packageList = ref<NursePackage[]>([]);
  const selectedPackage = ref<NursePackage | null>(null);

  async function loadPackages() {
    packageLoading.value = true;
    try {
      const res: any = await listPackage({ pageNum: 1, pageSize: 50 });
      packageList.value = (res.rows || []).filter(
        (p: NursePackage) => p.status === 'ENABLED'
      );
    } catch {
      // silent
    } finally {
      packageLoading.value = false;
    }
  }

  function selectPackage(pkg: NursePackage) {
    selectedPackage.value = pkg;
    form.value.packageId = pkg.packageId;
    form.value.totalAmount = pkg.price;
    // 自动计算结束日期
    if (form.value.serviceStartDate && pkg.serviceDays) {
      form.value.serviceEndDate = dayjs(form.value.serviceStartDate)
        .add(pkg.serviceDays - 1, 'day')
        .format('YYYY-MM-DD');
    }
    packageModalVisible.value = false;
  }

  function clearPackage() {
    selectedPackage.value = null;
    form.value.packageId = undefined;
  }

  watch(packageModalVisible, (val) => {
    if (val && !packageList.value.length) loadPackages();
  });

  // 自动计算结束日期
  watch(
    () => form.value.serviceStartDate,
    (val) => {
      if (val && selectedPackage.value?.serviceDays) {
        form.value.serviceEndDate = dayjs(val)
          .add(selectedPackage.value.serviceDays - 1, 'day')
          .format('YYYY-MM-DD');
      }
    }
  );

  async function handleSubmit() {
    const errors = await formRef.value?.validate();
    if (errors) return;
    submitLoading.value = true;
    try {
      await createOrder(form.value);
      Message.success('订单创建成功');
      router.push({ name: 'NurseOrder' });
    } catch {
      Message.error('创建失败');
    } finally {
      submitLoading.value = false;
    }
  }

  function goBack() {
    router.push({ name: 'NurseOrder' });
  }
</script>

<style lang="less" scoped>
  .order-create-page {
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

  .picker-trigger {
    width: 100%;
    min-height: 60px;
    padding: 12px;
    border: 1px dashed var(--color-border-3);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background: var(--color-primary-light-1);
      border-color: rgb(var(--primary-6));
    }
  }

  .picker-selected {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .picker-info {
    flex: 1;

    .picker-name {
      color: var(--color-text-1);
      font-weight: 600;
      font-size: 14px;
    }

    .picker-sub {
      margin-top: 2px;
      color: var(--color-text-3);
      font-size: 12px;

      &--price {
        color: rgb(var(--danger-6));
        font-weight: 500;
      }
    }
  }

  .picker-empty {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    padding: 8px;
    color: var(--color-text-3);
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
    padding: 16px 0;

    :deep(.arco-btn) {
      min-width: 100px;
      border-radius: 8px;
    }
  }

  // 选择弹窗
  .select-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 400px;
    overflow-y: auto;
  }

  .select-item {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px;
    border: 1px solid var(--color-border-2);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--color-primary-light-1);
      border-color: rgb(var(--primary-6));
    }
  }

  .select-item-info {
    flex: 1;
    min-width: 0;

    .select-item-name {
      margin-bottom: 2px;
      color: var(--color-text-1);
      font-weight: 600;
      font-size: 14px;
    }

    .select-item-sub {
      margin-top: 2px;
      overflow: hidden;
      color: var(--color-text-3);
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .select-item-price {
    color: rgb(var(--danger-6));
    font-weight: 700;
    font-size: 16px;
    white-space: nowrap;
  }
</style>

<style lang="less">
  .select-modal {
    .arco-modal {
      border-radius: 14px;
    }

    .arco-modal-header {
      border-radius: 14px 14px 0 0;
    }
  }
</style>
