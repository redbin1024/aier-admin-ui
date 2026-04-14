<template>
  <div class="placeholder-container">
    <a-result status="info" :title="title" :subtitle="subtitle">
      <template #icon>
        <icon-apps
          style="font-size: 64px; color: var(--color-primary-light-2)"
        />
      </template>
      <template #extra>
        <a-button type="primary" @click="goBack">
          <template #icon><icon-arrow-left /></template>
          返回上一页
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();

  const title = computed(() => {
    const menuTitle = route.meta?.locale || route.meta?.title || '当前页面';
    return `${menuTitle} - 开发中`;
  });

  const subtitle = computed(() => {
    return `该功能模块正在开发中，敬请期待（${route.path}）`;
  });

  const goBack = () => {
    router.back();
  };
</script>

<style scoped>
  .placeholder-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    padding: 40px 20px;
  }
</style>
