<template>
  <a-modal
    v-model:visible="visibleProxy"
    :title="title"
    :width="560"
    :mask-closable="false"
    modal-class="package-modal"
    @cancel="handleCancel"
    :on-before-ok="handleBeforeOk"
  >
    <package-form ref="formRef" :form-data="formData" />
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import PackageForm from './form.vue';
  import type { NursePackage } from '@/types/maternity';

  interface Props {
    visible: boolean;
    title: string;
    formData: Partial<NursePackage>;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
    (e: 'submitted'): void;
  }>();

  const visibleProxy = computed({
    get: () => props.visible,
    set: (value: boolean) => emit('update:visible', value),
  });

  const formRef = ref();

  function handleCancel() {
    emit('update:visible', false);
  }

  async function handleBeforeOk(done: (closed: boolean) => void) {
    const valid = await formRef.value?.validate();
    if (!valid) {
      done(false);
      return;
    }
    emit('submitted');
    done(true);
  }
</script>
