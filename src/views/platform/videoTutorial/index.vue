<template>
  <div class="video-tutorial-page">
    <a-card :bordered="false" class="main-card">
      <div class="toolbar">
        <a-space wrap>
          <a-input
            v-model="queryParams.title"
            placeholder="请输入视频标题"
            allow-clear
            style="width: 240px"
            @press-enter="handleQuery"
          >
            <template #prefix>
              <icon-search />
            </template>
          </a-input>
          <a-select
            v-model="queryParams.category"
            placeholder="视频分类"
            allow-clear
            style="width: 160px"
            :options="categoryOptions"
            @change="handleQuery"
          />
          <a-select
            v-model="queryParams.status"
            placeholder="状态"
            allow-clear
            style="width: 120px"
            :options="statusOptions"
            @change="handleQuery"
          />
          <a-button type="primary" @click="handleQuery">
            <template #icon><icon-search /></template>
            搜索
          </a-button>
          <a-button @click="resetQuery">
            <template #icon><icon-refresh /></template>
            重置
          </a-button>
        </a-space>
        <a-space>
          <a-button type="primary" @click="handleAdd">
            <template #icon><icon-plus /></template>
            新增视频
          </a-button>
          <a-button status="warning" @click="handleExport">
            <template #icon><icon-download /></template>
            导出
          </a-button>
          <a-button
            type="primary"
            status="danger"
            :disabled="!selectedIds.length"
            @click="handleBatchDelete"
          >
            <template #icon><icon-delete /></template>
            批量删除
          </a-button>
        </a-space>
      </div>

      <a-table
        row-key="tutorialId"
        :loading="loading"
        :data="dataList"
        :pagination="pagination"
        :row-selection="rowSelection"
        :bordered="false"
        stripe
        @page-change="handleCurrentChange"
        @page-size-change="handleSizeChange"
      >
        <template #columns>
          <a-table-column
            title="视频标题"
            data-index="title"
            :width="200"
            ellipsis
            tooltip
          />
          <a-table-column
            title="封面图"
            data-index="coverImage"
            :width="120"
            align="center"
          >
            <template #cell="{ record }">
              <div v-if="record.coverImage" class="cover-cell">
                <a-image
                  :src="record.coverImage"
                  width="80"
                  height="50"
                  fit="cover"
                />
              </div>
              <span v-else class="text-secondary">无封面</span>
            </template>
          </a-table-column>
          <a-table-column
            title="视频分类"
            data-index="category"
            :width="120"
            align="center"
          >
            <template #cell="{ record }">
              <a-tag :color="getCategoryColor(record.category)" size="small">
                {{ getCategoryText(record.category) }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column
            title="描述"
            data-index="description"
            :width="240"
            ellipsis
            tooltip
          >
            <template #cell="{ record }">
              {{ record.description || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="排序" data-index="sort" :width="80" align="center" />
          <a-table-column title="状态" data-index="status" :width="100" align="center">
            <template #cell="{ record }">
              <a-badge :status="record.status === 1 ? 'success' : 'default'" :text="getStatusText(record.status)" />
            </template>
          </a-table-column>
          <a-table-column title="创建时间" data-index="createTime" :width="180" />
          <a-table-column title="操作" :width="200" fixed="right" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-button type="text" size="small" @click="handleView(record)">
                  <template #icon><icon-eye /></template>
                  查看
                </a-button>
                <a-button type="text" size="small" @click="handleEdit(record)">
                  <template #icon><icon-edit /></template>
                  编辑
                </a-button>
                <a-popconfirm
                  content="确认删除该视频教程吗?"
                  @ok="handleDelete(record)"
                >
                  <a-button type="text" size="small" status="danger">
                    <template #icon><icon-delete /></template>
                    删除
                  </a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <!-- 新增/编辑弹窗 -->
    <a-modal
      v-model:visible="formVisible"
      :title="formTitle"
      :width="720"
      :mask-closable="false"
      modal-class="video-modal"
      @cancel="handleCancel"
      @before-ok="handleSubmit"
    >
      <video-tutorial-form ref="formRef" :form-data="formData" :is-view="isView" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    IconSearch,
    IconRefresh,
    IconPlus,
    IconDownload,
    IconDelete,
    IconEye,
    IconEdit,
  } from '@arco-design/web-vue/es/icon';
  import {
    listVideoTutorial,
    delVideoTutorial,
    exportVideoTutorial,
  } from '@/api/platform/videoTutorial';
  import {
    VIDEO_CATEGORY_OPTIONS,
    VIDEO_STATUS_OPTIONS,
    getVideoCategoryText,
    getVideoStatusText,
    type VideoTutorial,
    type VideoTutorialQuery,
  } from '@/types/videoTutorial';
  import VideoTutorialForm from './form.vue';

  const loading = ref(false);
  const dataList = ref<VideoTutorial[]>([]);
  const selectedIds = ref<number[]>([]);

  const queryParams = reactive<VideoTutorialQuery>({
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    category: undefined,
    status: undefined,
  });

  const pagination = computed(() => ({
    current: queryParams.pageNum,
    pageSize: queryParams.pageSize,
    total: total.value,
    showTotal: true,
    showPageSize: true,
    pageSizeOptions: [10, 20, 50, 100],
  }));

  const total = ref(0);

  const categoryOptions = VIDEO_CATEGORY_OPTIONS;
  const statusOptions = VIDEO_STATUS_OPTIONS;

  const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  });

  const formVisible = ref(false);
  const formTitle = ref('');
  const formData = ref<Partial<VideoTutorial>>({});
  const formRef = ref();
  const isView = ref(false);

  // 获取列表数据
  async function getList() {
    loading.value = true;
    try {
      const res: any = await listVideoTutorial(queryParams);
      dataList.value = res.rows || [];
      total.value = res.total || 0;
    } catch (error) {
      Message.error('获取列表失败');
    } finally {
      loading.value = false;
    }
  }

  // 搜索
  function handleQuery() {
    queryParams.pageNum = 1;
    getList();
  }

  // 重置
  function resetQuery() {
    queryParams.pageNum = 1;
    queryParams.pageSize = 10;
    queryParams.title = undefined;
    queryParams.category = undefined;
    queryParams.status = undefined;
    getList();
  }

  // 分页
  function handleCurrentChange(page: number) {
    queryParams.pageNum = page;
    getList();
  }

  function handleSizeChange(size: number) {
    queryParams.pageSize = size;
    queryParams.pageNum = 1;
    getList();
  }

  // 新增
  function handleAdd() {
    formTitle.value = '新增视频教程';
    formData.value = {
      sort: 0,
      status: 1,
    };
    isView.value = false;
    formVisible.value = true;
  }

  // 查看
  function handleView(record: VideoTutorial) {
    formTitle.value = '查看视频教程';
    formData.value = { ...record };
    isView.value = true;
    formVisible.value = true;
  }

  // 编辑
  function handleEdit(record: VideoTutorial) {
    formTitle.value = '编辑视频教程';
    formData.value = { ...record };
    isView.value = false;
    formVisible.value = true;
  }

  // 删除
  async function handleDelete(record: VideoTutorial) {
    try {
      await delVideoTutorial(record.tutorialId!);
      Message.success('删除成功');
      getList();
    } catch (error) {
      Message.error('删除失败');
    }
  }

  // 批量删除
  function handleBatchDelete() {
    if (!selectedIds.value.length) {
      Message.warning('请选择要删除的数据');
      return;
    }
    Modal.confirm({
      title: '提示',
      content: `确认删除选中的 ${selectedIds.value.length} 条数据吗?`,
      onOk: async () => {
        try {
          await delVideoTutorial(selectedIds.value);
          Message.success('删除成功');
          selectedIds.value = [];
          getList();
        } catch (error) {
          Message.error('删除失败');
        }
      },
    });
  }

  // 导出
  async function handleExport() {
    try {
      Message.loading({ content: '正在导出...', duration: 0, id: 'export' });
      const blob = await exportVideoTutorial(queryParams);
      const url = window.URL.createObjectURL(blob as Blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `视频教程_${new Date().getTime()}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
      Message.success({ content: '导出成功', id: 'export' });
    } catch (error) {
      Message.error({ content: '导出失败', id: 'export' });
    }
  }

  // 提交表单
  async function handleSubmit(done: (closed: boolean) => void) {
    const valid = await formRef.value?.validate();
    if (!valid) {
      done(false);
      return;
    }
    done(true);
    getList();
  }

  // 取消
  function handleCancel() {
    formVisible.value = false;
  }

  // 获取分类文本
  function getCategoryText(category: number) {
    return getVideoCategoryText(category);
  }

  // 获取状态文本
  function getStatusText(status: number) {
    return getVideoStatusText(status);
  }

  // 获取分类颜色
  function getCategoryColor(category: number) {
    const colorMap: Record<number, string> = {
      0: 'arcoblue',
      1: 'green',
      2: 'orangered',
      3: 'purple',
    };
    return colorMap[category] || 'gray';
  }

  // 初始化
  getList();
</script>

<style lang="less" scoped>
  .video-tutorial-page {
    .main-card {
      border-radius: 12px;

      :deep(.arco-card-body) {
        padding: 20px;
      }
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 12px;
    }

    :deep(.arco-input-wrapper) {
      border-radius: 8px;
    }

    :deep(.arco-select-view-single) {
      border-radius: 8px;
    }

    :deep(.arco-btn) {
      border-radius: 8px;
    }

    :deep(.arco-table) {
      border-radius: 10px;
      overflow: hidden;
    }

    :deep(.arco-table-th) {
      background: var(--color-fill-1);
      font-weight: 500;
    }

    .cover-cell {
      :deep(.arco-image) {
        border-radius: 6px;
        overflow: hidden;
      }
    }

    .text-secondary {
      color: var(--color-text-3);
      font-size: 12px;
    }

    :deep(.arco-tag) {
      border-radius: 6px;
    }
  }
</style>

<style lang="less">
  .video-modal {
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
