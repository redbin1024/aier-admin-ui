<template>
  <div class="mp-video-tutorial">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <a-input-search
        v-model="queryParams.title"
        placeholder="搜索视频标题"
        style="max-width: 400px"
        @search="handleSearch"
      />
      <a-select
        v-model="queryParams.category"
        placeholder="全部分类"
        allow-clear
        style="width: 160px; margin-left: 12px"
        :options="categoryOptions"
        @change="handleSearch"
      />
    </div>

    <!-- 视频列表 -->
    <div class="video-list">
      <a-spin :loading="loading" style="width: 100%">
        <a-empty v-if="!loading && !dataList.length" description="暂无视频" />
        <a-row v-else :gutter="[16, 16]">
          <a-col
            v-for="item in dataList"
            :key="item.tutorialId"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
          >
            <div class="video-card" @click="handleView(item)">
              <div class="video-cover">
                <img
                  v-if="item.coverImage"
                  :src="item.coverImage"
                  :alt="item.title"
                />
                <div v-else class="no-cover">
                  <icon-play-circle :size="48" />
                </div>
                <div class="video-category">
                  {{ getCategoryText(item.category) }}
                </div>
              </div>
              <div class="video-info">
                <div class="video-title" :title="item.title">
                  {{ item.title }}
                </div>
                <div v-if="item.description" class="video-desc" :title="item.description">
                  {{ item.description }}
                </div>
                <div class="video-time">
                  <icon-clock-circle />
                  {{ formatTime(item.createTime) }}
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-spin>
    </div>

    <!-- 分页 -->
    <div v-if="total > 0" class="pagination">
      <a-pagination
        v-model:current="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :total="total"
        show-total
        show-page-size
        @change="handlePageChange"
        @page-size-change="handleSizeChange"
      />
    </div>

    <!-- 视频详情弹窗 -->
    <a-modal
      v-model:visible="detailVisible"
      :title="currentVideo?.title"
      :width="900"
      :footer="false"
      unmount-on-close
    >
      <div v-if="currentVideo" class="video-detail">
        <div class="video-player">
          <video
            :src="currentVideo.videoUrl"
            controls
            controlslist="nodownload"
            style="width: 100%"
          />
        </div>
        <div class="detail-info">
          <a-descriptions :column="2" bordered>
            <a-descriptions-item label="视频分类">
              <a-tag :color="getCategoryColor(currentVideo.category)">
                {{ getCategoryText(currentVideo.category) }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="发布时间">
              {{ currentVideo.createTime }}
            </a-descriptions-item>
            <a-descriptions-item v-if="currentVideo.description" label="视频描述" :span="2">
              {{ currentVideo.description }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { IconPlayCircle, IconClockCircle } from '@arco-design/web-vue/es/icon';
  import { mpListVideoTutorial, mpGetVideoTutorial } from '@/api/platform/videoTutorial';
  import {
    VIDEO_CATEGORY_OPTIONS,
    getVideoCategoryText,
    type VideoTutorial,
  } from '@/types/videoTutorial';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import 'dayjs/locale/zh-cn';

  dayjs.extend(relativeTime);
  dayjs.locale('zh-cn');

  const loading = ref(false);
  const dataList = ref<VideoTutorial[]>([]);
  const total = ref(0);
  const detailVisible = ref(false);
  const currentVideo = ref<VideoTutorial | null>(null);

  const categoryOptions = [
    { label: '全部分类', value: undefined },
    ...VIDEO_CATEGORY_OPTIONS,
  ];

  const queryParams = reactive({
    pageNum: 1,
    pageSize: 12,
    title: '',
    category: undefined as number | undefined,
  });

  // 获取列表数据
  async function getList() {
    loading.value = true;
    try {
      const res: any = await mpListVideoTutorial(queryParams);
      dataList.value = res.rows || [];
      total.value = res.total || 0;
    } catch (error) {
      Message.error('获取视频列表失败');
    } finally {
      loading.value = false;
    }
  }

  // 搜索
  function handleSearch() {
    queryParams.pageNum = 1;
    getList();
  }

  // 分页
  function handlePageChange(page: number) {
    queryParams.pageNum = page;
    getList();
  }

  function handleSizeChange(size: number) {
    queryParams.pageSize = size;
    queryParams.pageNum = 1;
    getList();
  }

  // 查看详情
  async function handleView(item: VideoTutorial) {
    try {
      const res: any = await mpGetVideoTutorial(item.tutorialId!);
      currentVideo.value = res.data;
      detailVisible.value = true;
    } catch (error) {
      Message.error('获取视频详情失败');
    }
  }

  // 获取分类文本
  function getCategoryText(category: number) {
    return getVideoCategoryText(category);
  }

  // 获取分类颜色
  function getCategoryColor(category: number) {
    const colorMap: Record<number, string> = {
      0: 'blue',
      1: 'green',
      2: 'orange',
      3: 'purple',
    };
    return colorMap[category] || 'gray';
  }

  // 格式化时间
  function formatTime(time: string | undefined) {
    if (!time) return '';
    return dayjs(time).fromNow();
  }

  // 初始化
  getList();
</script>

<style lang="less" scoped>
  .mp-video-tutorial {
    padding: 16px;
    min-height: 100vh;
    background: var(--color-bg-2);

    .search-bar {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding: 16px;
      background: var(--color-bg-1);
      border-radius: 8px;
    }

    .video-list {
      min-height: 400px;
    }

    .video-card {
      background: var(--color-bg-1);
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s;
      height: 100%;
      display: flex;
      flex-direction: column;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      .video-cover {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%; // 16:9 比例
        background: var(--color-fill-2);
        overflow: hidden;

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .no-cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-4);
        }

        .video-category {
          position: absolute;
          top: 8px;
          right: 8px;
          padding: 4px 12px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          font-size: 12px;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }
      }

      .video-info {
        padding: 12px;
        flex: 1;
        display: flex;
        flex-direction: column;

        .video-title {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 1.5;
        }

        .video-desc {
          font-size: 13px;
          color: var(--color-text-3);
          margin-bottom: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 1.4;
          flex: 1;
        }

        .video-time {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--color-text-4);
          margin-top: auto;
        }
      }
    }

    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 24px;
      padding: 16px;
      background: var(--color-bg-1);
      border-radius: 8px;
    }
  }

  .video-detail {
    .video-player {
      margin-bottom: 16px;
      border-radius: 8px;
      overflow: hidden;
      background: #000;
    }

    .detail-info {
      margin-top: 16px;
    }
  }
</style>
