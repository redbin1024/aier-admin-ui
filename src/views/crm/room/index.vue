<template>
  <div class="crm-page room-status-page">
    <a-card :bordered="false" class="section-card">
      <a-grid :cols="4" :col-gap="16" :row-gap="16">
        <a-grid-item>
          <div
            class="stat-tile"
            :style="{ borderLeftColor: 'rgb(var(--primary-6))' }"
          >
            <div
              class="stat-value"
              :style="{ color: 'rgb(var(--primary-6))' }"
              >{{ roomStats.totalNum || 0 }}</div
            >
            <div class="stat-label">总房间</div>
          </div>
        </a-grid-item>
        <a-grid-item>
          <div
            class="stat-tile"
            :style="{ borderLeftColor: 'rgb(var(--success-6))' }"
          >
            <div class="stat-value" :style="{ color: 'rgb(var(--success-6))' }">
              {{ roomStats.notCheckedInNum || 0 }}
            </div>
            <div class="stat-label">空房</div>
          </div>
        </a-grid-item>
        <a-grid-item>
          <div
            class="stat-tile"
            :style="{ borderLeftColor: 'rgb(var(--warning-6))' }"
          >
            <div class="stat-value" :style="{ color: 'rgb(var(--warning-6))' }">
              {{ roomStats.tobeCheckedInNum || 0 }}
            </div>
            <div class="stat-label">待入住</div>
          </div>
        </a-grid-item>
        <a-grid-item>
          <div
            class="stat-tile"
            :style="{ borderLeftColor: 'rgb(var(--danger-6))' }"
          >
            <div class="stat-value" :style="{ color: 'rgb(var(--danger-6))' }">
              {{ roomStats.checkedInNum || 0 }}
            </div>
            <div class="stat-label">已入住</div>
          </div>
        </a-grid-item>
      </a-grid>
    </a-card>

    <a-card :bordered="false" class="section-card">
      <a-tabs v-model:active-key="activeView" @change="handleViewChange">
        <a-tab-pane key="grid" title="入住查询" />
        <a-tab-pane key="gantt" title="房态管理" />
      </a-tabs>

      <div class="filter-toolbar">
        <template v-if="activeView === 'grid'">
          <a-date-picker
            v-model="gridMonth"
            type="month"
            value-format="YYYY-MM"
            style="width: 180px"
            @change="loadGridData"
          />
          <a-select
            v-model="gridSuiteId"
            placeholder="选择房型"
            allow-clear
            style="width: 200px; margin-left: 12px"
            :options="suiteOptions"
            @change="loadGridData"
          />
        </template>
        <template v-else>
          <a-range-picker
            v-model="ganttRange"
            mode="month"
            value-format="YYYY-MM"
            style="width: 320px"
            @change="loadGanttData"
          />
          <a-select
            v-model="ganttSuiteId"
            placeholder="选择房型"
            allow-clear
            style="width: 200px; margin-left: 12px"
            :options="suiteOptions"
            @change="loadGanttData"
          />
        </template>

        <div class="legend">
          <span class="legend-item">
            <span class="legend-dot empty"></span>
            空房
          </span>
          <span class="legend-item">
            <span class="legend-dot hold"></span>
            保留
          </span>
          <span class="legend-item">
            <span class="legend-dot reserved"></span>
            待入住
          </span>
          <span class="legend-item">
            <span class="legend-dot checkin"></span>
            入住
          </span>
        </div>
      </div>

      <a-spin :loading="loading" style="display: block">
        <div v-if="activeView === 'grid'" class="grid-view">
          <div class="room-grid">
            <div
              v-for="room in gridRooms"
              :key="room.roomId"
              class="room-card"
              :class="getRoomCardClass(room)"
              role="button"
              tabindex="0"
              @click="handleRoomClick(room)"
              @keydown.enter="handleRoomClick(room)"
            >
              <div class="room-number">{{ room.roomNumber }}</div>
              <div v-if="room.customerName" class="room-name">{{
                room.customerName
              }}</div>
              <div v-else class="room-name">{{
                getStatusText(room.status)
              }}</div>
              <div
                v-if="room.checkInDate || room.reservationStart"
                class="room-date"
              >
                {{ room.checkInDate || room.reservationStart }}~{{
                  room.checkOutDate || room.reservationEnd
                }}
              </div>
            </div>
          </div>
          <a-empty
            v-if="!loading && gridRooms.length === 0"
            description="暂无房间数据"
          />
        </div>

        <div v-else class="gantt-view">
          <div class="gantt-container">
            <div class="gantt-header">
              <div class="gantt-room-label header-label">房型</div>
              <div ref="timelineHeaderRef" class="gantt-timeline-header">
                <template v-for="month in ganttMonths" :key="month.key">
                  <div
                    class="gantt-month-group"
                    :style="{ width: `${month.days * dayWidth}px` }"
                  >
                    <div class="gantt-month-label"
                      >{{ month.label }} ({{ month.days }}天)</div
                    >
                    <div class="gantt-days">
                      <div
                        v-for="d in month.days"
                        :key="d"
                        class="gantt-day"
                        :style="{ width: `${dayWidth}px` }"
                      >
                        {{ d }}
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div class="gantt-body" @scroll="handleGanttScroll">
              <div class="gantt-rows">
                <div
                  v-for="room in ganttRooms"
                  :key="room.roomId"
                  class="gantt-row"
                >
                  <div class="gantt-room-label">
                    <div class="room-num">{{ room.roomNumber }}</div>
                    <div class="room-type">{{ room.roomName || '' }}</div>
                  </div>
                  <div
                    class="gantt-timeline"
                    :style="{ width: `${totalDays * dayWidth}px` }"
                  >
                    <div
                      v-for="(occ, idx) in room.occupations || []"
                      :key="idx"
                      class="gantt-bar"
                      :class="getGanttBarClass(occ)"
                      :style="getGanttBarStyle(occ)"
                      :title="`${
                        occ.customerName || getStatusText(occ.status)
                      } (${occ.startTime}~${occ.endTime})`"
                    >
                      <span class="bar-name">{{ occ.customerName || '' }}</span>
                      <span class="bar-date">{{
                        formatBarDate(occ.startTime)
                      }}</span>
                      <span class="bar-end-date">{{
                        formatBarDate(occ.endTime)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a-empty
            v-if="!loading && ganttRooms.length === 0"
            description="暂无排房数据"
          />
        </div>
      </a-spin>

      <div v-if="suiteStats.length > 0" class="suite-stats">
        <span v-for="s in suiteStats" :key="s.suiteId" class="suite-stat-item">
          <span
            class="suite-dot"
            :style="{ background: getSuiteColor(s) }"
          ></span>
          {{ s.roomName }} ({{ s.occupiedTotal }}/{{ s.sumTotal }})
        </span>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    getRoomOccupationRange,
    getRoomStatus,
    getRoomStatusStats,
    getSuiteStatus,
  } from '@/api/crm/roomStatus';

  const router = useRouter();

  const now = new Date();
  const curMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}`;
  const endM = new Date(now.getFullYear(), now.getMonth() + 6, 1);
  const sixMonth = `${endM.getFullYear()}-${String(
    endM.getMonth() + 1
  ).padStart(2, '0')}`;

  const activeView = ref<'grid' | 'gantt'>('grid');
  const loading = ref(false);

  const roomStats = ref<Record<string, any>>({});
  const suiteStats = ref<any[]>([]);

  const gridMonth = ref(curMonth);
  const gridSuiteId = ref<number | undefined>(undefined);
  const gridRooms = ref<any[]>([]);

  const ganttRange = ref<string[]>([curMonth, sixMonth]);
  const ganttSuiteId = ref<number | undefined>(undefined);
  const ganttRooms = ref<any[]>([]);

  const dayWidth = 32;
  const timelineHeaderRef = ref<HTMLElement | null>(null);

  const suiteOptions = computed(() =>
    suiteStats.value.map((s) => ({ label: s.roomName, value: s.suiteId }))
  );

  const ganttMonths = computed(() => {
    if (!ganttRange.value || ganttRange.value.length < 2) return [];
    const months: any[] = [];
    const [startStr, endStr] = ganttRange.value;
    let cur = new Date(`${startStr}-01`);
    const end = new Date(`${endStr}-01`);
    while (cur <= end) {
      const y = cur.getFullYear();
      const m = cur.getMonth();
      const days = new Date(y, m + 1, 0).getDate();
      months.push({
        key: `${y}-${String(m + 1).padStart(2, '0')}`,
        label: `${m + 1}月`,
        year: y,
        month: m,
        days,
      });
      cur = new Date(y, m + 1, 1);
    }
    return months;
  });

  const totalDays = computed(() =>
    ganttMonths.value.reduce((sum: number, m: any) => sum + (m.days || 0), 0)
  );

  const ganttStartDate = computed(() => {
    if (!ganttRange.value || ganttRange.value.length < 2) return null;
    return new Date(`${ganttRange.value[0]}-01`);
  });

  const loadStats = async () => {
    const [roomRes, suiteRes]: any[] = await Promise.all([
      getRoomStatusStats(),
      getSuiteStatus({}),
    ]);
    roomStats.value = roomRes.data || {};
    suiteStats.value = suiteRes.data || [];
  };

  const loadGridData = async () => {
    if (!gridMonth.value) return;
    const [y, m] = gridMonth.value.split('-');
    const query = {
      year: Number(y),
      month: Number(m) - 1,
      suitesId: gridSuiteId.value || undefined,
    };
    loading.value = true;
    try {
      const res: any = await getRoomStatus(query);
      gridRooms.value = res.data || [];
    } finally {
      loading.value = false;
    }
  };

  const loadGanttData = async () => {
    if (!ganttRange.value || ganttRange.value.length < 2) return;
    const query = {
      start: ganttRange.value[0],
      end: ganttRange.value[1],
      suitesId: ganttSuiteId.value || undefined,
    };
    loading.value = true;
    try {
      const res: any = await getRoomOccupationRange(query);
      ganttRooms.value = res.data || [];
    } finally {
      loading.value = false;
    }
  };

  const handleViewChange = async () => {
    if (activeView.value === 'grid') {
      await loadGridData();
    } else {
      await loadGanttData();
    }
  };

  const handleGanttScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    if (timelineHeaderRef.value) {
      timelineHeaderRef.value.scrollLeft = target.scrollLeft;
    }
  };

  const getGanttBarStyle = (occ: any) => {
    if (!ganttStartDate.value || !occ?.startTime || !occ?.endTime) {
      return { display: 'none' };
    }
    const start = new Date(occ.startTime);
    const end = new Date(occ.endTime);
    const diffStart = Math.max(
      0,
      Math.floor((start.getTime() - ganttStartDate.value.getTime()) / 86400000)
    );
    const diffEnd =
      Math.ceil((end.getTime() - ganttStartDate.value.getTime()) / 86400000) +
      1;
    const width = Math.max(1, diffEnd - diffStart);
    return {
      left: `${diffStart * dayWidth}px`,
      width: `${width * dayWidth}px`,
    };
  };

  const getGanttBarClass = (occ: any) => {
    const map: Record<string, string> = {
      0: 'bar-empty',
      1: 'bar-checkin',
      2: 'bar-reserved',
      3: 'bar-hold',
    };
    return map[String(occ.status)] || 'bar-hold';
  };

  const getRoomCardClass = (room: any) => {
    const map: Record<string, string> = {
      0: 'room-empty',
      1: 'room-checkin',
      2: 'room-reserved',
      3: 'room-hold',
    };
    return map[String(room.status)] || 'room-empty';
  };

  const getStatusText = (status: any) => {
    const map: Record<string, string> = {
      0: '空房',
      1: '入住',
      2: '预定',
      3: '保留',
    };
    return map[String(status)] || '空房';
  };

  const formatBarDate = (dateStr: string) => {
    if (!dateStr) return '';
    return String(dateStr).substring(5, 10);
  };

  const getSuiteColor = (s: any) => {
    if ((s.occupiedTotal || 0) >= (s.sumTotal || 0))
      return 'rgb(var(--danger-6))';
    if ((s.occupiedTotal || 0) > 0) return 'rgb(var(--warning-6))';
    return 'rgb(var(--success-6))';
  };

  const handleRoomClick = (room: any) => {
    if (room.customerId) {
      router.push({
        name: 'CrmCustomerDetail',
        params: { customerId: room.customerId },
      });
    }
  };

  const init = async () => {
    await loadStats();
    await loadGridData();
  };

  init();
</script>

<style scoped lang="less">
  .crm-page {
    padding: 16px 20px;
  }

  .section-card {
    margin-bottom: 16px;
  }

  .stat-tile {
    border-radius: 6px;
    border: 1px solid var(--color-border-2);
    border-left: 4px solid transparent;
    padding: 12px 12px 10px;
    background: var(--color-bg-2);
    transition: all 0.15s ease;
    user-select: none;

    .stat-value {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
    }

    .stat-label {
      margin-top: 6px;
      color: var(--color-text-3);
      font-size: 12px;
    }
  }

  .filter-toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }

  .legend {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--color-text-3);
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .legend-dot.empty {
    background: rgb(var(--success-6));
  }

  .legend-dot.hold {
    background: rgb(var(--primary-6));
  }

  .legend-dot.reserved {
    background: rgb(var(--warning-6));
  }

  .legend-dot.checkin {
    background: rgb(var(--danger-6));
  }

  .grid-view {
    .room-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
    }
  }

  .room-card {
    border-radius: 8px;
    padding: 14px 12px;
    cursor: pointer;
    transition: all 0.15s ease;
    border: 1px solid transparent;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }

    .room-number {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 6px;
    }

    .room-name {
      font-size: 13px;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .room-date {
      font-size: 11px;
      opacity: 0.85;
    }

    &.room-empty {
      background: rgb(var(--success-1));
      color: rgb(var(--success-6));
      border-color: rgb(var(--success-2));
    }

    &.room-checkin {
      background: rgb(var(--danger-1));
      color: rgb(var(--danger-6));
      border-color: rgb(var(--danger-2));
    }

    &.room-reserved {
      background: rgb(var(--warning-1));
      color: rgb(var(--warning-6));
      border-color: rgb(var(--warning-2));
    }

    &.room-hold {
      background: rgb(var(--primary-1));
      color: rgb(var(--primary-6));
      border-color: rgb(var(--primary-2));
    }
  }

  .gantt-container {
    border: 1px solid var(--color-border-2);
    border-radius: 6px;
    overflow: hidden;
    background: var(--color-bg-2);
  }

  .gantt-header {
    display: flex;
    background: var(--color-fill-1);
    border-bottom: 1px solid var(--color-border-2);
  }

  .gantt-room-label {
    width: 110px;
    min-width: 110px;
    padding: 8px 10px;
    border-right: 1px solid var(--color-border-2);
    background: var(--color-bg-2);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .gantt-room-label.header-label {
    font-weight: 600;
    color: var(--color-text-2);
    justify-content: center;
  }

  .gantt-timeline-header {
    display: flex;
    overflow: hidden;
  }

  .gantt-month-group {
    flex-shrink: 0;
    border-right: 1px solid var(--color-border-2);
  }

  .gantt-month-label {
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-2);
    padding: 6px 0;
    border-bottom: 1px solid var(--color-border-2);
  }

  .gantt-days {
    display: flex;
  }

  .gantt-day {
    text-align: center;
    font-size: 10px;
    color: var(--color-text-3);
    padding: 3px 0;
    border-right: 1px solid var(--color-border-1);
    box-sizing: border-box;
  }

  .gantt-body {
    max-height: 600px;
    overflow: auto;
  }

  .gantt-row {
    display: flex;
    border-bottom: 1px solid var(--color-border-1);
    min-height: 48px;
  }

  .room-num {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-1);
  }

  .room-type {
    font-size: 11px;
    color: var(--color-text-3);
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .gantt-timeline {
    position: relative;
    height: 48px;
    background: var(--color-bg-2);
  }

  .gantt-bar {
    position: absolute;
    top: 6px;
    height: 36px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 6px;
    font-size: 11px;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
  }

  .gantt-bar.bar-empty {
    background: rgb(var(--success-6));
  }

  .gantt-bar.bar-checkin {
    background: rgb(var(--danger-6));
  }

  .gantt-bar.bar-reserved {
    background: rgb(var(--warning-6));
  }

  .gantt-bar.bar-hold {
    background: rgb(var(--primary-6));
  }

  .bar-name {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  .bar-date,
  .bar-end-date {
    font-size: 10px;
    opacity: 0.9;
    margin-left: 2px;
  }

  .suite-stats {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid var(--color-border-2);
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .suite-stat-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: var(--color-text-2);
    gap: 8px;
  }

  .suite-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }
</style>
