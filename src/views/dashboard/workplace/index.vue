<template>
  <div class="arco-dashboard">
    <!-- 头部欢迎区：纯净简洁的设计 -->
    <a-card :bordered="false" class="header-card">
      <div class="header-content">
        <div class="header-left">
          <a-avatar :size="64" class="header-avatar">
            <img v-if="userInfo?.avatar" :src="userInfo?.avatar" alt="avatar" />
            <icon-user v-else />
          </a-avatar>
          <div class="header-info">
            <h1 class="header-title">
              {{ greetingText }} {{ userInfo?.name || 'Admin' }}
            </h1>
            <p class="header-subtitle">
              <span class="store-name">{{
                clubInfo.clubName || '系统管理后台'
              }}</span>
              <a-divider direction="vertical" />
              <span>{{ currentDate }}</span>
            </p>
          </div>
        </div>
        <div class="header-right">
          <a-space size="large">
            <a-statistic
              title="今日访客"
              :value="todayVisitors"
              show-group-separator
            >
              <template #suffix>
                <icon-user class="stat-icon" />
              </template>
            </a-statistic>
            <a-statistic title="待办事项" :value="12" show-group-separator>
              <template #suffix>
                <icon-check-circle class="stat-icon warning" />
              </template>
            </a-statistic>
          </a-space>
        </div>
      </div>
    </a-card>

    <!-- 数据概览卡片：Arco 风格的微小阴影与扁平化设计 -->
    <a-row :gutter="16" class="stats-overview">
      <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <a-card :bordered="false" class="stat-card">
          <div class="stat-card-content">
            <div class="stat-info">
              <div class="stat-label">总访客数</div>
              <div class="stat-value">
                <a-statistic :value="totalVisitors" show-group-separator />
              </div>
              <div class="stat-trend up">
                <span>较昨日</span>
                <icon-arrow-rise />
                <span>12%</span>
              </div>
            </div>
            <div class="stat-icon-wrapper primary">
              <icon-eye />
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <a-card :bordered="false" class="stat-card">
          <div class="stat-card-content">
            <div class="stat-info">
              <div class="stat-label">浏览量</div>
              <div class="stat-value">
                <a-statistic :value="totalPageViews" show-group-separator />
              </div>
              <div class="stat-trend up">
                <span>较昨日</span>
                <icon-arrow-rise />
                <span>8%</span>
              </div>
            </div>
            <div class="stat-icon-wrapper success">
              <icon-bar-chart />
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <a-card :bordered="false" class="stat-card">
          <div class="stat-card-content">
            <div class="stat-info">
              <div class="stat-label">活跃用户</div>
              <div class="stat-value">
                <a-statistic :value="activeUsers" show-group-separator />
              </div>
              <div class="stat-trend up">
                <span>较昨日</span>
                <icon-arrow-rise />
                <span>5%</span>
              </div>
            </div>
            <div class="stat-icon-wrapper warning">
              <icon-user-group />
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <a-card :bordered="false" class="stat-card">
          <div class="stat-card-content">
            <div class="stat-info">
              <div class="stat-label">平均停留</div>
              <div class="stat-value">
                <span class="text-value">{{ avgDuration }}</span>
              </div>
              <div class="stat-trend down">
                <span>较昨日</span>
                <icon-arrow-fall />
                <span>2%</span>
              </div>
            </div>
            <div class="stat-icon-wrapper info">
              <icon-clock-circle />
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- 主内容区域 -->
    <a-row :gutter="16" class="main-content">
      <!-- 左侧：访客趋势图表 -->
      <a-col :xs="24" :lg="16">
        <a-card
          :bordered="false"
          class="content-card chart-card"
          title="访客趋势分析"
        >
          <template #extra>
            <a-radio-group
              v-model="chartPeriod"
              type="button"
              size="small"
              @change="onPeriodChange"
            >
              <a-radio value="day">今日</a-radio>
              <a-radio value="week">本周</a-radio>
              <a-radio value="month">本月</a-radio>
            </a-radio-group>
          </template>
          <div class="chart-wrapper">
            <Chart height="100%" width="100%" :option="chartOption" />
          </div>
        </a-card>
      </a-col>

      <!-- 右侧：快捷操作 -->
      <a-col :xs="24" :lg="8">
        <a-card
          :bordered="false"
          class="content-card quick-actions-card"
          title="快捷操作"
        >
          <template #extra>
            <a-link>管理</a-link>
          </template>
          <a-row :gutter="[16, 16]">
            <a-col v-for="(item, index) in quickActions" :key="index" :span="8">
              <div class="quick-action-item" @click="next(item.id)">
                <div class="action-icon" :class="item.colorClass">
                  <component :is="item.icon" />
                </div>
                <div class="action-name">{{ item.name }}</div>
              </div>
            </a-col>
          </a-row>
        </a-card>

        <a-card
          :bordered="false"
          class="content-card notice-card"
          title="系统公告"
          style="margin-top: 16px"
        >
          <template #extra>
            <a-link>更多</a-link>
          </template>
          <a-list :bordered="false" :split="false">
            <a-list-item v-for="(item, index) in notices" :key="index">
              <div class="notice-item">
                <a-tag :color="item.typeColor" size="small">{{
                  item.type
                }}</a-tag>
                <span class="notice-title">{{ item.title }}</span>
              </div>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { graphic } from 'echarts';
  import Chart from '@/components/chart/index.vue';
  import useChartOption from '@/hooks/chart-option';
  import { totalVisit } from '@/api/platform/index';
  import { info as queryClubInfo } from '@/api/platform/indexConfig';
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '@/store';
  import {
    IconUser,
    IconEye,
    IconBarChart,
    IconUserGroup,
    IconClockCircle,
    IconCheckCircle,
    IconArrowRise,
    IconArrowFall,
    IconApps,
    IconSettings,
    IconFile,
    IconCustomerService,
    IconHeart,
  } from '@arco-design/web-vue/es/icon';

  const router = useRouter();
  const userStore = useUserStore();

  const { userInfo } = storeToRefs(userStore);

  const clubInfo = ref<any>({});
  const chartPeriod = ref('day');

  const eventTime = ref<string[]>([]);
  const uv = ref<number[]>([]);

  const totalVisitors = ref(0);
  const totalPageViews = ref(0);
  const activeUsers = ref(0);
  const avgDuration = ref('0分钟');
  const todayVisitors = ref(0);

  const greetingText = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return '早上好，';
    if (hour < 18) return '下午好，';
    return '晚上好，';
  });

  const currentDate = computed(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return now.toLocaleDateString('zh-CN', options);
  });

  const quickActions = [
    { id: 1, name: '店铺装修', icon: IconSettings, colorClass: 'blue' },
    { id: 2, name: '签到管理', icon: IconCheckCircle, colorClass: 'green' },
    {
      id: 3,
      name: '客资中心',
      icon: IconCustomerService,
      colorClass: 'orange',
    },
    { id: 4, name: '膳食配送', icon: IconFile, colorClass: 'cyan' },
    { id: 5, name: '移动月嫂', icon: IconHeart, colorClass: 'purple' },
    { id: 6, name: '应用中心', icon: IconApps, colorClass: 'gray' },
  ];

  const notices = [
    { title: '系统即将进行版本升级更新', type: '通知', typeColor: 'blue' },
    {
      title: '关于新版本客资中心功能上线的说明',
      type: '公告',
      typeColor: 'orange',
    },
    { title: '端午节放假期间系统服务安排', type: '活动', typeColor: 'green' },
    {
      title: '安全中心提醒：请定期修改您的密码',
      type: '安全',
      typeColor: 'red',
    },
  ];

  const loadClubInfo = async () => {
    try {
      const res: any = await queryClubInfo();
      clubInfo.value = res.data || {};
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const loadVisitorData = async () => {
    try {
      const res: any = await totalVisit({ queryType: chartPeriod.value });
      if (res.code === 200 || res.code === 20000) {
        const data = res.data || {};
        totalVisitors.value = data.uv || 0;
        totalPageViews.value = data.pv || 0;
        activeUsers.value = Math.floor((data.uv || 0) * 0.6);
        avgDuration.value = data.avgDurationStr || '0分钟';
        todayVisitors.value = data.uv || 0;

        if (
          data.userAccessAnalysisStats &&
          data.userAccessAnalysisStats.length > 0
        ) {
          eventTime.value = data.userAccessAnalysisStats.map(
            (item: any) => item.eventTime
          );
          uv.value = data.userAccessAnalysisStats.map((item: any) => item.uv);
        } else {
          eventTime.value = [];
          uv.value = [];
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const loadData = async () => {
    try {
      await Promise.all([loadClubInfo(), loadVisitorData()]);
    } catch (error) {
      Message.error('数据加载失败，请刷新重试');
    }
  };

  const onPeriodChange = async (val: string | number | boolean) => {
    chartPeriod.value = val as string;
    await loadVisitorData();
  };

  const next = (index: number) => {
    const routes: Record<number, string> = {
      1: '/club/info',
      2: '/signIn/checkManagement',
      3: '/informationCenter',
      4: '/distribution/distributionService',
      5: '/distribution/mobileMatron',
    };

    if (routes[index]) {
      router.push({ path: routes[index] });
    }
  };

  onMounted(() => {
    loadData();
  });

  const { chartOption } = useChartOption((isDark) => {
    const textColor = isDark ? '#C9CDD4' : '#4E5969';
    const splitLineColor = isDark ? '#484849' : '#E5E8EF';
    const primaryColor = '#165DFF';

    return {
      grid: {
        left: '4%',
        right: '4%',
        top: '20',
        bottom: '20',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: eventTime.value,
        axisLine: {
          show: true,
          lineStyle: { color: splitLineColor },
        },
        axisLabel: {
          color: textColor,
          margin: 16,
        },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: textColor,
        },
        splitLine: {
          lineStyle: {
            color: splitLineColor,
            type: 'dashed',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        className: 'echarts-tooltip-diy',
        backgroundColor: isDark ? '#1D2129' : '#FFFFFF',
        borderColor: isDark ? '#484849' : '#F2F3F5',
        textStyle: { color: isDark ? '#F2F3F5' : '#1D2129' },
        axisPointer: {
          type: 'line',
          lineStyle: { color: primaryColor, type: 'dashed' },
        },
      },
      series: [
        {
          name: '访客数',
          data: uv.value,
          type: 'line',
          smooth: true,
          symbolSize: 0,
          showSymbol: false,
          itemStyle: { color: primaryColor },
          lineStyle: { width: 3, color: primaryColor },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(22, 93, 255, 0.2)' },
              { offset: 1, color: 'rgba(22, 93, 255, 0.01)' },
            ]),
          },
        },
      ],
    };
  });
</script>

<script lang="ts">
  export default {
    name: 'Dashboard',
  };
</script>

<style scoped lang="less">
  .arco-dashboard {
    padding: 16px 20px;
    background-color: var(--color-fill-2);
    min-height: calc(100vh - 60px);

    // 卡片通用圆角
    :deep(.arco-card) {
      border-radius: 4px;
    }

    // 头部区域
    .header-card {
      margin-bottom: 16px;

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;

          .header-avatar {
            background-color: var(--color-fill-3);
            color: var(--color-text-3);
          }

          .header-info {
            .header-title {
              margin: 0 0 8px 0;
              font-size: 20px;
              font-weight: 500;
              color: var(--color-text-1);
            }

            .header-subtitle {
              margin: 0;
              font-size: 14px;
              color: var(--color-text-3);

              .store-name {
                color: var(--color-text-2);
              }
            }
          }
        }

        .header-right {
          .stat-icon {
            font-size: 24px;
            color: rgb(var(--primary-6));

            &.warning {
              color: rgb(var(--warning-6));
            }
          }
        }
      }
    }

    // 数据概览
    .stats-overview {
      margin-bottom: 16px;

      .stat-card {
        transition: all 0.2s ease;

        &:hover {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }

        .stat-card-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;

          .stat-info {
            .stat-label {
              font-size: 14px;
              color: var(--color-text-3);
              margin-bottom: 8px;
            }

            .stat-value {
              margin-bottom: 12px;
              :deep(.arco-statistic-value) {
                font-size: 24px;
                font-weight: 600;
                color: var(--color-text-1);
              }
              .text-value {
                font-size: 24px;
                font-weight: 600;
                color: var(--color-text-1);
              }
            }

            .stat-trend {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 12px;
              color: var(--color-text-3);

              &.up {
                color: rgb(var(--success-6));
                span:first-child {
                  color: var(--color-text-3);
                }
              }

              &.down {
                color: rgb(var(--danger-6));
                span:first-child {
                  color: var(--color-text-3);
                }
              }
            }
          }

          .stat-icon-wrapper {
            width: 48px;
            height: 48px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;

            &.primary {
              background-color: rgb(var(--primary-1));
              color: rgb(var(--primary-6));
            }
            &.success {
              background-color: rgb(var(--success-1));
              color: rgb(var(--success-6));
            }
            &.warning {
              background-color: rgb(var(--warning-1));
              color: rgb(var(--warning-6));
            }
            &.info {
              background-color: rgb(var(--arcoblue-1));
              color: rgb(var(--arcoblue-6));
            }
          }
        }
      }
    }

    // 主内容区域
    .main-content {
      .content-card {
        height: 100%;

        :deep(.arco-card-header) {
          border-bottom: 1px solid var(--color-border-1);
          padding: 16px 20px;
        }

        :deep(.arco-card-body) {
          padding: 20px;
        }
      }

      .chart-card {
        .chart-wrapper {
          height: 350px;
        }
      }

      .quick-actions-card {
        .quick-action-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 12px 0;
          border-radius: 4px;
          transition: background-color 0.2s;

          &:hover {
            background-color: var(--color-fill-2);
          }

          .action-icon {
            width: 40px;
            height: 40px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;

            &.blue {
              background-color: rgb(var(--primary-1));
              color: rgb(var(--primary-6));
            }
            &.green {
              background-color: rgb(var(--success-1));
              color: rgb(var(--success-6));
            }
            &.orange {
              background-color: rgb(var(--warning-1));
              color: rgb(var(--warning-6));
            }
            &.cyan {
              background-color: rgb(var(--cyan-1));
              color: rgb(var(--cyan-6));
            }
            &.purple {
              background-color: rgb(var(--purple-1));
              color: rgb(var(--purple-6));
            }
            &.gray {
              background-color: var(--color-fill-3);
              color: var(--color-text-2);
            }
          }

          .action-name {
            font-size: 13px;
            color: var(--color-text-2);
          }
        }
      }

      .notice-card {
        .notice-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;

          .notice-title {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: var(--color-text-2);
            font-size: 14px;
            cursor: pointer;

            &:hover {
              color: rgb(var(--primary-6));
            }
          }
        }

        :deep(.arco-list-item) {
          padding: 12px 0;
        }
      }
    }
  }

  // 响应式处理
  @media screen and (max-width: 992px) {
    .arco-dashboard {
      .header-card {
        .header-content {
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }
      }

      .stats-overview {
        .arco-col {
          margin-bottom: 16px;
        }
      }
    }
  }
</style>
