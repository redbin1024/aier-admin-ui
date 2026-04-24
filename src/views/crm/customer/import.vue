<template>
  <div class="crm-import-page">
    <a-card :bordered="false" class="section-card hero-card">
      <div class="hero-content">
        <div>
          <div class="hero-title">客资导入</div>
          <div class="hero-desc">
            支持批量导入 Excel 客资数据，系统会按租户编号分发写入，并自动跳过重复手机号。
          </div>
        </div>
        <a-space>
          <a-button @click="goBack">
            <template #icon><icon-left /></template>
            返回列表
          </a-button>
          <a-button type="outline" @click="downloadTemplate">
            <template #icon><icon-download /></template>
            下载模板
          </a-button>
        </a-space>
      </div>
    </a-card>

    <a-grid :cols="24" :col-gap="16" :row-gap="16">
      <a-grid-item :span="16">
        <a-card :bordered="false" class="section-card">
          <template #title>上传导入文件</template>

          <a-alert type="warning" class="tips-alert">
            <template #title>上传前请确认</template>
            <div class="alert-content">
              <div>1. 仅支持 `.xlsx` / `.xls` 文件，字段名需与模板列头一致。</div>
              <div>2. 请求字段名固定为 `avatarfile`，已由前端自动处理。</div>
              <div>3. 接口成功不代表每一行都入库，重复手机号会被服务端静默跳过。</div>
              <div>4. 任意一行校验失败将导致整批回滚，请优先下载模板填写。</div>
            </div>
          </a-alert>

          <a-upload
            :show-file-list="false"
            :custom-request="mockUpload"
            accept=".xlsx,.xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            @change="handleFileChange"
          >
            <template #upload-button>
              <div class="upload-panel">
                <icon-file class="upload-icon" />
                <div class="upload-title">点击选择 Excel 文件</div>
                <div class="upload-desc">建议文件大小不超过 5MB，导入过程可能需要 1~2 分钟</div>
                <a-button type="primary">选择文件</a-button>
              </div>
            </template>
          </a-upload>

          <div v-if="selectedFile" class="file-card">
            <div class="file-main">
              <icon-file class="file-card-icon" />
              <div class="file-meta">
                <div class="file-name">{{ selectedFile.name }}</div>
                <div class="file-size">{{ formatFileSize(selectedFile.size) }}</div>
              </div>
            </div>
            <a-space>
              <a-button size="small" @click="clearSelectedFile">移除</a-button>
              <a-button type="primary" :loading="submitting" @click="submitImport">
                开始导入
              </a-button>
            </a-space>
          </div>

          <a-alert v-if="errorMessage" type="error" class="result-alert">
            <template #title>导入失败</template>
            <div class="error-text">{{ errorMessage }}</div>
          </a-alert>

          <a-alert v-if="successMessage" type="success" class="result-alert">
            <template #title>导入成功</template>
            <div>{{ successMessage }}</div>
          </a-alert>
        </a-card>
      </a-grid-item>

      <a-grid-item :span="8">
        <a-card :bordered="false" class="section-card">
          <template #title>字段说明</template>
          <div class="guide-block">
            <div class="guide-title">必填列</div>
            <div class="guide-text">客户姓名、电话、租户编号。</div>
          </div>
          <div class="guide-block">
            <div class="guide-title">录入账号</div>
            <div class="guide-text">
              请填写员工手机号；若为空，则该客资导入后不会自动分配跟进人。
            </div>
          </div>
          <div class="guide-block">
            <div class="guide-title">去重规则</div>
            <div class="guide-text">
              系统按“租户编号 + 电话”判重，Excel 内重复或数据库已存在都会跳过。
            </div>
          </div>
          <div class="guide-block">
            <div class="guide-title">常见错误</div>
            <div class="guide-text">
              第 N 行租户编号为空、录入账号未匹配到员工、房间号不存在、表头缺失。
            </div>
          </div>
        </a-card>
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    IconDownload,
    IconFile,
    IconLeft,
  } from '@arco-design/web-vue/es/icon';
  import { useRouter } from 'vue-router';
  import { importCustomerExcel } from '@/api/crm/customerTrack';

  const router = useRouter();

  const selectedFile = ref<File | null>(null);
  const submitting = ref(false);
  const errorMessage = ref('');
  const successMessage = ref('');

  const templateHeaders = [
    '客户姓名',
    '电话',
    '线索来源',
    '预产期',
    '房间号',
    '实收类型',
    '服务开始时间',
    '服务结束时间',
    '签约时间',
    '定金/合同金',
    '签订的套餐',
    '实收金额',
    '其他金额',
    '录入时间',
    '是否到店',
    '意向度',
    '是否入住',
    '年龄',
    '生日',
    '地址',
    '备注',
    '录入账号',
    '租户编号',
  ];

  const mockUpload = (_option: any) => {
    return Promise.resolve();
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const validateFile = (file: File) => {
    const fileName = file.name.toLowerCase();
    const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
    if (!isExcel) {
      Message.error('文件格式不正确，请上传[xlsx, xls]格式');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      Message.error('文件大小不能超过5MB');
      return false;
    }
    return true;
  };

  const handleFileChange = (_: any, currentFileItem: any) => {
    const file = currentFileItem?.file as File | undefined;
    if (!file) return;
    if (!validateFile(file)) {
      return;
    }
    selectedFile.value = file;
    errorMessage.value = '';
    successMessage.value = '';
  };

  const clearSelectedFile = () => {
    selectedFile.value = null;
    errorMessage.value = '';
    successMessage.value = '';
  };

  const submitImport = async () => {
    if (!selectedFile.value) {
      Message.warning('请先选择导入文件');
      return;
    }

    const formData = new FormData();
    formData.append('avatarfile', selectedFile.value, selectedFile.value.name);

    submitting.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    const loadingId = 'customer-import-loading';
    Message.loading({
      id: loadingId,
      content: '正在导入，请耐心等待…',
      duration: 0,
    });

    try {
      await importCustomerExcel(formData);
      successMessage.value = '导入成功，重复手机号记录可能已被系统自动跳过。';
      Message.success({ id: loadingId, content: '导入成功' });
      Modal.success({
        title: '导入成功',
        content: '客资文件已提交完成，是否立即返回客资列表查看？',
        onOk: () => {
          router.push({ name: 'CrmCustomer' });
        },
      });
      selectedFile.value = null;
    } catch (error: any) {
      errorMessage.value = error?.message || '导入失败，请稍后重试';
      Message.error({ id: loadingId, content: errorMessage.value });
    } finally {
      submitting.value = false;
    }
  };

  const downloadTemplate = () => {
    const csvContent = `${templateHeaders.join(',')}\n`;
    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '客资导入模板.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    Message.success('模板下载成功');
  };

  const goBack = () => {
    router.push({ name: 'CrmCustomer' });
  };
</script>

<style scoped lang="less">
  .crm-import-page {
    padding: 16px 20px;
  }

  .section-card {
    margin-bottom: 16px;
  }

  .hero-card {
    background: linear-gradient(135deg, #f2f9ff 0%, #f7f8ff 100%);
  }

  .hero-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .hero-title {
    font-size: 24px;
    font-weight: 600;
    color: var(--color-text-1);
  }

  .hero-desc {
    margin-top: 8px;
    color: var(--color-text-2);
    line-height: 1.6;
  }

  .tips-alert,
  .result-alert {
    margin-bottom: 16px;
  }

  .alert-content {
    line-height: 1.9;
  }

  .upload-panel {
    width: 100%;
    min-height: 240px;
    border: 1px dashed rgb(var(--primary-3));
    border-radius: 12px;
    background: var(--color-fill-1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 24px;
  }

  .upload-icon {
    font-size: 40px;
    color: rgb(var(--primary-6));
  }

  .upload-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-1);
  }

  .upload-desc {
    color: var(--color-text-3);
    text-align: center;
  }

  .file-card {
    margin-top: 16px;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid var(--color-border-2);
    background: var(--color-bg-2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .file-main {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .file-card-icon {
    font-size: 28px;
    color: rgb(var(--primary-6));
  }

  .file-name {
    font-weight: 600;
    color: var(--color-text-1);
    word-break: break-all;
  }

  .file-size {
    margin-top: 4px;
    color: var(--color-text-3);
    font-size: 12px;
  }

  .guide-block + .guide-block {
    margin-top: 16px;
  }

  .guide-title {
    margin-bottom: 6px;
    font-weight: 600;
    color: var(--color-text-1);
  }

  .guide-text {
    color: var(--color-text-2);
    line-height: 1.8;
  }

  .error-text {
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.8;
  }
</style>
