<template>
  <div class="nurse-page">
    <a-card :bordered="false" class="general-card" :body-style="{ padding: '20px' }">
      <div class="toolbar">
        <a-space wrap>
          <a-input v-model="queryParams.nurseName" placeholder="搜索月嫂姓名" allow-clear style="width: 220px"
            @press-enter="handleQuery">
            <template #prefix>
              <icon-search />
            </template>
          </a-input>
          <a-select v-model="queryParams.status" placeholder="全部状态" allow-clear style="width: 140px"
            :options="statusOptions" @change="handleQuery" />
          <a-button type="primary" @click="handleQuery">
            <template #icon><icon-search /></template>
            搜索
          </a-button>
          <a-button @click="resetQuery">
            <template #icon><icon-refresh /></template>
            重置
          </a-button>
        </a-space>
        <a-space>
          <a-button type="primary" @click="handleAdd">
            <template #icon><icon-plus /></template>
            新增月嫂
          </a-button>
        </a-space>
      </div>

      <a-table row-key="nurseId" :loading="loading" :data="dataList" :pagination="pagination" :bordered="false" stripe
        @page-change="handleCurrentChange" @page-size-change="handleSizeChange">
        <template #columns>
          <a-table-column title="月嫂照片" :width="100" align="center">
            <template #cell="{ record }">
              <div v-if="record.nursePhotoUrl && record.nursePhotoUrl.length" class="photo-cell">
                <a-image :src="record.nursePhotoUrl[0]" width="56" height="56" fit="cover" />
              </div>
              <a-avatar v-else :size="56">
                <icon-user />
              </a-avatar>
            </template>
          </a-table-column>
          <a-table-column title="姓名" data-index="nurseName" :width="120" />
          <a-table-column title="星级" :width="160" align="center">
            <template #cell="{ record }">
              <a-rate :model-value="record.level || 0" readonly :count="5" />
            </template>
          </a-table-column>
          <a-table-column title="参考价格" :width="120" align="right">
            <template #cell="{ record }">
              <span v-if="record.price != null" class="price-text">¥{{ record.price }}</span>
              <span v-else class="text-secondary">-</span>
            </template>
          </a-table-column>
          <a-table-column title="分类" data-index="category" :width="120" align="center">
            <template #cell="{ record }">
              <a-tag v-if="record.category" color="arcoblue" size="small">
                {{ record.category }}
              </a-tag>
              <span v-else class="text-secondary">-</span>
            </template>
          </a-table-column>
          <a-table-column title="服务区域" data-index="serviceArea" :width="160" ellipsis tooltip>
            <template #cell="{ record }">
              {{ record.serviceArea || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="服务方式" data-index="serviceMode" :width="100" align="center">
            <template #cell="{ record }">
              {{ record.serviceMode || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="评分" :width="80" align="center">
            <template #cell="{ record }">
              <span v-if="record.avgRating" class="rating-text">
                {{ record.avgRating }}
              </span>
              <span v-else class="text-secondary">-</span>
            </template>
          </a-table-column>
          <a-table-column title="状态" :width="120" align="center">
            <template #cell="{ record }">
              <div class="status-switch-wrapper" :class="{
                'status-switch--loading': statusLoadingMap[record.nurseId],
              }">
                <a-switch :model-value="record.status === 'ONLINE'" :loading="statusLoadingMap[record.nurseId]"
                  :disabled="statusLoadingMap[record.nurseId]" type="round" checked-color="rgb(var(--success-6))"
                  @change="(val) => handleStatusChange(record, Boolean(val))">
                  <template #checked>上线</template>
                  <template #unchecked>下线</template>
                </a-switch>
              </div>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="320" fixed="right" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-button type="text" size="small" @click="handleEdit(record)">
                  <template #icon><icon-edit /></template>
                  编辑
                </a-button>
                <a-popconfirm content="确认删除该月嫂吗？" @ok="handleDelete(record)">
                  <a-button type="text" size="small" status="danger">
                    <template #icon><icon-delete /></template>
                    删除
                  </a-button>
                </a-popconfirm>
                <a-button type="text" size="small" @click="handlePrintResume(record)">
                  <template #icon><icon-printer /></template>
                  简历
                </a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <nurse-modal v-model:visible="formVisible" :title="formTitle" :form-data="formData" @submitted="handleSubmitted" />

    <!-- 打印简历区域（隐藏，仅打印时显示） -->
    <div id="nurse-resume-print" class="resume-print-container">
      <div class="resume-page">
        <!-- 顶部装饰条 -->
        <div class="resume-header-bar"></div>

        <!-- 头部信息 -->
        <div class="resume-header">
          <div class="resume-photo">
            <img v-if="printNurse?.nursePhotoUrl?.length" :src="printNurse.nursePhotoUrl[0]" alt="月嫂照片" />
            <div v-else class="resume-photo-placeholder">照片</div>
          </div>
          <div class="resume-info">
            <h1 class="resume-name">{{ printNurse?.nurseName || '' }}</h1>
            <div class="resume-stars">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= (printNurse?.level || 0) }">★</span>
              <span class="star-label">{{ printNurse?.level || 0 }}星月嫂</span>
            </div>
            <div class="resume-meta-grid">
              <div v-if="printNurse?.category" class="meta-item">
                <span class="meta-label">分类</span>
                <span class="meta-value">{{ printNurse.category }}</span>
              </div>
              <div v-if="printNurse?.nurseTel" class="meta-item">
                <span class="meta-label">联系电话</span>
                <span class="meta-value">{{ printNurse.nurseTel }}</span>
              </div>
              <div v-if="printNurse?.serviceArea" class="meta-item">
                <span class="meta-label">服务区域</span>
                <span class="meta-value">{{ printNurse.serviceArea }}</span>
              </div>
              <div v-if="printNurse?.serviceMode" class="meta-item">
                <span class="meta-label">服务方式</span>
                <span class="meta-value">{{ printNurse.serviceMode }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">参考价格</span>
                <span class="meta-value price">{{
                  printNurse?.price != null ? `¥${printNurse.price}` : '-'
                  }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">服务次数</span>
                <span class="meta-value">{{ printNurse?.useCount ?? 0 }} 次</span>
              </div>
              <div v-if="printNurse?.avgRating" class="meta-item">
                <span class="meta-label">评分</span>
                <span class="meta-value">{{ printNurse.avgRating }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 个人亮点 -->
        <div v-if="printNurse?.highlights?.length" class="resume-section">
          <div class="section-title"><span class="title-icon">⭐</span> 个人亮点</div>
          <div class="section-content">
            <div class="highlights-list">
              <div v-for="(item, idx) in printNurse.highlights" :key="idx" class="highlight-item">
                <span class="highlight-bullet">✦</span>
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 个人简介 -->
        <div v-if="printNurse?.nurseProfile" class="resume-section">
          <div class="section-title"><span class="title-icon">📋</span> 个人简介</div>
          <div class="section-content">
            <p>{{ printNurse.nurseProfile }}</p>
          </div>
        </div>

        <!-- 工作经历 -->
        <div v-if="printNurse?.workExperience?.length" class="resume-section">
          <div class="section-title"><span class="title-icon">💼</span> 工作经历</div>
          <div class="section-content">
            <div v-for="(exp, idx) in printNurse.workExperience" :key="idx" class="experience-block">
              <div class="experience-head">
                <span class="experience-company">{{ exp.company }}</span>
                <span class="experience-divider">|</span>
                <span class="experience-position">{{ exp.position }}</span>
                <span class="experience-date">{{ exp.startDate }} - {{ exp.endDate }}</span>
              </div>
              <ul v-if="exp.duties?.length" class="experience-duties">
                <li v-for="(duty, dIdx) in exp.duties" :key="dIdx">{{
                  duty
                  }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 专业技能 -->
        <div v-if="printNurse?.professionalSkills?.length" class="resume-section">
          <div class="section-title"><span class="title-icon">🎯</span> 专业技能</div>
          <div class="section-content">
            <div class="skills-grid">
              <div v-for="(skill, idx) in printNurse.professionalSkills" :key="idx" class="skill-card">
                <span class="skill-name">{{ skill.skillName }}</span>
                <span class="skill-desc">{{ skill.skillDesc }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 证书图片 -->
        <div v-if="printNurse?.certificateImages?.length" class="resume-section">
          <div class="section-title"><span class="title-icon">📜</span> 资质证书</div>
          <div class="section-content">
            <div class="resume-gallery">
              <img v-for="(url, idx) in printNurse.certificateImages" :key="idx" :src="url"
                class="gallery-img gallery-img--cert" />
            </div>
          </div>
        </div>

        <!-- 健康证明图片 -->
        <div v-if="printNurse?.healthImages?.length" class="resume-section">
          <div class="section-title"><span class="title-icon">🏥</span> 健康证明</div>
          <div class="section-content">
            <div class="resume-gallery">
              <img v-for="(url, idx) in printNurse.healthImages" :key="idx" :src="url"
                class="gallery-img gallery-img--cert" />
            </div>
          </div>
        </div>

        <!-- 关联套餐 -->
        <div v-if="printNurse?.packageName" class="resume-section">
          <div class="section-title"><span class="title-icon">📦</span> 关联套餐</div>
          <div class="section-content">
            <p>{{ printNurse.packageName }}</p>
          </div>
        </div>

        <!-- 详情图片 -->
        <div v-if="printNurse?.description?.length" class="resume-section">
          <div class="section-title"><span class="title-icon">🖼️</span> 图文详情</div>
          <div class="section-content">
            <div class="resume-gallery">
              <img v-for="(url, idx) in printNurse.description" :key="idx" :src="url" class="gallery-img" />
            </div>
          </div>
        </div>

        <!-- 底部 -->
        <div class="resume-footer">
          <div class="footer-line"></div>
          <p>本简历由系统自动生成 ·
            {{ new Date().toLocaleDateString('zh-CN') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onActivated, nextTick } from 'vue';
import { Message } from '@arco-design/web-vue';
import {
  IconSearch,
  IconRefresh,
  IconPlus,
  IconEdit,
  IconDelete,
  IconUser,
  IconPrinter,
} from '@arco-design/web-vue/es/icon';
import {
  listNurse,
  getNurse,
  delNurse,
  updateNurse,
} from '@/api/platform/maternityNurse';
import {
  NURSE_STATUS_OPTIONS,
  type MaternityNurse,
  type MaternityNurseQuery,
} from '@/types/maternity';
import NurseModal from './components/NurseModal.vue';

const loading = ref(false);
const dataList = ref<MaternityNurse[]>([]);
const total = ref(0);
const statusLoadingMap = reactive<Record<number, boolean>>({});

const queryParams = reactive<MaternityNurseQuery>({
  pageNum: 1,
  pageSize: 10,
  nurseName: undefined,
  status: '',
});

const statusOptions = NURSE_STATUS_OPTIONS;

const pagination = computed(() => ({
  current: queryParams.pageNum,
  pageSize: queryParams.pageSize,
  total: total.value,
  showTotal: true,
  showPageSize: true,
  pageSizeOptions: [10, 20, 50],
}));

const formVisible = ref(false);
const formTitle = ref('');
const formData = ref<Partial<MaternityNurse>>({});
const isCreate = ref(true);

async function getList() {
  loading.value = true;
  try {
    const res: any = await listNurse(queryParams);
    dataList.value = res.rows || [];
    total.value = res.total || 0;
  } catch (error) {
    Message.error('获取列表失败');
  } finally {
    loading.value = false;
  }
}

function handleQuery() {
  queryParams.pageNum = 1;
  getList();
}

function resetQuery() {
  queryParams.pageNum = 1;
  queryParams.pageSize = 10;
  queryParams.nurseName = undefined;
  queryParams.status = '';
  getList();
}

function handleCurrentChange(page: number) {
  queryParams.pageNum = page;
  getList();
}

function handleSizeChange(size: number) {
  queryParams.pageSize = size;
  queryParams.pageNum = 1;
  getList();
}

function handleAdd() {
  isCreate.value = true;
  formTitle.value = '新增月嫂';
  formData.value = {
    status: 'ONLINE',
    nursePhotoUrl: [],
    description: [],
    level: 3,
  };
  formVisible.value = true;
}

function handleEdit(record: MaternityNurse) {
  isCreate.value = false;
  formTitle.value = '编辑月嫂';
  formData.value = { ...record };
  formVisible.value = true;
}

async function handleDelete(record: MaternityNurse) {
  try {
    await delNurse(record.nurseId!);
    Message.success('删除成功');
    getList();
  } catch {
    Message.error('删除失败');
  }
}

async function handleStatusChange(record: MaternityNurse, online: boolean) {
  const id = record.nurseId!;
  // 防止重复请求
  if (statusLoadingMap[id]) return;
  statusLoadingMap[id] = true;
  try {
    await updateNurse({
      ...record,
      nursePhotoUrl: record.nursePhotoUrl || [],
      nurseProfile: record.nurseProfile || '',
      description: record.description || [],
      status: online ? 'ONLINE' : 'OFFLINE',
    });
    Message.success(online ? '已上线' : '已下线');
    getList();
  } catch {
    Message.error('操作失败');
  } finally {
    statusLoadingMap[id] = false;
  }
}

async function handleSubmitted() {
  console.log('handleSubmitted');
  if (isCreate.value) {
    queryParams.pageNum = 1;
  }
  await nextTick();
  await getList();
}

getList();

// 打印简历
const printNurse = ref<MaternityNurse | null>(null);

async function handlePrintResume(record: MaternityNurse) {
  try {
    // 获取完整详情数据
    const res: any = await getNurse(record.nurseId!);
    printNurse.value = res.data || res;
    await nextTick();
    window.print();
  } catch {
    Message.error('获取简历数据失败');
  }
}

</script>

<style lang="less" scoped>
.nurse-page {
  padding: 16px 20px;

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .photo-cell {
    :deep(.arco-image) {
      overflow: hidden;
    }
  }

  .price-text {
    color: rgb(var(--danger-6));
    font-weight: 600;
  }

  .rating-text {
    color: rgb(var(--warning-6));
    font-weight: 600;
  }

  .text-secondary {
    color: var(--color-text-3);
    font-size: 12px;
  }

  .status-switch-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 0.3s ease;

    &:active {
      transform: scale(0.9);
    }

    &.status-switch--loading {
      opacity: 0.7;
      pointer-events: none;
    }
  }

  :deep(.arco-switch) {
    transition: background-color 0.4s ease, box-shadow 0.3s ease;

    &:not(.arco-switch-disabled):hover {
      box-shadow: 0 0 0 3px rgb(var(--primary-6) 0.15);
    }
  }

  // 打印简历容器 —— 正常情况隐藏
  .resume-print-container {
    display: none;
  }
}
</style>

<!-- 打印专用样式 -->
<style>
@media print {

  /* 隐藏页面上所有元素（visibility 允许后代覆盖） */
  body * {
    visibility: hidden !important;
  }

  /* 只显示简历容器及其所有内容 */
  #nurse-resume-print,
  #nurse-resume-print * {
    visibility: visible !important;
  }

  #nurse-resume-print {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    display: block !important;
    width: 100%;
    height: auto;
    background: #fff;
  }

  @page {
    size: a4;
    margin: 12mm 15mm;
  }
}

/* ========== 简历排版样式 ========== */
#nurse-resume-print {
  color: #1d2129;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif;
  line-height: 1.7;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

#nurse-resume-print .resume-page {
  max-width: 210mm;
  margin: 0 auto;
  padding: 0;
}

/* 顶部装饰条 */
#nurse-resume-print .resume-header-bar {
  height: 6px;
  margin-bottom: 28px;
  background: linear-gradient(90deg, #165dff, #14c9c9, #722ed1);
  border-radius: 0 0 4px 4px;
}

/* 头部信息 */
#nurse-resume-print .resume-header {
  display: flex;
  gap: 28px;
  align-items: flex-start;
  margin-bottom: 28px;
}

#nurse-resume-print .resume-photo {
  flex-shrink: 0;
  width: 130px;
  height: 160px;
  overflow: hidden;
  border: 3px solid #e5e6eb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 8%);
}

#nurse-resume-print .resume-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#nurse-resume-print .resume-photo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #86909c;
  font-size: 16px;
  background: #f2f3f5;
}

#nurse-resume-print .resume-info {
  flex: 1;
  padding-top: 4px;
}

#nurse-resume-print .resume-name {
  margin: 0 0 8px;
  color: #1d2129;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 2px;
}

#nurse-resume-print .resume-stars {
  display: flex;
  gap: 3px;
  align-items: center;
  margin-bottom: 16px;
}

#nurse-resume-print .resume-stars .star {
  color: #c9cdd4;
  font-size: 18px;
}

#nurse-resume-print .resume-stars .star.filled {
  color: #ff7d00;
}

#nurse-resume-print .resume-stars .star-label {
  margin-left: 8px;
  color: #86909c;
  font-weight: 500;
  font-size: 13px;
}

/* 信息网格 */
#nurse-resume-print .resume-meta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px 24px;
}

#nurse-resume-print .meta-item {
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  background: #f7f8fa;
  border-left: 3px solid #165dff;
  border-radius: 8px;
}

#nurse-resume-print .meta-label {
  margin-bottom: 2px;
  color: #86909c;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

#nurse-resume-print .meta-value {
  color: #1d2129;
  font-weight: 600;
  font-size: 14px;
}

#nurse-resume-print .meta-value.price {
  color: #f53f3f;
}

/* 章节 */
#nurse-resume-print .resume-section {
  margin-bottom: 22px;
}

#nurse-resume-print .section-title {
  display: flex;
  gap: 6px;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  color: #1d2129;
  font-weight: 700;
  font-size: 16px;
  border-bottom: 2px solid #165dff;
}

#nurse-resume-print .title-icon {
  font-size: 18px;
}

#nurse-resume-print .section-content {
  padding-left: 4px;
}

#nurse-resume-print .section-content p {
  margin: 0;
  color: #4e5969;
  font-size: 14px;
  line-height: 1.8;
  text-align: justify;
}

/* 图片画廊 */
#nurse-resume-print .resume-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

#nurse-resume-print .gallery-img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
}

#nurse-resume-print .gallery-img--cert {
  width: 160px;
  height: 110px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 6%);
}

/* 个人亮点 */
#nurse-resume-print .highlights-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#nurse-resume-print .highlight-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 8px 14px;
  color: #1d2129;
  font-size: 13px;
  line-height: 1.6;
  background: #f0fbf5;
  border-left: 3px solid #00b42a;
  border-radius: 8px;
}

#nurse-resume-print .highlight-bullet {
  flex-shrink: 0;
  margin-top: 1px;
  color: #00b42a;
  font-size: 14px;
}

/* 工作经历 */
#nurse-resume-print .experience-block {
  margin-bottom: 16px;
  padding-left: 14px;
  border-left: 3px solid #165dff;
}

#nurse-resume-print .experience-block:last-child {
  margin-bottom: 0;
}

#nurse-resume-print .experience-head {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  margin-bottom: 6px;
}

#nurse-resume-print .experience-company {
  color: #1d2129;
  font-weight: 700;
  font-size: 14px;
}

#nurse-resume-print .experience-divider {
  color: #c9cdd4;
  font-size: 13px;
}

#nurse-resume-print .experience-position {
  color: #165dff;
  font-weight: 600;
  font-size: 14px;
}

#nurse-resume-print .experience-date {
  margin-left: auto;
  color: #86909c;
  font-weight: 500;
  font-size: 12px;
}

#nurse-resume-print .experience-duties {
  margin: 4px 0 0;
  padding-left: 18px;
  list-style: disc;
}

#nurse-resume-print .experience-duties li {
  margin-bottom: 2px;
  color: #4e5969;
  font-size: 13px;
  line-height: 1.8;
}

/* 专业技能 */
#nurse-resume-print .skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

#nurse-resume-print .skill-card {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 8px 12px;
  background: #f7f8fa;
  border-radius: 8px;
}

#nurse-resume-print .skill-name {
  display: inline-block;
  flex-shrink: 0;
  padding: 2px 10px;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.6;
  white-space: nowrap;
  background: #165dff;
  border-radius: 4px;
}

#nurse-resume-print .skill-desc {
  color: #4e5969;
  font-size: 13px;
  line-height: 1.6;
}

/* 底部 */
#nurse-resume-print .resume-footer {
  margin-top: 32px;
  text-align: center;
}

#nurse-resume-print .footer-line {
  height: 2px;
  margin-bottom: 12px;
  background: linear-gradient(90deg, transparent, #c9cdd4, transparent);
}

#nurse-resume-print .resume-footer p {
  margin: 0;
  color: #c9cdd4;
  font-size: 11px;
  letter-spacing: 1px;
}
</style>
