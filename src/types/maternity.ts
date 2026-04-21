/**
 * 月嫂管理模块 — 类型定义
 */

// ==================== 月嫂相关 ====================

/** 月嫂状态 */
export type NurseStatus = 'ONLINE' | 'OFFLINE';

export const NURSE_STATUS_OPTIONS = [
  { label: '上线', value: 'ONLINE' },
  { label: '下线', value: 'OFFLINE' },
];

export function getNurseStatusText(status: NurseStatus): string {
  return status === 'ONLINE' ? '上线' : '下线';
}

/** 签约礼品 */
export interface ContractGift {
  contractGiftId: number;
  giftName: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  createTime?: string;
  updateTime?: string;
}

/** 工作经历 */
export interface WorkExperience {
  company: string; // 公司/地区，如"XX市"
  position: string; // 职位，如"高级月嫂（住家）"
  startDate: string; // 开始时间，如"2018.03"
  endDate: string; // 结束时间，如"至今"
  duties: string[]; // 工作职责/成果列表
}

/** 专业技能 */
export interface ProfessionalSkill {
  skillName: string; // 技能类别，如"新生儿护理"
  skillDesc: string; // 技能描述，如"黄疸观察、脐部护理..."
}

/** 月嫂数据模型 */
export interface MaternityNurse {
  nurseId?: number;
  nurseName: string;
  nurseTel?: string;
  level?: number;
  serviceArea?: string;
  price?: number;
  status: NurseStatus;
  nursePhotoUrl?: string[];
  nurseProfile?: string;
  packageName?: string;
  description?: string[];
  videos?: string[];
  category?: string;
  useCount?: number;
  serviceMode?: string;
  contractGiftId?: number;
  contractGift?: ContractGift;
  isExistContractGift?: boolean;
  avgRating?: number;
  reviewCount?: number;
  /** 个人亮点列表 */
  highlights?: string[];
  /** 工作经历 */
  workExperience?: WorkExperience[];
  /** 专业技能 */
  professionalSkills?: ProfessionalSkill[];
  /** 证书图片 */
  certificateImages?: string[];
  /** 健康证明图片 */
  healthImages?: string[];
  createTime?: string;
  updateTime?: string;
}

/** 月嫂查询参数 */
export interface MaternityNurseQuery {
  pageNum?: number;
  pageSize?: number;
  orderByColumn?: string;
  isAsc?: string;
  nurseName?: string;
  status?: NurseStatus | '';
}

/** 月嫂表单数据 */
export interface MaternityNurseForm {
  nurseId?: number;
  nurseName: string;
  nurseTel?: string;
  level?: number;
  serviceArea?: string;
  price?: number;
  status: NurseStatus;
  nursePhotoUrl: string[];
  nurseProfile: string;
  packageName?: string;
  description: string[];
  videos?: string[];
  category?: string;
  useCount?: number;
  serviceMode?: string;
  contractGiftId?: number;
  isExistContractGift?: boolean;
  /** 个人亮点列表 */
  highlights?: string[];
  /** 工作经历 */
  workExperience?: WorkExperience[];
  /** 专业技能 */
  professionalSkills?: ProfessionalSkill[];
  /** 证书图片 */
  certificateImages?: string[];
  /** 健康证明图片 */
  healthImages?: string[];
}

// ==================== 套餐相关 ====================

/** 套餐状态 */
export type PackageStatus = 'ENABLED' | 'DISABLED';

export const PACKAGE_STATUS_OPTIONS = [
  { label: '启用', value: 'ENABLED' },
  { label: '停用', value: 'DISABLED' },
];

export function getPackageStatusText(status: PackageStatus): string {
  return status === 'ENABLED' ? '启用' : '停用';
}

/** 套餐数据模型 */
export interface NursePackage {
  packageId?: number;
  packageName: string;
  price: number;
  serviceDays?: number;
  serviceContent?: string;
  sortOrder?: number;
  status: PackageStatus;
  createTime?: string;
  updateTime?: string;
}

/** 套餐查询参数 */
export interface NursePackageQuery {
  pageNum?: number;
  pageSize?: number;
  orderByColumn?: string;
  isAsc?: string;
}

/** 套餐表单数据 */
export interface NursePackageForm {
  packageId?: number;
  packageName: string;
  price: number;
  serviceDays?: number;
  serviceContent?: string;
  sortOrder?: number;
  status: PackageStatus;
}

// ==================== 订单相关 ====================

/** 订单状态 */
export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'IN_SERVICE'
  | 'COMPLETED'
  | 'CANCELLED';

export const ORDER_STATUS_OPTIONS = [
  { label: '待确认', value: 'PENDING' },
  { label: '已确认', value: 'CONFIRMED' },
  { label: '服务中', value: 'IN_SERVICE' },
  { label: '已完成', value: 'COMPLETED' },
  { label: '已取消', value: 'CANCELLED' },
];

export function getOrderStatusText(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    PENDING: '待确认',
    CONFIRMED: '已确认',
    IN_SERVICE: '服务中',
    COMPLETED: '已完成',
    CANCELLED: '已取消',
  };
  return map[status] || '未知';
}

export function getOrderStatusColor(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    PENDING: 'orangered',
    CONFIRMED: 'arcoblue',
    IN_SERVICE: 'green',
    COMPLETED: 'gray',
    CANCELLED: 'red',
  };
  return map[status] || 'gray';
}

/** 订单状态步骤映射（用于进度条） */
export function getOrderStepIndex(status: OrderStatus): number {
  const map: Record<OrderStatus, number> = {
    PENDING: 0,
    CONFIRMED: 1,
    IN_SERVICE: 2,
    COMPLETED: 3,
    CANCELLED: -1,
  };
  return map[status] ?? 0;
}

/** 服务日志 */
export interface ServiceLog {
  logId?: number;
  orderId: number;
  nurseId?: number;
  serviceDate: string;
  serviceContent: string;
  photos?: string[];
  notes?: string;
  createTime?: string;
}

/** 订单数据模型 */
export interface NurseOrder {
  orderId?: number;
  orderNo?: string;
  customerId?: number;
  customerName: string;
  customerTel: string;
  nurseId?: number;
  nurseName?: string;
  packageId?: number;
  packageName?: string;
  serviceAddress: string;
  serviceStartDate?: string;
  serviceEndDate?: string;
  totalAmount?: number;
  orderStatus: OrderStatus;
  contractGiftId?: number;
  source?: string;
  notes?: string;
  serviceLogs?: ServiceLog[];
  createTime?: string;
  updateTime?: string;
}

/** 订单查询参数 */
export interface NurseOrderQuery {
  pageNum?: number;
  pageSize?: number;
  orderByColumn?: string;
  isAsc?: string;
  orderNo?: string;
  customerName?: string;
  nurseName?: string;
  orderStatus?: OrderStatus | '';
}

/** 订单表单数据 */
export interface NurseOrderForm {
  orderId?: number;
  customerId?: number;
  customerName: string;
  customerTel: string;
  nurseId?: number;
  packageId?: number;
  serviceAddress: string;
  serviceStartDate?: string;
  serviceEndDate?: string;
  totalAmount?: number;
  contractGiftId?: number;
  source?: string;
  notes?: string;
}

// ==================== 评价相关 ====================

/** 评价数据模型 */
export interface NurseReview {
  reviewId?: number;
  orderId?: number;
  nurseId?: number;
  userId?: number;
  nickname?: string;
  avatar?: string;
  rating: number;
  content: string;
  photos?: string[];
  reply?: string;
  replyTime?: string;
  createTime?: string;
}

/** 评价查询参数 */
export interface NurseReviewQuery {
  pageNum?: number;
  pageSize?: number;
  orderByColumn?: string;
  isAsc?: string;
  nurseId?: number;
}
