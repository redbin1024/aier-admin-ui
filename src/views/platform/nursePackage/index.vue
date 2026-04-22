<template>
  <div class="package-page">
    <a-card :bordered="false" class="general-card" :body-style="{ padding: '24px' }">
      <div class="toolbar">
        <div class="toolbar-title">
          <icon-apps :size="20" />
          <span>套餐管理</span>
        </div>
        <a-button type="primary" @click="handleAdd">
          <template #icon><icon-plus /></template>
          新增套餐
        </a-button>
      </div>

      <a-spin :loading="loading" style="display: block">
        <a-empty
          v-if="!dataList.length && !loading"
          description="暂无套餐数据"
        />
        <a-grid :cols="3" :col-gap="16" :row-gap="16">
          <a-grid-item v-for="item in dataList" :key="item.packageId">
            <div
              class="package-card"
              :class="{ 'package-card--disabled': item.status === 'DISABLED' }"
            >
              <div class="package-header">
                <div class="package-name">{{ item.packageName }}</div>
                <a-tag
                  :color="item.status === 'ENABLED' ? 'green' : 'gray'"
                  size="small"
                >
                  {{ item.status === 'ENABLED' ? '已启用' : '已停用' }}
                </a-tag>
              </div>
              <div class="package-price">
                <span class="price-symbol">¥</span>
                <span class="price-value">{{ item.price }}</span>
              </div>
              <div class="package-info">
                <div class="info-row">
                  <icon-calendar :size="14" />
                  <span>服务天数：{{ item.serviceDays || '-' }} 天</span>
                </div>
                <div class="info-row">
                  <icon-sort :size="14" />
                  <span>排序值：{{ item.sortOrder ?? 0 }}</span>
                </div>
              </div>
              <div v-if="item.serviceContent" class="package-desc">
                {{ item.serviceContent }}
              </div>
              <div class="package-actions">
                <a-button type="text" size="small" @click="handleEdit(item)">
                  <template #icon><icon-edit /></template>
                  编辑
                </a-button>
                <a-button
                  type="text"
                  size="small"
                  :status="item.status === 'ENABLED' ? 'warning' : 'success'"
                  @click="handleToggleStatus(item)"
                >
                  <template #icon>
                    <icon-pause v-if="item.status === 'ENABLED'" />
                    <icon-play-arrow v-else />
                  </template>
                  {{ item.status === 'ENABLED' ? '停用' : '启用' }}
                </a-button>
                <a-popconfirm
                  content="确认删除该套餐吗？"
                  @ok="handleDelete(item)"
                >
                  <a-button type="text" size="small" status="danger">
                    <template #icon><icon-delete /></template>
                    删除
                  </a-button>
                </a-popconfirm>
              </div>
            </div>
          </a-grid-item>
        </a-grid>
      </a-spin>

      <div v-if="total > queryParams.pageSize!" class="pager">
        <a-pagination
          :total="total"
          :current="queryParams.pageNum"
          :page-size="queryParams.pageSize"
          show-total
          @change="handlePageChange"
        />
      </div>
    </a-card>

    <package-modal
      v-model:visible="formVisible"
      :title="formTitle"
      :form-data="formData"
      @submitted="handleSubmitted"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onActivated } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    IconPlus,
    IconEdit,
    IconDelete,
    IconApps,
    IconCalendar,
    IconSort,
    IconPause,
    IconPlayArrow,
  } from '@arco-design/web-vue/es/icon';
  import {
    listPackage,
    delPackage,
    updatePackage,
  } from '@/api/platform/nursePackage';
  import type { NursePackage, NursePackageQuery } from '@/types/maternity';
  import PackageModal from './components/PackageModal.vue';

  const loading = ref(false);
  const dataList = ref<NursePackage[]>([]);
  const total = ref(0);
  const statusLoading = ref(false);

  const queryParams = reactive<NursePackageQuery>({
    pageNum: 1,
    pageSize: 12,
  });

  const formVisible = ref(false);
  const formTitle = ref('');
  const formData = ref<Partial<NursePackage>>({});

  async function getList() {
    loading.value = true;
    try {
      const res: any = await listPackage(queryParams);
      dataList.value = res.rows || [];
      total.value = res.total || 0;
    } catch {
      Message.error('获取套餐列表失败');
    } finally {
      loading.value = false;
    }
  }

  function handlePageChange(page: number) {
    queryParams.pageNum = page;
    getList();
  }

  function handleAdd() {
    formTitle.value = '新增套餐';
    formData.value = {
      status: 'ENABLED',
      sortOrder: 0,
    };
    formVisible.value = true;
  }

  function handleEdit(record: NursePackage) {
    formTitle.value = '编辑套餐';
    formData.value = { ...record };
    formVisible.value = true;
  }

  async function handleToggleStatus(record: NursePackage) {
    if (statusLoading.value) return;
    statusLoading.value = true;
    try {
      const newStatus = record.status === 'ENABLED' ? 'DISABLED' : 'ENABLED';
      await updatePackage({
        packageId: record.packageId,
        packageName: record.packageName,
        price: record.price,
        status: newStatus,
      });
      Message.success(newStatus === 'ENABLED' ? '已启用' : '已停用');
      getList();
    } catch {
      Message.error('操作失败');
    } finally {
      statusLoading.value = false;
    }
  }

  async function handleDelete(record: NursePackage) {
    try {
      await delPackage(record.packageId!);
      Message.success('删除成功');
      getList();
    } catch {
      Message.error('删除失败');
    }
  }

  function handleSubmitted() {
    getList();
  }

  getList();

  // 从编辑/删除操作返回时自动刷新列表
  onActivated(() => {
    getList();
  });
</script>

<style lang="less" scoped>
  .package-page {
    padding: 16px 20px;

    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .toolbar-title {
      display: flex;
      gap: 8px;
      align-items: center;
      color: var(--color-text-1);
      font-weight: 600;
      font-size: 16px;
    }

    .package-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 20px;
      background: var(--color-bg-2);
      border: 1px solid var(--color-border-2);
      border-radius: 12px;
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 4px 16px rgb(0 0 0 / 8%);
        transform: translateY(-2px);
      }

      &--disabled {
        opacity: 0.65;
      }
    }

    .package-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .package-name {
      color: var(--color-text-1);
      font-weight: 600;
      font-size: 16px;
    }

    .package-price {
      margin-bottom: 16px;

      .price-symbol {
        color: rgb(var(--danger-6));
        font-weight: 500;
        font-size: 14px;
      }

      .price-value {
        color: rgb(var(--danger-6));
        font-weight: 700;
        font-size: 28px;
        letter-spacing: -1px;
      }
    }

    .package-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 12px;

      .info-row {
        display: flex;
        gap: 6px;
        align-items: center;
        color: var(--color-text-3);
        font-size: 13px;
      }
    }

    .package-desc {
      display: -webkit-box;
      flex: 1;
      margin-bottom: 16px;
      overflow: hidden;
      color: var(--color-text-2);
      font-size: 13px;
      line-height: 1.5;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .package-actions {
      display: flex;
      gap: 4px;
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid var(--color-border-1);
    }

    .pager {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    :deep(.arco-tag) {
      border-radius: 6px;
    }
  }
</style>

<style lang="less">
  .package-modal {
    .arco-modal {
      border-radius: 14px;
    }

    .arco-modal-header {
      border-radius: 14px 14px 0 0;
    }

    .arco-modal-footer {
      border-radius: 0 0 14px 14px;

      .arco-btn {
        border-radius: 8px;
      }
    }
  }
</style>
