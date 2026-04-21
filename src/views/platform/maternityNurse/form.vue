<template>
  <a-form
    ref="formRef"
    :model="form"
    :rules="rules"
    layout="vertical"
    class="nurse-form"
    @before-submit="submitForm"
  >
    <a-row :gutter="20">
      <a-col :span="24">
        <a-form-item label="月嫂照片" field="nursePhotoUrl">
          <div class="photo-upload-section">
            <div
              v-for="(url, idx) in form.nursePhotoUrl"
              :key="idx"
              class="photo-preview-item"
            >
              <img :src="url" class="photo-img" />
              <div class="photo-overlay" @click="removePhoto(idx)">
                <icon-delete :size="16" />
              </div>
            </div>
            <a-upload
              v-if="form.nursePhotoUrl.length < 6"
              :custom-request="handlePhotoUpload"
              :show-file-list="false"
              accept="image/*"
            >
              <template #upload-button>
                <div class="photo-upload-trigger">
                  <icon-plus :size="24" />
                  <span>上传照片</span>
                </div>
              </template>
            </a-upload>
          </div>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="月嫂姓名" field="nurseName">
          <a-input
            v-model="form.nurseName"
            placeholder="请输入姓名"
            :max-length="20"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="联系电话" field="nurseTel">
          <a-input
            v-model="form.nurseTel"
            placeholder="请输入联系电话"
            :max-length="11"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="星级" field="level">
          <a-rate v-model="form.level" :count="5" allow-half />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="参考价格" field="price">
          <a-input-number
            v-model="form.price"
            placeholder="请输入价格"
            :min="0"
            :precision="2"
            style="width: 100%"
          >
            <template #prefix>¥</template>
          </a-input-number>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="服务区域" field="serviceArea">
          <a-input v-model="form.serviceArea" placeholder="请输入服务区域" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="分类" field="category">
          <a-select
            v-model="form.category"
            placeholder="请选择分类"
            allow-clear
            :options="categoryOptions"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="服务方式" field="serviceMode">
          <a-select
            v-model="form.serviceMode"
            placeholder="请选择服务方式"
            allow-clear
            :options="serviceModeOptions"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="关联套餐名称" field="packageName">
          <a-input v-model="form.packageName" placeholder="请输入套餐名称" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item label="月嫂简介" field="nurseProfile">
      <a-textarea
        v-model="form.nurseProfile"
        placeholder="请输入月嫂简介"
        :max-length="500"
        show-word-limit
        :auto-size="{ minRows: 3, maxRows: 6 }"
      />
    </a-form-item>

    <!-- ========== 个人亮点 ========== -->
    <a-form-item label="个人亮点" field="highlights">
      <div class="dynamic-list-section">
        <div
          v-for="(item, idx) in form.highlights"
          :key="idx"
          class="dynamic-list-item"
        >
          <a-input
            v-model="form.highlights![idx]"
            placeholder="如：8年+一线母婴护理经验，服务过60+个家庭"
            allow-clear
            style="flex: 1"
          />
          <a-button
            type="text"
            status="danger"
            size="small"
            @click="removeHighlight(idx)"
          >
            <template #icon><icon-minus-circle /></template>
          </a-button>
        </div>
        <a-button
          type="dashed"
          long
          size="small"
          class="add-btn"
          @click="addHighlight"
        >
          <template #icon><icon-plus /></template>
          添加亮点
        </a-button>
      </div>
    </a-form-item>

    <!-- ========== 工作经历 ========== -->
    <a-form-item label="工作经历" field="workExperience">
      <div class="experience-section">
        <div
          v-for="(exp, idx) in form.workExperience"
          :key="idx"
          class="experience-card"
        >
          <div class="experience-card-header">
            <span class="experience-card-title">经历 {{ idx + 1 }}</span>
            <a-button
              type="text"
              status="danger"
              size="mini"
              @click="removeExperience(idx)"
            >
              <template #icon><icon-delete /></template>
              删除
            </a-button>
          </div>
          <a-row :gutter="12">
            <a-col :span="12">
              <a-form-item
                label="公司/地区"
                :hide-label="false"
                class="nested-form-item"
              >
                <a-input v-model="exp.company" placeholder="如：XX市" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="职位"
                :hide-label="false"
                class="nested-form-item"
              >
                <a-input
                  v-model="exp.position"
                  placeholder="如：高级月嫂（住家）"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :span="12">
              <a-form-item
                label="开始时间"
                :hide-label="false"
                class="nested-form-item"
              >
                <a-input v-model="exp.startDate" placeholder="如：2018.03" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="结束时间"
                :hide-label="false"
                class="nested-form-item"
              >
                <a-input v-model="exp.endDate" placeholder="如：至今" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item
            label="工作职责/成果"
            :hide-label="false"
            class="nested-form-item"
          >
            <div class="dynamic-list-section" style="width: 100%">
              <div
                v-for="(duty, dIdx) in exp.duties"
                :key="dIdx"
                class="dynamic-list-item"
              >
                <a-input
                  v-model="exp.duties[dIdx]"
                  placeholder="输入一条工作职责或成果"
                  allow-clear
                  style="flex: 1"
                />
                <a-button
                  type="text"
                  status="danger"
                  size="small"
                  @click="exp.duties.splice(dIdx, 1)"
                >
                  <template #icon><icon-minus-circle /></template>
                </a-button>
              </div>
              <a-button
                type="dashed"
                long
                size="small"
                class="add-btn"
                @click="exp.duties.push('')"
              >
                <template #icon><icon-plus /></template>
                添加职责
              </a-button>
            </div>
          </a-form-item>
        </div>
        <a-button
          type="dashed"
          long
          size="small"
          class="add-btn"
          @click="addExperience"
        >
          <template #icon><icon-plus /></template>
          添加工作经历
        </a-button>
      </div>
    </a-form-item>

    <!-- ========== 专业技能 ========== -->
    <a-form-item label="专业技能" field="professionalSkills">
      <div class="dynamic-list-section" style="width: 100%">
        <div
          v-for="(skill, idx) in form.professionalSkills"
          :key="idx"
          class="skill-row"
        >
          <a-input
            v-model="skill.skillName"
            placeholder="技能类别，如：新生儿护理"
            style="flex-shrink: 0; width: 160px"
          />
          <a-input
            v-model="skill.skillDesc"
            placeholder="技能描述，如：黄疸观察、脐部护理、红臀预防..."
            style="flex: 1"
          />
          <a-button
            type="text"
            status="danger"
            size="small"
            @click="removeSkill(idx)"
          >
            <template #icon><icon-minus-circle /></template>
          </a-button>
        </div>
        <a-button
          type="dashed"
          long
          size="small"
          class="add-btn"
          @click="addSkill"
        >
          <template #icon><icon-plus /></template>
          添加技能
        </a-button>
      </div>
    </a-form-item>

    <a-form-item label="图文详情（图片）" field="description">
      <div class="photo-upload-section">
        <div
          v-for="(url, idx) in form.description"
          :key="idx"
          class="photo-preview-item photo-preview-item--wide"
        >
          <img :src="url" class="photo-img" />
          <div class="photo-overlay" @click="removeDescriptionImage(idx)">
            <icon-delete :size="16" />
          </div>
        </div>
        <a-upload
          v-if="form.description.length < 9"
          :custom-request="handleDescriptionUpload"
          :show-file-list="false"
          accept="image/*"
        >
          <template #upload-button>
            <div class="photo-upload-trigger photo-upload-trigger--wide">
              <icon-plus :size="24" />
              <span>上传图片</span>
            </div>
          </template>
        </a-upload>
      </div>
    </a-form-item>

    <a-form-item label="视频" field="videos">
      <div class="photo-upload-section">
        <div
          v-for="(url, idx) in form.videos || []"
          :key="idx"
          class="photo-preview-item"
        >
          <video :src="url" class="photo-img" />
          <div class="photo-overlay" @click="removeVideo(idx)">
            <icon-delete :size="16" />
          </div>
        </div>
        <a-upload
          v-if="(form.videos || []).length < 3"
          :custom-request="handleVideoUpload"
          :show-file-list="false"
          accept="video/*"
        >
          <template #upload-button>
            <div class="photo-upload-trigger">
              <icon-video-camera :size="24" />
              <span>上传视频</span>
            </div>
          </template>
        </a-upload>
      </div>
    </a-form-item>

    <!-- ========== 证书图片 ========== -->
    <a-form-item label="证书图片" field="certificateImages">
      <div class="photo-upload-section">
        <div
          v-for="(url, idx) in form.certificateImages || []"
          :key="idx"
          class="photo-preview-item photo-preview-item--wide"
        >
          <img :src="url" class="photo-img" />
          <div class="photo-overlay" @click="removeCertificateImage(idx)">
            <icon-delete :size="16" />
          </div>
        </div>
        <a-upload
          v-if="(form.certificateImages || []).length < 9"
          :custom-request="handleCertificateUpload"
          :show-file-list="false"
          accept="image/*"
        >
          <template #upload-button>
            <div class="photo-upload-trigger photo-upload-trigger--wide">
              <icon-plus :size="24" />
              <span>上传证书</span>
            </div>
          </template>
        </a-upload>
      </div>
    </a-form-item>

    <!-- ========== 健康证明图片 ========== -->
    <a-form-item label="健康证明图片" field="healthImages">
      <div class="photo-upload-section">
        <div
          v-for="(url, idx) in form.healthImages || []"
          :key="idx"
          class="photo-preview-item photo-preview-item--wide"
        >
          <img :src="url" class="photo-img" />
          <div class="photo-overlay" @click="removeHealthImage(idx)">
            <icon-delete :size="16" />
          </div>
        </div>
        <a-upload
          v-if="(form.healthImages || []).length < 9"
          :custom-request="handleHealthUpload"
          :show-file-list="false"
          accept="image/*"
        >
          <template #upload-button>
            <div class="photo-upload-trigger photo-upload-trigger--wide">
              <icon-plus :size="24" />
              <span>上传健康证明</span>
            </div>
          </template>
        </a-upload>
      </div>
    </a-form-item>

    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="使用次数" field="useCount">
          <a-input-number
            v-model="form.useCount"
            placeholder="使用次数"
            :min="0"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="状态" field="status">
          <a-radio-group v-model="form.status" type="button">
            <a-radio value="ONLINE">上线</a-radio>
            <a-radio value="OFFLINE">下线</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="签约礼品ID" field="contractGiftId">
          <a-input-number
            v-model="form.contractGiftId"
            placeholder="请输入签约礼品ID"
            :min="0"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="是否领取签约礼品" field="isExistContractGift">
          <a-switch v-model="form.isExistContractGift" />
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
    IconPlus,
    IconVideoCamera,
    IconMinusCircle,
  } from '@arco-design/web-vue/es/icon';
  import type { FieldRule } from '@arco-design/web-vue';
  import { addNurse, updateNurse } from '@/api/platform/maternityNurse';
  import type {
    MaternityNurseForm,
    WorkExperience,
    ProfessionalSkill,
  } from '@/types/maternity';
  import { getToken } from '@/utils/auth';

  interface Props {
    formData: Partial<MaternityNurseForm>;
  }

  const props = defineProps<Props>();

  const formRef = ref();

  const categoryOptions = [
    { label: '金牌月嫂', value: '金牌月嫂' },
    { label: '银牌月嫂', value: '银牌月嫂' },
    { label: '铜牌月嫂', value: '铜牌月嫂' },
    { label: '明星月嫂', value: '明星月嫂' },
    { label: '首席月嫂', value: '首席月嫂' },
  ];

  const serviceModeOptions = [
    { label: '住家', value: '住家' },
    { label: '白班', value: '白班' },
    { label: '晚班', value: '晚班' },
  ];

  const form = ref<MaternityNurseForm>({
    nurseName: '',
    nurseTel: '',
    level: 3,
    serviceArea: '',
    price: undefined,
    status: 'ONLINE',
    nursePhotoUrl: [],
    nurseProfile: '',
    packageName: '',
    description: [],
    videos: [],
    category: '',
    useCount: 0,
    serviceMode: '',
    contractGiftId: undefined,
    isExistContractGift: false,
    highlights: [],
    workExperience: [],
    professionalSkills: [],
    certificateImages: [],
    healthImages: [],
  });

  const rules: Record<string, FieldRule[]> = {
    nurseName: [{ required: true, message: '请输入月嫂姓名' }],
    nursePhotoUrl: [
      {
        required: true,
        validator: (value: any, callback: (error?: string) => void) => {
          if (!value || value.length === 0) {
            callback('请至少上传一张照片');
          } else {
            callback();
          }
        },
      },
    ],
    nurseProfile: [{ required: true, message: '请输入月嫂简介' }],
    description: [
      {
        required: true,
        validator: (value: any, callback: (error?: string) => void) => {
          if (!value || value.length === 0) {
            callback('请至少上传一张详情图片');
          } else {
            callback();
          }
        },
      },
    ],
  };

  watch(
    () => props.formData,
    (newVal) => {
      if (newVal) {
        form.value = {
          ...form.value,
          ...newVal,
          nursePhotoUrl: newVal.nursePhotoUrl || [],
          description: newVal.description || [],
          videos: newVal.videos || [],
          highlights: newVal.highlights || [],
          workExperience: newVal.workExperience
            ? newVal.workExperience.map((e) => ({
                ...e,
                duties: [...(e.duties || [])],
              }))
            : [],
          professionalSkills: newVal.professionalSkills
            ? newVal.professionalSkills.map((s) => ({ ...s }))
            : [],
          certificateImages: newVal.certificateImages || [],
          healthImages: newVal.healthImages || [],
        };
      }
    },
    { immediate: true, deep: true }
  );

  // ========== 文件上传 ==========
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
      form.value.nursePhotoUrl.push(url);
      Message.success('照片上传成功');
      onSuccess();
    } catch (error: any) {
      Message.error(error.message || '照片上传失败');
      onError(error);
    }
  }

  function removePhoto(idx: number) {
    form.value.nursePhotoUrl.splice(idx, 1);
  }

  async function handleDescriptionUpload(option: any) {
    const { onSuccess, onError, fileItem } = option;
    if (!fileItem.file) {
      onError('文件无效');
      return;
    }
    try {
      const url = await uploadToOSS(fileItem.file);
      form.value.description.push(url);
      Message.success('图片上传成功');
      onSuccess();
    } catch (error: any) {
      Message.error(error.message || '图片上传失败');
      onError(error);
    }
  }

  function removeDescriptionImage(idx: number) {
    form.value.description.splice(idx, 1);
  }

  async function handleVideoUpload(option: any) {
    const { onSuccess, onError, fileItem } = option;
    if (!fileItem.file) {
      onError('文件无效');
      return;
    }
    try {
      const url = await uploadToOSS(fileItem.file);
      if (!form.value.videos) form.value.videos = [];
      form.value.videos.push(url);
      Message.success('视频上传成功');
      onSuccess();
    } catch (error: any) {
      Message.error(error.message || '视频上传失败');
      onError(error);
    }
  }

  function removeVideo(idx: number) {
    form.value.videos?.splice(idx, 1);
  }

  // ========== 证书图片上传 ==========
  async function handleCertificateUpload(option: any) {
    const { onSuccess, onError, fileItem } = option;
    if (!fileItem.file) {
      onError('文件无效');
      return;
    }
    try {
      const url = await uploadToOSS(fileItem.file);
      if (!form.value.certificateImages) form.value.certificateImages = [];
      form.value.certificateImages.push(url);
      Message.success('证书上传成功');
      onSuccess();
    } catch (error: any) {
      Message.error(error.message || '证书上传失败');
      onError(error);
    }
  }

  function removeCertificateImage(idx: number) {
    form.value.certificateImages?.splice(idx, 1);
  }

  // ========== 健康证明图片上传 ==========
  async function handleHealthUpload(option: any) {
    const { onSuccess, onError, fileItem } = option;
    if (!fileItem.file) {
      onError('文件无效');
      return;
    }
    try {
      const url = await uploadToOSS(fileItem.file);
      if (!form.value.healthImages) form.value.healthImages = [];
      form.value.healthImages.push(url);
      Message.success('健康证明上传成功');
      onSuccess();
    } catch (error: any) {
      Message.error(error.message || '健康证明上传失败');
      onError(error);
    }
  }

  function removeHealthImage(idx: number) {
    form.value.healthImages?.splice(idx, 1);
  }

  // ========== 个人亮点 ==========
  function addHighlight() {
    if (!form.value.highlights) form.value.highlights = [];
    form.value.highlights.push('');
  }

  function removeHighlight(idx: number) {
    form.value.highlights?.splice(idx, 1);
  }

  // ========== 工作经历 ==========
  function addExperience() {
    if (!form.value.workExperience) form.value.workExperience = [];
    form.value.workExperience.push({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      duties: [''],
    });
  }

  function removeExperience(idx: number) {
    form.value.workExperience?.splice(idx, 1);
  }

  // ========== 专业技能 ==========
  function addSkill() {
    if (!form.value.professionalSkills) form.value.professionalSkills = [];
    form.value.professionalSkills.push({ skillName: '', skillDesc: '' });
  }

  function removeSkill(idx: number) {
    form.value.professionalSkills?.splice(idx, 1);
  }

  // ========== 提交 ==========
  async function submitForm() {
    if (form.value.nurseId) {
      await updateNurse(form.value);
      Message.success('修改成功');
    } else {
      await addNurse(form.value);
      Message.success('新增成功');
    }
  }

  async function validate(): Promise<boolean> {
    try {
      const errors = await formRef.value?.validate();
      if (!errors) {
        await submitForm();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  function resetFields() {
    formRef.value?.resetFields();
  }

  defineExpose({ validate, resetFields });
</script>

<style lang="less" scoped>
  .nurse-form {
    :deep(.arco-form-item-label) {
      color: var(--color-text-1);
      font-weight: 500;
    }

    :deep(.arco-input-wrapper),
    :deep(.arco-select-view-single),
    :deep(.arco-textarea-wrapper),
    :deep(.arco-input-number) {
      border-radius: 8px !important;
    }

    :deep(.arco-radio-group-type-button) {
      overflow: hidden;
      border-radius: 8px;

      .arco-radio-button {
        border-radius: 0;
      }
    }
  }

  .photo-upload-section {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .photo-preview-item {
    position: relative;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 8%);

    &--wide {
      width: 120px;
      height: 80px;
    }

    .photo-img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .photo-overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: rgb(0 0 0 / 50%);
      border-radius: 10px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &:hover .photo-overlay {
      opacity: 1;
    }
  }

  .photo-upload-trigger {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    color: var(--color-text-3);
    font-size: 12px;
    background: var(--color-fill-1);
    border: 2px dashed var(--color-border-3);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      color: rgb(var(--primary-6));
      border-color: rgb(var(--primary-6));
    }

    &--wide {
      width: 120px;
    }
  }

  /* 动态列表 */
  .dynamic-list-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .dynamic-list-item {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .add-btn {
    color: var(--color-text-3);
    border-radius: 8px !important;

    &:hover {
      color: rgb(var(--primary-6));
      border-color: rgb(var(--primary-6));
    }
  }

  /* 工作经历卡片 */
  .experience-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .experience-card {
    padding: 16px;
    background: var(--color-fill-1);
    border: 1px solid var(--color-border-2);
    border-radius: 10px;
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 2px 10px rgb(0 0 0 / 6%);
    }
  }

  .experience-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .experience-card-title {
    color: rgb(var(--primary-6));
    font-weight: 600;
    font-size: 14px;
  }

  .nested-form-item {
    margin-bottom: 8px !important;

    :deep(.arco-form-item-label) {
      color: var(--color-text-3);
      font-size: 12px;
    }
  }

  /* 技能行 */
  .skill-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }
</style>
