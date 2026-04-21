<template>
  <a-form
    ref="formRef"
    :model="form"
    :rules="rules"
    layout="vertical"
    class="package-form"
  >
    <a-form-item label="套餐名称" field="packageName">
      <a-input
        v-model="form.packageName"
        placeholder="请输入套餐名称"
        :max-length="50"
        show-word-limit
      />
    </a-form-item>

    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="套餐价格" field="price">
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
      <a-col :span="12">
        <a-form-item label="服务天数" field="serviceDays">
          <a-input-number
            v-model="form.serviceDays"
            placeholder="请输入天数"
            :min="1"
            :max="365"
            style="width: 100%"
          >
            <template #suffix>天</template>
          </a-input-number>
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item label="服务内容描述" field="serviceContent">
      <a-textarea
        v-model="form.serviceContent"
        placeholder="请输入套餐服务内容描述"
        :max-length="500"
        show-word-limit
        :auto-size="{ minRows: 3, maxRows: 6 }"
      />
    </a-form-item>

    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="排序值" field="sortOrder">
          <a-input-number
            v-model="form.sortOrder"
            placeholder="排序值"
            :min="0"
            :max="9999"
            style="width: 100%"
          />
          <div class="form-tip">数值越小越靠前</div>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="状态" field="status">
          <a-switch
            v-model="statusSwitch"
            type="round"
            checked-color="rgb(var(--success-6))"
          >
            <template #checked>启用</template>
            <template #unchecked>停用</template>
          </a-switch>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import type { FieldRule } from '@arco-design/web-vue';
  import { addPackage, updatePackage } from '@/api/platform/nursePackage';
  import type { NursePackageForm } from '@/types/maternity';

  interface Props {
    formData: Partial<NursePackageForm>;
  }

  const props = defineProps<Props>();
  const formRef = ref();

  const form = ref<NursePackageForm>({
    packageName: '',
    price: 0,
    serviceDays: undefined,
    serviceContent: '',
    sortOrder: 0,
    status: 'ENABLED',
  });

  const statusSwitch = computed({
    get: () => form.value.status === 'ENABLED',
    set: (val: boolean) => {
      form.value.status = val ? 'ENABLED' : 'DISABLED';
    },
  });

  const rules: Record<string, FieldRule[]> = {
    packageName: [{ required: true, message: '请输入套餐名称' }],
    price: [{ required: true, message: '请输入套餐价格' }],
  };

  watch(
    () => props.formData,
    (newVal) => {
      if (newVal) {
        form.value = { ...form.value, ...newVal };
      }
    },
    { immediate: true, deep: true }
  );

  async function submitForm() {
    if (form.value.packageId) {
      await updatePackage(form.value);
      Message.success('修改成功');
    } else {
      await addPackage(form.value);
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
  .package-form {
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

    .form-tip {
      margin-top: 4px;
      color: var(--color-text-3);
      font-size: 12px;
    }
  }
</style>
