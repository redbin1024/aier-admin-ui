<template>
  <a-modal
    v-model:visible="visibleProxy"
    :title="title"
    :width="720"
    :mask-closable="false"
    modal-class="video-modal"
    @cancel="handleCancel"
    :on-before-ok="handleBeforeOk"
  >
    <video-tutorial-form
      ref="formRef"
      :form-data="formData"
      :is-view="isView"
    />
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import VideoTutorialForm from './form.vue';
  import type { VideoTutorial } from '@/types/videoTutorial';

  interface Props {
    visible: boolean;
    title: string;
    formData: Partial<VideoTutorial>;
    isView: boolean;
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
    if (!props.isView) {
      emit('submitted');
    }
    done(true);
  }
</script>
