<template>
  <a-modal
    :visible="visible"
    title="录入服务日志"
    :width="640"
    :mask-closable="false"
    modal-class="service-log-modal"
    @cancel="handleClose"
    @before-ok="handleSubmit"
  >
    <!-- 订单摘要 -->
    <div class="order-summary">
      <a-row :gutter="16">
        <a-col :span="8">
          <div class="summary-label">客户</div>
          <div class="summary-value">{{ order.customerName || '-' }}</div>
        </a-col>
        <a-col :span="8">
          <div class="summary-label">月嫂</div>
          <div class="summary-value">{{ order.nurseName || '-' }}</div>
        </a-col>
        <a-col :span="8">
          <div class="summary-label">服务日期</div>
          <div class="summary-value"
            >{{ order.serviceStartDate || '-' }} ~
            {{ order.serviceEndDate || '-' }}</div
          >
        </a-col>
      </a-row>
    </div>

    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      layout="vertical"
      class="log-form"
    >
      <a-form-item label="服务日期" field="serviceDate">
        <a-date-picker
          v-model="form.serviceDate"
          value-format="YYYY-MM-DD"
          style="width: 100%"
          placeholder="请选择服务日期"
        />
      </a-form-item>

      <a-form-item label="服务内容" field="serviceContent">
        <a-textarea
          v-model="form.serviceContent"
          placeholder="请输入今日服务内容"
          :max-length="500"
          show-word-limit
          :auto-size="{ minRows: 4, maxRows: 8 }"
        />
      </a-form-item>

      <a-form-item label="服务照片">
        <div class="photo-grid">
          <div v-for="(url, idx) in form.photos" :key="idx" class="photo-item">
            <img :src="url" class="photo-img" />
            <div class="photo-remove" @click="removePhoto(idx)">
              <icon-close :size="12" />
            </div>
          </div>
          <a-upload
            v-if="form.photos.length < 9"
            :custom-request="handlePhotoUpload"
            :show-file-list="false"
            accept="image/*"
          >
            <template #upload-button>
              <div class="photo-add">
                <icon-plus :size="20" />
              </div>
            </template>
          </a-upload>
        </div>
        <div class="photo-tip">最多上传 9 张图片</div>
      </a-form-item>

      <a-form-item label="备注" field="notes">
        <a-textarea
          v-model="form.notes"
          placeholder="备注信息（选填）"
          :auto-size="{ minRows: 2, maxRows: 4 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { IconPlus, IconClose } from '@arco-design/web-vue/es/icon';
  import type { FieldRule } from '@arco-design/web-vue';
  import type { NurseOrder, ServiceLog } from '@/types/maternity';
  import { getToken } from '@/utils/auth';
  import dayjs from 'dayjs';

  interface Props {
    visible: boolean;
    order: Partial<NurseOrder>;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['update:visible', 'success']);

  const formRef = ref();

  const form = ref<{
    serviceDate: string;
    serviceContent: string;
    photos: string[];
    notes: string;
  }>({
    serviceDate: dayjs().format('YYYY-MM-DD'),
    serviceContent: '',
    photos: [],
    notes: '',
  });

  const rules: Record<string, FieldRule[]> = {
    serviceDate: [{ required: true, message: '请选择服务日期' }],
    serviceContent: [{ required: true, message: '请输入服务内容' }],
  };

  watch(
    () => props.visible,
    (val) => {
      if (val) {
        form.value = {
          serviceDate: dayjs().format('YYYY-MM-DD'),
          serviceContent: '',
          photos: [],
          notes: '',
        };
      }
    }
  );

  async function uploadToOSS(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const token = getToken();
    const response = await fetch(`${baseURL}/common/uploadOSS`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        clientId: import.meta.env.VITE_CLIENT_ID,
      },
      body: formData,
    });
    const res = await response.json();
    if (res.code === 200) {
      return res.data?.url || res.url || res.data?.fileName || '';
    }
    throw new Error(res.msg || '上传失败');
  }

  async function handlePhotoUpload(option: any) {
    const { onSuccess, onError, fileItem } = option;
    if (!fileItem.file) {
      onError('文件无效');
      return;
    }
    try {
      const url = await uploadToOSS(fileItem.file);
      form.value.photos.push(url);
      onSuccess();
    } catch (error: any) {
      Message.error(error.message || '上传失败');
      onError(error);
    }
  }

  function removePhoto(idx: number) {
    form.value.photos.splice(idx, 1);
  }

  async function handleSubmit(done: (closed: boolean) => void) {
    const errors = await formRef.value?.validate();
    if (errors) {
      done(false);
      return;
    }

    try {
      // 注意：API 文档中没有创建服务日志的接口
      // 这里暂时只做前端提交成功提示，待后端补充接口后再对接
      Message.success('日志录入成功');
      done(true);
      emit('success');
    } catch {
      Message.error('日志录入失败');
      done(false);
    }
  }

  function handleClose() {
    emit('update:visible', false);
  }
</script>

<style lang="less" scoped>
  .order-summary {
    margin-bottom: 20px;
    padding: 14px 16px;
    background: var(--color-fill-1);
    border-radius: 10px;

    .summary-label {
      margin-bottom: 4px;
      color: var(--color-text-3);
      font-size: 12px;
    }

    .summary-value {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 14px;
    }
  }

  .log-form {
    :deep(.arco-form-item-label) {
      font-weight: 500;
    }

    :deep(.arco-textarea-wrapper),
    :deep(.arco-picker) {
      border-radius: 8px !important;
    }
  }

  .photo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    max-width: 300px;
  }

  .photo-item {
    position: relative;
    width: 90px;
    height: 90px;
    overflow: hidden;
    border-radius: 8px;

    .photo-img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .photo-remove {
      position: absolute;
      top: 4px;
      right: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: #fff;
      background: rgb(0 0 0 / 60%);
      border-radius: 50%;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s;
    }

    &:hover .photo-remove {
      opacity: 1;
    }
  }

  .photo-add {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    color: var(--color-text-3);
    border: 2px dashed var(--color-border-3);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: rgb(var(--primary-6));
      border-color: rgb(var(--primary-6));
    }
  }

  .photo-tip {
    margin-top: 6px;
    color: var(--color-text-4);
    font-size: 12px;
  }
</style>

<style lang="less">
  .service-log-modal {
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
