<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical" class="video-form">
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="视频标题" field="title">
          <a-input
            v-model="form.title"
            placeholder="请输入视频标题"
            :max-length="100"
            show-word-limit
            :disabled="isView"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="视频分类" field="category">
          <a-select
            v-model="form.category"
            placeholder="请选择视频分类"
            :options="categoryOptions"
            :disabled="isView"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item label="视频描述" field="description">
      <a-textarea
        v-model="form.description"
        placeholder="请输入视频描述（选填）"
        :max-length="500"
        show-word-limit
        :auto-size="{ minRows: 3, maxRows: 5 }"
        :disabled="isView"
      />
    </a-form-item>

    <a-form-item label="视频文件" field="videoUrl">
      <div class="upload-section">
        <div v-if="form.videoUrl" class="preview-card video-preview-card">
          <video :src="form.videoUrl" controls class="preview-video" />
          <div v-if="!isView" class="preview-overlay" @click="removeVideo">
            <icon-delete :size="20" />
            <span>移除视频</span>
          </div>
        </div>
        <a-upload
          v-if="!form.videoUrl && !isView"
          :custom-request="handleVideoUpload"
          :show-file-list="false"
          accept="video/*"
          draggable
        >
          <template #upload-button>
            <div class="upload-trigger">
              <div v-if="videoUploading" class="upload-loading">
                <a-spin :size="32" />
                <span class="upload-loading-text">视频上传中...</span>
              </div>
              <div v-else class="upload-content">
                <div class="upload-icon">
                  <icon-video-camera :size="36" />
                </div>
                <div class="upload-text">点击或拖拽上传视频</div>
                <div class="upload-hint">支持 MP4、AVI、MOV 等格式</div>
              </div>
            </div>
          </template>
        </a-upload>
        <a-input v-if="isView" v-model="form.videoUrl" disabled />
      </div>
    </a-form-item>

    <a-form-item label="封面图片" field="coverImage">
      <div class="upload-section cover-section">
        <div v-if="form.coverImage" class="preview-card cover-preview-card">
          <img :src="form.coverImage" class="preview-cover" />
          <div v-if="!isView" class="preview-overlay" @click="removeCover">
            <icon-delete :size="20" />
            <span>移除封面</span>
          </div>
        </div>
        <a-upload
          v-if="!form.coverImage && !isView"
          :custom-request="handleCoverUpload"
          :show-file-list="false"
          accept="image/*"
          draggable
        >
          <template #upload-button>
            <div class="upload-trigger upload-trigger--cover">
              <div v-if="coverUploading" class="upload-loading">
                <a-spin :size="28" />
                <span class="upload-loading-text">上传中...</span>
              </div>
              <div v-else class="upload-content">
                <div class="upload-icon">
                  <icon-image :size="32" />
                </div>
                <div class="upload-text">上传封面图片</div>
                <div class="upload-hint">建议尺寸 16:9</div>
              </div>
            </div>
          </template>
        </a-upload>
        <a-input v-if="isView" v-model="form.coverImage" disabled />
      </div>
    </a-form-item>

    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="排序" field="sort">
          <a-input-number
            v-model="form.sort"
            placeholder="请输入排序值"
            :min="0"
            :max="9999"
            style="width: 100%"
            :disabled="isView"
          />
          <div class="form-tip">数值越小越靠前</div>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="状态" field="status">
          <a-radio-group v-model="form.status" :disabled="isView" type="button">
            <a-radio :value="1">上架</a-radio>
            <a-radio :value="0">下架</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    IconDelete,
    IconVideoCamera,
    IconImage,
  } from '@arco-design/web-vue/es/icon';
  import type { FieldRule } from '@arco-design/web-vue';
  import {
    addVideoTutorial,
    updateVideoTutorial,
  } from '@/api/platform/videoTutorial';
  import {
    VIDEO_CATEGORY_OPTIONS,
    type VideoTutorialForm,
  } from '@/types/videoTutorial';
  import { getToken } from '@/utils/auth';

  interface Props {
    formData: Partial<VideoTutorialForm>;
    isView?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    isView: false,
  });

  const formRef = ref();
  const categoryOptions = VIDEO_CATEGORY_OPTIONS;
  const videoUploading = ref(false);
  const coverUploading = ref(false);

  const form = ref<VideoTutorialForm>({
    title: '',
    description: '',
    videoUrl: '',
    coverImage: '',
    category: 0,
    sort: 0,
    status: 1,
  });

  const rules: Record<string, FieldRule[]> = {
    title: [
      { required: true, message: '请输入视频标题' },
      { minLength: 2, message: '标题长度不能少于2个字符' },
      { maxLength: 100, message: '标题长度不能超过100个字符' },
    ],
    category: [{ required: true, message: '请选择视频分类' }],
    videoUrl: [{ required: true, message: '请上传视频文件' }],
    status: [{ required: true, message: '请选择状态' }],
  };

  watch(
    () => props.formData,
    (newVal) => {
      if (newVal) {
        form.value = {
          ...form.value,
          ...newVal,
        };
      }
    },
    { immediate: true, deep: true }
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

  async function handleVideoUpload(option: any) {
    const { onSuccess, onError, fileItem } = option;
    if (!fileItem.file) {
      onError('文件无效');
      return;
    }
    videoUploading.value = true;
    try {
      const url = await uploadToOSS(fileItem.file);
      form.value.videoUrl = url;
      Message.success('视频上传成功');
      onSuccess();
    } catch (error: any) {
      Message.error(error.message || '视频上传失败');
      onError(error);
    } finally {
      videoUploading.value = false;
    }
  }

  async function handleCoverUpload(option: any) {
    const { onSuccess, onError, fileItem } = option;
    if (!fileItem.file) {
      onError('文件无效');
      return;
    }
    coverUploading.value = true;
    try {
      const url = await uploadToOSS(fileItem.file);
      form.value.coverImage = url;
      Message.success('封面上传成功');
      onSuccess();
    } catch (error: any) {
      Message.error(error.message || '封面上传失败');
      onError(error);
    } finally {
      coverUploading.value = false;
    }
  }

  function removeVideo() {
    form.value.videoUrl = '';
  }

  function removeCover() {
    form.value.coverImage = '';
  }

  async function validate(): Promise<boolean> {
    if (props.isView) return true;

    try {
      const errors = await formRef.value?.validate();
      if (!errors) {
        await submitForm();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async function submitForm() {
    try {
      if (form.value.tutorialId) {
        await updateVideoTutorial(form.value);
        Message.success('修改成功');
      } else {
        await addVideoTutorial(form.value);
        Message.success('新增成功');
      }
    } catch (error) {
      throw error;
    }
  }

  function resetFields() {
    formRef.value?.resetFields();
  }

  defineExpose({
    validate,
    resetFields,
  });
</script>

<style lang="less" scoped>
  .video-form {
    :deep(.arco-form-item-label) {
      font-weight: 500;
      color: var(--color-text-1);
    }
  }

  .upload-section {
    width: 100%;
  }

  .upload-trigger {
    width: 100%;
    min-height: 180px;
    border-radius: 12px;
    border: 2px dashed var(--color-border-3);
    background: var(--color-fill-1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: rgb(var(--primary-6));
      background: var(--color-primary-light-1);
    }

    &--cover {
      min-height: 140px;
      max-width: 280px;
    }
  }

  .upload-content {
    text-align: center;
    padding: 20px;
  }

  .upload-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--color-primary-light-1);
    color: rgb(var(--primary-6));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    transition: transform 0.3s ease;

    .upload-trigger:hover & {
      transform: scale(1.1);
    }
  }

  .upload-text {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-2);
    margin-bottom: 4px;
  }

  .upload-hint {
    font-size: 12px;
    color: var(--color-text-3);
  }

  .upload-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 20px;
  }

  .upload-loading-text {
    font-size: 13px;
    color: var(--color-text-3);
  }

  .preview-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);

      .preview-overlay {
        opacity: 1;
      }
    }
  }

  .video-preview-card {
    max-width: 100%;
    background: #000;

    .preview-video {
      width: 100%;
      max-height: 280px;
      display: block;
      border-radius: 12px;
    }
  }

  .cover-preview-card {
    max-width: 280px;
    background: var(--color-fill-2);

    .preview-cover {
      width: 100%;
      height: 160px;
      object-fit: cover;
      display: block;
    }
  }

  .preview-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: #fff;
    font-size: 13px;
    opacity: 0;
    cursor: pointer;
    transition: opacity 0.25s ease;
    backdrop-filter: blur(2px);
    border-radius: 12px;
  }

  .form-tip {
    margin-top: 4px;
    font-size: 12px;
    color: var(--color-text-3);
  }
</style>
