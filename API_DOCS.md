# 后台管理系统 API 接口文档总结概览

> [!tip]
> 以下是从旧系统 `aler-ul/src/api` 中提取并整理的全部 API，用于指导新版 `aier-admin-ui` 的模块化开发。新系统的 `src/api` 应该按照如下的模块结构进行梳理并迁移。

## AI 助理 (ai)

### ai/agent.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listAgent` | `/ai/agent/list` | `GET` | 查询智能体列表 |
| `getAgent` | `/ai/agent/` | `GET` | 获取智能体详细信息 |
| `getAgentByCode` | `/ai/agent/code/` | `GET` | 根据编码获取智能体详细信息 |
| `addAgent` | `/ai/agent` | `POST` | 新增智能体 |
| `updateAgent` | `/ai/agent` | `PUT` | 修改智能体 |
| `delAgent` | `/ai/agent/` | `DELETE` | 删除智能体 |
| `changeAgentStatus` | `/ai/agent/changeStatus` | `PUT` | 启用/禁用智能体 |
| `setDefaultAgent` | `/ai/agent/setDefault/` | `PUT` | 设置默认智能体 |
| `copyAgent` | `/ai/agent/copy` | `POST` | 复制智能体 |
| `checkAgentCodeUnique` | `/ai/agent/checkAgentCodeUnique` | `GET` | 校验智能体编码是否唯一 |
| `getAvailableAgents` | `/ai/agent/available` | `GET` | 获取可用智能体列表（不分页） |
| `getDefaultAgent` | `/ai/agent/default` | `GET` | 获取默认智能体 |

### ai/aiModel.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `syncModels` | `/admin/ai-model/sync` | `POST` | 从OpenAI API同步模型列表 |
| `listAiModels` | `/admin/ai-model/list` | `GET` | 分页查询模型列表 |
| `listValidModels` | `/admin/ai-model/list/valid` | `GET` | 获取所有有效模型 |
| `addAiModel` | `/admin/ai-model` | `POST` | 创建模型 |
| `updateAiModel` | `/admin/ai-model/${data.id}` | `PUT` | 更新模型 |
| `delAiModel` | `/admin/ai-model/${id}` | `DELETE` | 删除模型 |
| `delAiModels` | `/admin/ai-model/batch` | `DELETE` | 批量删除模型 |
| `resolveAlias` | `/admin/ai-model/resolve-alias` | `GET` | 解析模型别名 |
| `getProviders` | `/admin/ai-model/providers` | `GET` | 获取支持的供应商列表 |

### ai/billing.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getBillingStatistics` | `/ai/billing/statistics` | `GET` | 获取计费统计信息 |
| `getBillingRecords` | `/ai/billing/records` | `GET` | 获取计费记录列表 |
| `getUserBillingRecords` | `/ai/billing/records/user/${userId}` | `GET` | 获取指定用户的计费记录 |
| `getConversationBillingRecords` | `/ai/billing/records/conversation/${conversationId}` | `GET` | 获取指定会话的计费记录 |
| `getTotalCost` | `/ai/billing/cost/total` | `GET` | 计算总成本 |
| `getTotalTokens` | `/ai/billing/tokens/total` | `GET` | 计算总Token消耗 |
| `getTodayTokenUsage` | `/ai/billing/tokens/today` | `GET` | 获取今日Token使用量 |
| `getMonthlyTokenUsage` | `/ai/billing/tokens/monthly` | `GET` | 获取本月Token使用量 |
| `getTotalTokenUsage` | `/ai/billing/tokens/total-usage` | `GET` | 获取总Token使用量 |
| `generateBillingReport` | `/ai/billing/report` | `GET` | 生成账单报告 |
| `exportBillingData` | `/ai/billing/export` | `GET` | 导出计费数据 |

### ai/contactProfile.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getContactProfile` | `/ai/wework/contact/profile/detail` | `POST` | 查询客户画像详情 |
| `listContactProfiles` | `/ai/wework/contact/profile/list` | `POST` | 分页查询画像列表 |
| `updateContactProfile` | `/ai/wework/contact/profile/update` | `POST` | 更新客户画像 |
| `setDoNotDisturb` | `/ai/wework/contact/profile/do-not-disturb/set` | `POST` | 设置免打扰 |
| `cancelDoNotDisturb` | `/ai/wework/contact/profile/do-not-disturb/cancel` | `POST` | 取消免打扰 |
| `triggerProfileAnalysis` | `/ai/wework/contact/profile/analysis/trigger` | `POST` | 触发画像分析 |

### ai/dataImport.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `importData` | `/ai/data/import/importData` | `POST` | 导入数据 |

### ai/document.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getDocumentList` | `/ai/documents/list` | `GET` | 分页查询文档列表 |
| `getAllDocuments` | `/ai/documents/all` | `GET` | 查询所有文档列表（不分页） |
| `getDocumentsByKnowledgeId` | `/ai/documents/knowledge-base/${knowledgeId}` | `GET` | 根据知识库ID查询文档列表 |
| `getDocumentDetail` | `/ai/documents/${documentId}` | `GET` | 获取文档详细信息 |
| `getDocumentPreview` | `/ai/documents/${documentId}/preview` | `GET` | 获取文档内容预览 |
| `createDocument` | `/ai/documents` | `POST` | 新增文档 |
| `updateDocument` | `/ai/documents` | `PUT` | 修改文档 |
| `deleteDocuments` | `/ai/documents/${ids}` | `DELETE` | 删除文档 |
| `uploadDocument` | `/ai/documents/upload` | `POST` | 上传单个文档 |
| `batchUploadDocuments` | `/ai/documents/batch-upload` | `POST` | 批量上传文档 |
| `reprocessDocument` | `/ai/documents/${documentId}/reprocess` | `PUT` | 重新处理文档 |
| `getSupportedFileTypes` | `/ai/documents/supported-file-types` | `GET` | 获取支持的文件类型 |
| `checkFileTypeSupported` | `/ai/documents/check-file-type` | `GET` | 检查文件类型是否支持 |

### ai/knowledgeBase.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getKnowledgeBaseList` | `/ai/knowledge-bases/list` | `GET` | 分页查询知识库列表 |
| `getAllKnowledgeBases` | `/ai/knowledge-bases/all` | `GET` | 查询所有知识库列表（不分页） |
| `getCurrentTenantKnowledgeBases` | `/ai/knowledge-bases/current-tenant` | `GET` | 获取当前租户的知识库列表 |
| `getKnowledgeBaseDetail` | `/ai/knowledge-bases/${knowledgeId}` | `GET` | 获取知识库详细信息 |
| `createKnowledgeBase` | `/ai/knowledge-bases` | `POST` | 新增知识库 |
| `updateKnowledgeBase` | `/ai/knowledge-bases` | `PUT` | 修改知识库 |
| `deleteKnowledgeBases` | `/ai/knowledge-bases/${ids}` | `DELETE` | 删除知识库 |
| `checkKnowledgeNameUnique` | `/ai/knowledge-bases/check-name` | `GET` | 检查知识库名称是否唯一 |
| `refreshStatistics` | `/ai/knowledge-bases/${knowledgeId}/refresh-statistics` | `PUT` | 刷新知识库统计信息 |

### ai/mcp.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listMcpConfig` | `/ai/mcp/config/list` | `GET` | 分页查询 MCP 服务器配置 |
| `listEnabledMcp` | `/ai/mcp/config/enabled` | `GET` | 查询所有启用的 MCP 服务器 |
| `getMcpConfig` | `/ai/mcp/config/` | `GET` | 根据 ID 查询 MCP 服务器配置 |
| `addMcpConfig` | `/ai/mcp/config` | `POST` | 新增 MCP 服务器配置 |
| `updateMcpConfig` | `/ai/mcp/config` | `PUT` | 修改 MCP 服务器配置 |
| `delMcpConfig` | `/ai/mcp/config/` | `DELETE` | 删除 MCP 服务器配置 |
| `testMcpConnection` | `/ai/mcp/config/` | `GET` | 测试 MCP 服务器连接 |

### ai/outreachMaterial.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listMaterial` | `/ai/outreach/admin/materials` | `GET` | 分页查询广告素材列表 |
| `getMaterial` | `/ai/outreach/admin/materials/` | `GET` | 获取素材详情 |
| `addMaterial` | `/ai/outreach/admin/materials` | `POST` | 创建广告素材 |
| `updateMaterial` | `/ai/outreach/admin/materials/` | `PUT` | 更新广告素材 |
| `delMaterial` | `/ai/outreach/admin/materials/` | `DELETE` | 删除广告素材 |
| `delMaterialBatch` | `/ai/outreach/admin/materials/batch` | `DELETE` | 批量删除广告素材 |
| `enableMaterial` | `/ai/outreach/admin/materials/` | `POST` | 启用素材 |
| `disableMaterial` | `/ai/outreach/admin/materials/` | `POST` | 禁用素材 |
| `getMaterialTypes` | `/ai/outreach/admin/materials/types` | `GET` | 获取素材类型选项 |
| `getMiniprograms` | `/ai/outreach/admin/materials/miniprograms` | `GET` | 获取可用的小程序列表 |
| `batchSendMaterial` | `/ai/outreach/admin/materials/batch-send` | `POST` | 批量发送素材广告 |

### ai/outreachRule.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listRuleTemplates` | `/ai/admin/outreach/rules/templates` | `GET` | 分页查询规则模板列表 |
| `getRuleTemplate` | `/ai/admin/outreach/rules/templates/` | `GET` | 获取规则模板详情 |
| `addRuleTemplate` | `/ai/admin/outreach/rules/templates` | `POST` | 创建规则模板 |
| `updateRuleTemplate` | `/ai/admin/outreach/rules/templates/` | `PUT` | 更新规则模板 |
| `delRuleTemplate` | `/ai/admin/outreach/rules/templates/` | `DELETE` | 删除规则模板 |
| `enableRuleTemplate` | `/ai/admin/outreach/rules/templates/` | `POST` | 启用规则模板 |
| `disableRuleTemplate` | `/ai/admin/outreach/rules/templates/` | `POST` | 禁用规则模板 |
| `listTenantRules` | `/ai/admin/outreach/rules/tenant/` | `GET` | 查询指定租户的规则列表 |
| `initializeTenantRules` | `/ai/admin/outreach/rules/initialize` | `POST` | 为指定租户初始化规则 |
| `initializeAllTenantRules` | `/ai/admin/outreach/rules/initialize-all` | `POST` | 批量初始化所有租户规则 |
| `syncRulesToTenant` | `/ai/admin/outreach/rules/sync` | `POST` | 同步规则模板到指定租户 |
| `syncRulesToAllTenants` | `/ai/admin/outreach/rules/sync-all` | `POST` | 同步规则模板到所有租户 |
| `getRuleStatistics` | `/ai/admin/outreach/rules/statistics` | `GET` | 获取规则初始化统计 |
| `getAllRuleCodes` | `/ai/admin/outreach/rules/codes` | `GET` | 获取所有规则编码列表 |
| `listMyRules` | `/ai/outreach/admin/rules` | `GET` | 分页查询当前租户的规则列表 |
| `getMyRule` | `/ai/outreach/admin/rules/` | `GET` | 获取当前租户的规则详情 |
| `updateMyRule` | `/ai/outreach/admin/rules/` | `PUT` | 更新当前租户的规则（租户只能修改配置，不能新增/删除） |
| `enableMyRule` | `/ai/outreach/admin/rules/` | `POST` | 启用当前租户的规则 |
| `disableMyRule` | `/ai/outreach/admin/rules/` | `POST` | 禁用当前租户的规则 |

### ai/pregnancyMilestone.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getMilestoneList` | `/admin/pregnancy-milestone/list` | `GET` | 分页查询里程碑列表 |
| `getMilestoneDetail` | `/admin/pregnancy-milestone/${id}` | `GET` | 获取里程碑详细信息 |
| `createMilestone` | `/admin/pregnancy-milestone` | `POST` | 新增里程碑 |
| `updateMilestone` | `/admin/pregnancy-milestone/${data.id}` | `PUT` | 修改里程碑 |
| `deleteMilestone` | `/admin/pregnancy-milestone/${id}` | `DELETE` | 删除里程碑 |
| `batchDeleteMilestone` | `/admin/pregnancy-milestone/${id}/status` | `PUT` | 批量删除里程碑（前端实现，循环调用单个删除接口） |
| `updateMilestoneStatus` | `/admin/pregnancy-milestone/${id}/status` | `PUT` | 更新启用状态 |
| `getMilestonesByCategory` | `/admin/pregnancy-milestone/by-category` | `GET` | 按分类查询里程碑 |
| `getMilestonesByWeek` | `/admin/pregnancy-milestone/by-week` | `GET` | 按孕周查询里程碑 |
| `getActiveMilestones` | `/admin/pregnancy-milestone/active` | `GET` | 获取所有启用里程碑 |
| `sortMilestones` | `/admin/pregnancy-milestone/sort` | `PUT` | 排序里程碑 |

### ai/products.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listProducts` | `/ai/products/list` | `GET` | 查询产品分页列表 |
| `listAllProducts` | `/ai/products/all` | `GET` | 查询产品列表（不分页） |
| `getProduct` | `/ai/products/` | `GET` | 查询产品详细 |
| `addProduct` | `/ai/products` | `POST` | 新增产品 |
| `updateProduct` | `/ai/products` | `PUT` | 修改产品 |
| `delProduct` | `/ai/products/` | `DELETE` | 删除产品 |

### ai/projectSupportService.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listProjectSupportServices` | `/ai/project-support-services/list` | `GET` | 查询配套服务项目分页列表 |
| `listAllProjectSupportServices` | `/ai/project-support-services/all` | `GET` | 查询配套服务项目列表（不分页） |
| `getProjectSupportService` | `/ai/project-support-services/` | `GET` | 查询配套服务项目详细 |
| `addProjectSupportService` | `/ai/project-support-services` | `POST` | 新增配套服务项目 |
| `updateProjectSupportService` | `/ai/project-support-services` | `PUT` | 修改配套服务项目 |
| `delProjectSupportService` | `/ai/project-support-services/` | `DELETE` | 删除配套服务项目 |

### ai/quota.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listQuota` | `/ai/admin/quota/list` | `GET` | 查询租户额度列表 |
| `getMyQuotaInfo` | `/ai/tenant/quota/info` | `GET` | 查询当前租户额度信息 |
| `getMyRechargeHistory` | `/ai/tenant/quota/recharge-history` | `GET` | 查询当前租户充值历史 |
| `checkMyQuota` | `/ai/tenant/quota/check` | `GET` | 检查当前租户额度是否充足 |

### ai/tenantAgentConstraint.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getConstraintTypes` | `/ai/tenant/constraint/constraintTypes` | `GET` | 获取所有约束类型列表 |
| `listConstraints` | `/ai/tenant/constraint/list` | `GET` | 分页查询约束列表 |
| `listAllConstraints` | `/ai/tenant/constraint/listAll` | `GET` | 查询约束列表（不分页） |
| `getConstraint` | `/ai/tenant/constraint/` | `GET` | 获取约束详情 |
| `addConstraint` | `/ai/tenant/constraint` | `POST` | 新增约束 |
| `updateConstraint` | `/ai/tenant/constraint` | `PUT` | 修改约束 |
| `delConstraint` | `/ai/tenant/constraint/` | `DELETE` | 删除约束 |
| `changeConstraintStatus` | `/ai/tenant/constraint/changeStatus` | `PUT` | 启用/禁用约束 |
| `batchUpdatePriority` | `/ai/tenant/constraint/priority` | `PUT` | 批量更新优先级 |

### ai/tenantQuota.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `initializeQuota` | `/ai/admin/quota/initialize` | `POST` | 初始化租户额度(后端按默认额度初始化) |
| `rechargeQuota` | `/ai/admin/quota/recharge` | `POST` | 充值租户额度 |
| `getQuotaInfo` | `/ai/admin/quota/info/${tenantId}` | `GET` | 查询指定租户额度信息 |
| `getRechargeHistory` | `/ai/admin/quota/recharge-history/${tenantId}` | `GET` | 查询指定租户充值历史 |
| `resetUsedQuota` | `/ai/admin/quota/reset/${tenantId}` | `POST` | 重置租户已用额度 |
| `updateQuotaStatus` | `/ai/admin/quota/update-status/${tenantId}` | `PUT` | 更新租户额度状态 |

### ai/tools.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getToolList` | `/ai/tools` | `GET` | 获取工具列表 |

### ai/wework.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listWeworkInstance` | `/ai/wework/instance/list` | `GET` | 查询企业微信实例列表 |
| `getWeworkInstance` | `/ai/wework/instance/` | `GET` | 获取企业微信实例详细信息(根据ID) |
| `getWeworkInstanceByGuid` | `/ai/wework/instance/` | `GET` | 根据GUID获取企业微信实例详细信息 |
| `restoreWeworkInstance` | `/ai/wework/instance/restore` | `POST` | 恢复企业微信实例(自动登录) |
| `changeWeworkInstanceStatus` | `/ai/wework/instance/changeStatus` | `PUT` | 修改实例状态 |
| `getWeworkLoginQrcode` | `/ai/wework/qrcode/getLoginQrcode` | `POST` | 获取登录二维码 |
| `restoreAndGetLoginQrcode` | `/ai/wework/qrcode/restoreAndGetLoginQrcode` | `POST` | 恢复实例并获取登录二维码（统一登录接口，后端自动处理恢复和免扫码登录） |
| `checkWeworkLoginQrcode` | `/ai/wework/qrcode/checkLoginQrcode` | `POST` | 检测登录二维码状态 |
| `verifyWeworkLoginQrcode` | `/ai/wework/qrcode/verifyLoginQrcode` | `POST` | 验证登录验证码 |
| `manualWeworkLogin` | `/ai/wework/qrcode/manualLogin` | `POST` | 免扫码登录 |
| `checkWeworkUserLogin` | `/ai/wework/qrcode/checkLogin` | `POST` | 用户状态检查 |
| `stopWeworkInstance` | `/ai/wework/instance/stop/` | `POST` | 停止实例 |
| `deleteWeworkInstance` | `/ai/wework/instance/` | `DELETE` | 删除实例 |
| `bindWeworkAgent` | `/ai/wework/instance/bind-agent` | `POST` | 绑定智能体 |
| `unbindWeworkAgent` | `/ai/wework/instance/bind-agent` | `POST` | 解绑智能体 |
| `setDefaultQrcode` | `/ai/wework/instance/set-default-qrcode/` | `POST` | 设置默认实例 |
| `cancelDefaultQrcode` | `/ai/wework/instance/cancel-default-qrcode/` | `POST` | 取消默认实例 |
| `getExternalContactList` | `/ai/wework/contact/external/list` | `POST` | 查询外部联系人列表 |
| `getInternalContactList` | `/ai/wework/contact/internal/list` | `POST` | 查询内部联系人列表 |
| `batchGetContactInfo` | `/ai/wework/contact/batch/info` | `POST` | 批量获取联系人详情 |
| `listCustomerService` | `/ai/wework/customer-service/list` | `GET` | 查询客服列表 |
| `listAvailableCustomerService` | `/ai/wework/customer-service/available` | `GET` | 查询可用客服列表 |
| `getCustomerService` | `/ai/wework/customer-service/` | `GET` | 获取客服详情 |
| `addCustomerService` | `/ai/wework/customer-service` | `POST` | 创建客服 |
| `updateCustomerService` | `/ai/wework/customer-service` | `PUT` | 更新客服信息 |
| `delCustomerService` | `/ai/wework/customer-service/` | `DELETE` | 删除客服 |
| `changeCustomerServiceEnabled` | `/ai/wework/customer-service/` | `PUT` | 启用/禁用客服 |
| `changeCustomerServiceStatus` | `/ai/wework/customer-service/` | `PUT` | 更新客服在线状态 |
| `resetCustomerServiceSessions` | `/ai/wework/customer-service/` | `PUT` | 重置客服接待数 |
| `updateWeworkConfig` | `/ai/wework/instance/update-config` | `POST` | 更新实例配置（自动通过好友、欢迎语等） |

### ai/wwMiniprogramConfig.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listMiniprogramConfigs` | `/ai/wework/miniprogram/list` | `GET` | 获取小程序配置列表 |
| `getMiniprogramConfig` | `/ai/wework/miniprogram/${code}` | `GET` | 根据编码获取小程序配置 |
| `addMiniprogramConfig` | `/ai/wework/miniprogram` | `POST` | 新增小程序配置 |
| `updateMiniprogramConfig` | `/ai/wework/miniprogram` | `PUT` | 修改小程序配置 |
| `delMiniprogramConfig` | `/ai/wework/miniprogram/${id}` | `DELETE` | 删除小程序配置 |
| `updateMiniprogramStatus` | `/ai/wework/miniprogram/${id}/status/${status}` | `PUT` | 更新小程序配置状态 |

## 配置管理 (config)

### config/maternitySuite.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `addConfig` | `/platform/suite/save` | `POST` | 月子套房配置 |

## 客户管理 (crm)

### crm/customerOrder.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getContractPage` | `/mp/customer_track/contract_page` | `GET` | 分页查询签约/订单列表 |
| `getContractList` | `/mp/customer_track/contract_list` | `GET` | 查询签约列表（不分页） |
| `getContractDetail` | `/mp/customer_track/contract_detail` | `GET` | 查询签约详情 |
| `orderEntry` | `/mp/customer_track/orderEntry` | `POST` | 订单录入 |
| `updateOrder` | `/mp/customer_track/updateOrder` | `POST` | 订单修改 |
| `cancelOrder` | `/mp/customer_track/cancelOrder` | `GET` | 取消订单 |
| `getOrderDetail` | `/mp/customer_track/getOrderDetail` | `GET` | 获取订单详情（通过客户id） |
| `collectContractPayment` | `/mp/customer_track/collectContractPayment` | `POST` | 收取合同金 |
| `extensionOrder` | `/mp/customer_track/extensionOrder` | `POST` | 订单延期 |
| `exportOrder` | `/mp/customer_track/exportOrder` | `POST` | 导出订单 |
| `getContractStats` | `/mp/customer_track/contract_stats` | `GET` | 订单统计 |
| `getPackageList` | `/mp/package/list` | `GET` | 获取套餐列表 |

### crm/customerTrack.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getLeadStats` | `/mp/customer_track/lead_stats` | `GET` | 客户线索统计 |
| `getMyStats` | `/mp/customer_track/my_stats` | `GET` | 我的客户统计 |
| `getCustomerPage` | `/mp/customer_track/page` | `GET` | 分页查询客户列表 |
| `getCustomerDetail` | `/mp/customer_track/customer_detail` | `GET` | 查询客户详情 |
| `createCustomer` | `/mp/customer_track/create_customer` | `POST` | 新增客户 |
| `updateDetail` | `/mp/customer_track/update_detail` | `POST` | 修改客户详情 |
| `deleteCustomer` | `/mp/customer_track/delete` | `GET` | 删除客户 |
| `customerOperate` | `/mp/customer_track/customer_operate` | `POST` | 跟进客户 |
| `getFollowedLogs` | `/mp/customer_track/followed_logs` | `GET` | 分页查询跟进记录 |
| `confirmArrivedAtStore` | `/mp/customer_track/confirmArrivedAtStore` | `GET` | 确认到店 |
| `transfer` | `/mp/customer_track/transfer` | `POST` | 转移客户 |
| `getSeasPage` | `/mp/customer_track/seasPage` | `GET` | 公海分页查询 |
| `getSeasTotal` | `/mp/customer_track/seasTotal` | `GET` | 公海数量统计 |
| `allocationCustomer` | `/mp/customer_track/allocationCustomer` | `POST` | 客户分配 |
| `refundSeas` | `/mp/customer_track/refundSeas` | `GET` | 退回公海 |
| `getTags` | `/mp/customer_track/tags` | `GET` | 查询客户标签列表 |
| `getUserPage` | `/mp/customer_track/user_page` | `GET` | 分页查询销售员列表 |
| `getSourceList` | `/mp/customer_track/customer_source_list` | `GET` | 查询客户来源列表 |
| `getNotificationList` | `/mp/customer_track/notification_list` | `GET` | 查询消息通知列表 |
| `exportCustomer` | `/mp/customer_track/export` | `POST` | 导出客资 |
| `getCustomerSalesStats` | `/mp/customer_track/getCustomerSalesStats` | `GET` | 查询每个销售员的客户统计 |
| `createReminder` | `/mp/customer_track/create_reminder` | `POST` | 创建提醒事项 |
| `getAssignmentStats` | `/mp/customer_track/getAssignmentStats` | `GET` | 获取分配统计 |

### crm/roomStatus.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getRoomStatus` | `/mp/room/status` | `GET` | 查询房间入住状态（网格视图） |
| `getRoomOccupationRange` | `/mp/room/occupation_range` | `GET` | 查询房间排房数据（甘特图视图） |
| `getRoomStatusStats` | `/mp/room/status_number` | `GET` | 查询房间入住状态数量统计 |
| `getSuiteStatus` | `/mp/room/suiteStatus` | `GET` | 查询房型占用情况 |
| `getSuitesList` | `/mp/room/suites_list` | `GET` | 查询房型列表（套餐） |
| `getRoomList` | `/mp/room/list` | `GET` | 查询房间列表 |

## 邀请模块 (invitation)

### invitation/barrage.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/card_message_model/list` | `GET` | - |
| `save` | `/platform/card_message_model/save` | `PUT` | 添加 |
| `delTable` | `/platform/card_message_model/` | `DELETE` | 删除 |

### invitation/copywriter.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/baby/template/page` | `GET` | - |
| `list` | `/platform/baby/template/getList` | `GET` | - |
| `save` | `/platform/baby/template/create` | `POST` | 添加 |
| `delTable` | `/platform/baby/template/` | `DELETE` | 删除 |
| `info` | `/platform/baby/template/info/` | `GET` | 详情 |
| `update` | `/platform/baby/template/update` | `POST` | 修改 |

### invitation/helpcenter.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/help-center/page` | `GET` | - |
| `save` | `/platform/help-center/save` | `POST` | 添加 |
| `delTable` | `/platform/help-center/delete/` | `DELETE` | 删除 |
| `info` | `/platform/help-center/info/` | `GET` | 详情 |
| `update` | `/platform/help-center/update` | `PUT` | 修改 |

### invitation/invitationEvent.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/invitation_activity/page` | `GET` | - |
| `save` | `/platform/invitation_activity/save` | `POST` | 添加 |
| `update` | `/platform/invitation_activity/update` | `POST` | 修改 |
| `getinfo` | `/platform/invitation_activity/detail/` | `GET` | 查询详情 |
| `delTable` | `/platform/invitation_activity/remove?ids=` | `DELETE` | 删除 |

## 公共接口 (common)

### login.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `login` | `/auth/login` | `Unknown Method` | 登录方法 |
| `register` | `/register` | `POST` | 注册方法 |
| `getInfo` | `/system/user/getInfo` | `GET` | 获取用户详细信息 |
| `logout` | `/auth/logout` | `POST` | 退出方法 |
| `getCodeImg` | `/auth/code` | `GET` | 获取验证码 |

### menu.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getRouters` | `/system/menu/getRouters` | `GET` | 获取路由 |

## 系统监控 (monitor)

### monitor/cache.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getCache` | `/monitor/cache` | `GET` | 查询缓存详细 |
| `listCacheName` | `/monitor/cache/getNames` | `GET` | 查询缓存名称列表 |
| `listCacheKey` | `/monitor/cache/getKeys/` | `GET` | 查询缓存键名列表 |
| `getCacheValue` | `/monitor/cache/getValue/` | `GET` | 查询缓存内容 |
| `clearCacheName` | `/monitor/cache/clearCacheName/` | `DELETE` | 清理指定名称缓存 |
| `clearCacheKey` | `/monitor/cache/clearCacheKey/` | `DELETE` | 清理指定键名缓存 |
| `clearCacheAll` | `/monitor/cache/clearCacheAll` | `DELETE` | 清理全部缓存 |

### monitor/job.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listJob` | `/monitor/job/list` | `GET` | 查询定时任务调度列表 |
| `getJob` | `/monitor/job/` | `GET` | 查询定时任务调度详细 |
| `addJob` | `/monitor/job` | `POST` | 新增定时任务调度 |
| `updateJob` | `/monitor/job` | `PUT` | 修改定时任务调度 |
| `delJob` | `/monitor/job/` | `DELETE` | 删除定时任务调度 |
| `changeJobStatus` | `/monitor/job/changeStatus` | `PUT` | 任务状态修改 |
| `runJob` | `/monitor/job/run` | `PUT` | 定时任务立即执行一次 |

### monitor/jobLog.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listJobLog` | `/monitor/jobLog/list` | `GET` | 查询调度日志列表 |
| `delJobLog` | `/monitor/jobLog/` | `DELETE` | 删除调度日志 |
| `cleanJobLog` | `/monitor/jobLog/clean` | `DELETE` | 清空调度日志 |

### monitor/logininfor.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `list` | `/monitor/logininfor/list` | `GET` | 查询登录日志列表 |
| `delLogininfor` | `/monitor/logininfor/` | `DELETE` | 删除登录日志 |
| `unlockLogininfor` | `/monitor/logininfor/unlock/` | `GET` | 解锁用户登录状态 |
| `cleanLogininfor` | `/monitor/logininfor/clean` | `DELETE` | 清空登录日志 |

### monitor/online.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `list` | `/monitor/online/list` | `GET` | 查询在线用户列表 |
| `forceLogout` | `/monitor/online/` | `DELETE` | 强退用户 |

### monitor/operlog.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `list` | `/monitor/operlog/list` | `GET` | 查询操作日志列表 |
| `delOperlog` | `/monitor/operlog/` | `DELETE` | 删除操作日志 |
| `cleanOperlog` | `/monitor/operlog/clean` | `DELETE` | 清空操作日志 |

### monitor/server.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getServer` | `/monitor/server` | `GET` | 获取服务信息 |

## 新版小程序 (newminiprogram)

### newminiprogram/basicinformation.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/tk/enterprise/list` | `GET` | - |
| `save` | `/platform/tk/enterprise` | `POST` | 添加 |
| `update` | `/platform/tk/enterprise` | `PUT` | 修改 |

### newminiprogram/businessmovement.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/help-center/page` | `GET` | - |
| `save` | `/platform/help-center/save` | `POST` | 添加 |
| `delTable` | `/platform/help-center/delete/` | `DELETE` | 删除 |
| `info` | `/platform/help-center/info/` | `GET` | 详情 |
| `update` | `/platform/help-center/update` | `PUT` | 修改 |

### newminiprogram/clientevaluation.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/help-center/page` | `GET` | - |
| `save` | `/platform/help-center/save` | `POST` | 添加 |
| `delTable` | `/platform/help-center/delete/` | `DELETE` | 删除 |
| `info` | `/platform/help-center/info/` | `GET` | 详情 |
| `update` | `/platform/help-center/update` | `PUT` | 修改 |

### newminiprogram/officialAccounts.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/help-center/page` | `GET` | - |
| `save` | `/platform/help-center/save` | `POST` | 添加 |
| `delTable` | `/platform/help-center/delete/` | `DELETE` | 删除 |
| `info` | `/platform/help-center/info/` | `GET` | 详情 |
| `update` | `/platform/help-center/update` | `PUT` | 修改 |

### newminiprogram/productPresentation.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/tk/productIntro/list` | `GET` | - |
| `save` | `/platform/tk/productIntro` | `POST` | 添加 |
| `update` | `/platform/tk/productIntro` | `PUT` | 修改 |
| `delTable` | `/platform/tk/productIntro/` | `DELETE` | 删除 |
| `info` | `/platform/tk/productIntro/` | `GET` | 详情 |

### newminiprogram/servicecase.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/tk/successCase/list` | `GET` | - |
| `save` | `/platform/tk/successCase` | `POST` | 添加 |
| `delTable` | `/platform/tk/successCase/` | `DELETE` | 删除 |
| `info` | `/platform/tk/successCase/` | `GET` | 详情 |
| `update` | `/platform/tk/successCase` | `PUT` | 修改 |

### newminiprogram/serviceinformation.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/tk/service/list` | `GET` | - |
| `save` | `/platform/tk/service` | `POST` | 添加 |
| `update` | `/platform/tk/service` | `PUT` | 修改 |
| `delTable` | `/platform/tk/service/` | `DELETE` | 删除 |
| `info` | `/platform/tk/service/` | `GET` | 详情 |

### newminiprogram/teamInformation.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/tk/companyNews/list` | `GET` | - |
| `save` | `/platform/tk/companyNews/add` | `POST` | 添加 |
| `delTable` | `/platform/tk/companyNews/` | `DELETE` | 删除 |
| `info` | `/platform/tk/companyNews/` | `GET` | 详情 |
| `update` | `/platform/tk/companyNews/update` | `PUT` | 修改 |

### newminiprogram/teamdailyroutine.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/tk/case/list` | `GET` | - |
| `save` | `/platform/tk/case` | `POST` | 添加 |
| `delTable` | `/platform/tk/case/` | `DELETE` | 删除 |
| `info` | `/platform/tk/case/` | `GET` | 详情 |
| `update` | `/platform/tk/case` | `PUT` | 修改 |
| `videoFirstFrame` | `/common/videoFirstFrame` | `GET` | 获取视频第一帧 |

## 平台管理 (platform)

### platform/Invitationgift.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/gift/page` | `GET` | - |
| `save` | `/platform/gift/save` | `PUT` | 添加 |
| `update` | `/platform/gift/update` | `POST` | 修改 |
| `delTable` | `/platform/gift/` | `DELETE` | 删除 |
| `info` | `/platform/gift/info/` | `GET` | 移除用户角色 |
| `online` | `/platform/gift/online/${query.giftId}/${query.status}` | `POST` | 请帖礼物上架&下架 |

### platform/basicInformation.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/package/getGoodsBasicInfo` | `GET` | - |
| `save` | `/platform/package` | `POST` | 添加 |

### platform/birthdayReminder.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `list` | `/platform/customer/birthday_list/` | `GET` | 查询 |

### platform/checkManagement.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/checkin_gifts/page` | `GET` | - |
| `save` | `/platform/checkin_gifts/save` | `PUT` | 添加 |
| `delTable` | `/platform/checkin_gifts/` | `DELETE` | 删除表数据 |
| `info` | `/platform/checkin_gifts/info/` | `GET` | 查询信息 |
| `update` | `/platform/checkin_gifts/update` | `POST` | 修改 |
| `online` | `/platform/checkin_gifts/change/${query.status}/${query.giftId}` | `POST` | 上下架 |

### platform/club.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `queryClubInfo` | `/platform/club/info` | `GET` | 查询 |

### platform/clubActivity.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/club_activity/page` | `GET` | - |
| `save` | `/platform/club_activity/save` | `POST` | - |
| `detail` | `/platform/club_activity/detail/` | `GET` | - |
| `remove` | `/platform/club_activity/remove?activityIds=` | `DELETE` | - |
| `update` | `/platform/club_activity/update` | `POST` | - |
| `isDisabled` | `/platform/club_activity/isDisabled/` | `GET` | - |

### platform/clubhouseFacilities.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `save` | `/platform/club_facilities/save` | `PUT` | 添加 |
| `info` | `/platform/club_facilities/list` | `GET` | 查询 |

### platform/clueHighSeas.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/customer_track/page` | `GET` | 查询 |
| `userPage` | `/platform/customer_track/user_page` | `GET` | 分页查询销售员列表 |
| `followedLogs` | `/platform/customer_track/followed_logs` | `GET` | 分页查询跟进记录列表 |
| `operationLogs` | `/platform/customer_track/operation_logs` | `GET` | 分页查询操作记录列表 |
| `save` | `/platform/customer_track/create_customer` | `POST` | 添加 |
| `customer` | `/platform/customer_track/customer_follow_up` | `POST` | 跟进 |
| `assignLead` | `/platform/customer_track/assign_lead` | `POST` | 分配 |
| `changeTag` | `/platform/customer_track/change_tag` | `POST` | 更改标签 |

### platform/cmsDefualt.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/default_node/page` | `GET` | - |
| `add` | `/platform/default_node/add` | `POST` | 添加 |
| `detail` | `/platform/default_node/detail/` | `GET` | 详情 |
| `update` | `/platform/default_node/update` | `PUT` | 修改节点 |
| `remove_node` | `/platform/default_node/` | `DELETE` | 删除节点 |
| `customer_page` | `/platform/default_customer/page` | `GET` | 客户列表 |
| `customer_add` | `/platform/default_customer/add` | `POST` | 添加客户 |
| `customer_detail` | `/platform/default_customer/detail/` | `GET` | 客户详情 |
| `customer_update` | `/platform/default_customer/update` | `PUT` | 修改客户 |
| `customer_remove` | `/platform/default_customer/` | `DELETE` | 删除客户 |
| `staff_page` | `/platform/default_staff/page` | `GET` | 员工列表 |
| `get_staff_customer_list` | `/platform/default_staff/customers_staff_list/` | `GET` | 获取员工客户列表 |
| `staff_add` | `/platform/default_staff/add` | `POST` | 添加员工 |
| `staff_detail` | `/platform/default_staff/detail/` | `GET` | 员工详情 |
| `staff_update` | `/platform/default_staff/update` | `PUT` | 修改员工 |
| `staff_remove` | `/platform/default_staff/` | `DELETE` | 删除员工 |
| `feedpost_add` | `/platform/default_feed_post/add` | `POST` | 添加动态 |
| `get_feedpost_page` | `/platform/default_feed_post/page` | `GET` | 获取动态列表 |
| `feddpost_detail` | `/platform/default_feed_post/detail/` | `GET` | 获取动态详情 |
| `feddpost_update` | `/platform/default_feed_post/update` | `PUT` | 获取动态详情 |
| `feedpost_remove` | `/platform/default_feed_post/` | `DELETE` | 删除动态 |

### platform/commentManagement.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/review/list` | `GET` | - |
| `replies` | `/platform/review/replies` | `POST` | 回复评价 |
| `delTable` | `/platform/review/remove/` | `DELETE` | 删除评价 |
| `remove` | `/platform/review/remove_replies/` | `DELETE` | 删除回复 |

### platform/communityReview.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `list` | `/platform/community/list` | `GET` | - |
| `delTable` | `/platform/community/post?postIds=` | `DELETE` | 删除动态 |
| `options` | `/platform/topic/options` | `GET` | 话题下拉查询 |

### platform/contractGift.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/contract_gift/page` | `GET` | - |
| `save` | `/platform/contract_gift/save` | `PUT` | 添加 |
| `info` | `/platform/contract_gift/info/` | `GET` | 查询信息 |
| `update` | `/platform/contract_gift/update` | `POST` | 修改 |

### platform/customer.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getCustomerOptions` | `/platform/customer/options` | `GET` | 获取客户下拉选项 |

### platform/customerManagement.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/cs/agent/page` | `GET` | - |
| `save` | `/cs/agent/create` | `POST` | 添加 |
| `delTable` | `/cs/agent/delete/` | `DELETE` | 删除 |
| `queryUserCustomer` | `/platform/customerService/queryUserCustomer` | `GET` | - |
| `assignUserRole` | `/platform/wechat_user/user-roles/assign` | `POST` | 为用户分配角色 |
| `removeUserRole` | `/platform/wechat_user/user-roles/remove/${userId}/${roleId}` | `DELETE` | 移除用户角色 |

### platform/discountPackage.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/package/page` | `GET` | 列表 |
| `save` | `/platform/package/save` | `PUT` | 添加 |
| `delTable` | `/platform/package/` | `DELETE` | 删除表数据 |
| `info` | `/platform/package/info/` | `GET` | 查询 |
| `online` | `/platform/package/online/${query.packageId}/${query.status}` | `POST` | 上下架 |
| `update` | `/platform/package/update` | `POST` | 修改 |
| `homepage` | `/platform/package/homepage/${query.packageId}/${query.status}` | `POST` | 改变优惠套餐主页显示状态 |
| `houseList` | `/platform/suite/page` | `GET` | 房型列表 |
| `usePage` | `/platform/supplies/page` | `GET` | 宝宝，妈妈用品列表 |
| `nursePage` | `/platform/nursing_project/page` | `GET` | 宝宝，妈妈护理列表 |

### platform/distributionService.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/product_delivery/page` | `GET` | - |
| `save` | `/platform/product_delivery/save` | `PUT` | 添加 |
| `delTable` | `/platform/product_delivery/` | `DELETE` | 删除表数据 |
| `info` | `/platform/product_delivery/info/` | `GET` | 查询信息 |
| `update` | `/platform/product_delivery/update` | `POST` | 修改 |

### platform/dynamicStyle.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/styleDynamic/page` | `GET` | 分页查询样式列表 |
| `save` | `/platform/styleDynamic/save` | `POST` | 添加 |
| `delTable` | `/platform/styleDynamic/remove?id=` | `GET` | 删除表数据 |
| `info` | `/platform/templateDynamic/info/` | `GET` | 查询 |

### platform/dynamicTemplate.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/templateDynamic/page` | `GET` | 分页模板节点列表 |
| `save` | `/platform/templateDynamic/save` | `POST` | 添加 |
| `delTable` | `/platform/templateDynamic/remove?id=` | `GET` | 删除表数据 |
| `info` | `/platform/templateDynamic/info/` | `GET` | 查询 |
| `listByType` | `/platform/task_node/listByType` | `POST` | 查询 |
| `templateStyle` | `/platform/template_style/list` | `GET` | 获取所有模板风格 |
| `templateStyleAdd` | `/platform/template_style/save` | `PUT` | 新增模板风格 |

### platform/employee.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `createEmployee` | `/platform/employee/save` | `POST` | 新增员工 |
| `updateEmployee` | `/platform/employee/update` | `POST` | 修改员工 |
| `page` | `/platform/employee/page` | `GET` | 查询员工列表 |
| `list` | `/platform/employee/list` | `GET` | 查询员工列表 |
| `getPostList` | `/platform/employee_post/options` | `GET` | 查询员工岗位列表 |
| `getRoleList` | `/platform/employee/role_list` | `GET` | 查询角色列表 |
| `remove` | `/platform/employee/remove/${id}` | `DELETE` | 删除员工 |
| `disable` | `/platform/employee/disable/${id}/${disable}` | `POST` | 禁用员工 |
| `resetPassword` | `/platform/employee/reset_password` | `POST` | 重置密码 |
| `bindEmployee` | `/platform/staff/bind_employee` | `POST` | 绑定用户 |
| `detail` | `/platform/employee/detail/${id}` | `GET` | 查询员工详情 |

### platform/employeePost.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `create` | `/platform/employee_post/save` | `POST` | 新增员工职位 |
| `update` | `/platform/employee_post/update` | `POST` | 修改员工职位 |
| `detail` | `/platform/employee_post/detail/${id}` | `GET` | 获取职位详情 |
| `page` | `/platform/employee_post/page` | `GET` | 查询员工职位列表 |

### platform/feedPost.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/styleDynamic/page` | `GET` | 分页查询样式列表 |
| `update` | `/platform/styleDynamic/save` | `POST` | 创建员工朋友圈动态 |
| `queryPage` | `/platform/feed_post/page` | `GET` | 分页查询朋友圈动态列表 |
| `queryInfo` | `/platform/feed_post/${postId}` | `GET` | 查询朋友圈动态详情 |
| `getDetail` | `/platform/feed_post/detail/${postId}` | `GET` | 查询朋友圈动态详情 |
| `queryStaffFeedPostInfo` | `/platform/feed_post/info_staff/${postId}` | `GET` | 查询员工朋友圈动态详情 |
| `getInfoByCustomerOrClub` | `/platform/feed_post/info_customer_or_club/${postId}` | `GET` | 查询客户或者会所朋友圈动态详情 |
| `createClubPost` | `/platform/feed_post/create_club` | `POST` | 创建员工朋友圈动态 |
| `updateFeedPost` | `/platform/feed_post/update` | `POST` | 修改动态 |
| `updateStaffFeedPost` | `/platform/feed_post/update_staff_feed_post` | `PUT` | 修改员工朋友圈动态 |
| `featuredFeedPost` | `/platform/feed_post/featured/${postId}/${featuredStatus}` | `POST` | 更改动态精选状态 |
| `removeFeedPost` | `/platform/feed_post/${postId}` | `DELETE` | 删除朋友圈动态 |
| `getStaffCustomerOptions` | `/platform/room/customer_options?staffUserId=${staffUserId}` | `GET` | 查询员工已经服务的客户下拉列表 |
| `create` | `/platform/feed_post/create` | `POST` | 创建客户或者会所朋友圈动态 |
| `updateCustomerOrClubFeedPost` | `/platform/feed_post/update_customer_or_club_feed_post` | `PUT` | 修改客户或会所朋友圈动态 |
| `getQueryStaffName` | `/platform/feed_post/queryStaffName/${roleName}` | `GET` | 通过角色获取人员名称 |
| `getQueryRooms` | `/platform/feed_post/queryRooms/${userId}` | `GET` | 通过人员获取方房间 |
| `listByType` | `/platform/feed_post/listByType` | `POST` | 通过类型与角色查询标签列表 |
| `listByLabel` | `/platform/feed_post/listByLabel/${name}` | `GET` | 通过标签名称查询模板 |

### platform/feedPostTemplate.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getTemplateByNodeId` | `/platform/templateDynamic/getTemplateByNodeId?nodeId=${nodeId}` | `GET` | 根据节点id查询动态模版 |

### platform/feedback.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `queryPage` | `/platform/room_feedback/page` | `GET` | 分页查询房间反馈列表 |
| `queryReplyList` | `/platform/room_feedback/reply_list/${feedbackId}` | `GET` | 查询房间反馈回复列表 |
| `createRoomFeedback` | `/platform/room_feedback/create` | `POST` | 创建房间反馈 |

### platform/index.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `totalVisit` | `/platform/behaviour_stats/total_visit` | `GET` | - |
| `birthdayList` | `/platform/customer/birthday_list` | `GET` | - |
| `totalList` | `/platform/behaviour_stats/total` | `GET` | - |
| `analysePage` | `/platform/behaviour_stats/analyse_page` | `GET` | - |
| `userList` | `/platform/behaviour_stats/user` | `GET` | - |
| `detailVisit` | `/platform/behaviour_stats/detail_visit` | `GET` | - |
| `statsModule` | `/platform/behaviour_stats/module` | `GET` | - |
| `moduleOne` | `/platform/behaviour_stats/module_one` | `GET` | - |
| `moduleOneDay` | `/platform/behaviour_stats/module_one_day` | `GET` | - |
| `statsDue` | `/platform/behaviour_stats/due` | `GET` | - |
| `dueList` | `/platform/behaviour_stats/due_list` | `GET` | - |
| `newStats` | `/platform/review/new_stats` | `GET` | - |
| `getInvitationStatistics` | `/platform/event_tracking_invitation/getInvitationStatistics` | `POST` | - |
| `getMerchantInvitationRanking` | `/platform/event_tracking_invitation/getMerchantInvitationRanking` | `GET` | - |
| `getInvitationRanking` | `/platform/event_tracking_invitation/getInvitationRanking` | `GET` | - |
| `queryOptions` | `/system/tenant/options` | `GET` | 查询租户下拉选项列表 |

### platform/indexConfig.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `merchants` | `/platform/club/info/merchants` | `GET` | - |
| `save` | `/platform/club/save` | `PUT` | 新增会所基本信息 |
| `update` | `/platform/club/update` | `POST` | 修改会所基本信息 |
| `info` | `/platform/club/info` | `GET` | 查询查询会所信息 |

### platform/informationCenter.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/customer/page` | `GET` | 列表 |
| `save` | `/platform/customer/save` | `PUT` | 添加 |
| `info` | `/platform/customer/info/` | `GET` | 查询 |
| `update` | `/platform/customer/update` | `POST` | 修改 |

### platform/invitationfeedback.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/card_feedback/page` | `GET` | 请帖反馈 |
| `delTable` | `/platform/card_feedback/` | `DELETE` | 删除表数据 |

### platform/labelManagement.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/customer_tag/page` | `GET` | - |
| `save` | `/platform/customer_tag/save` | `PUT` | 添加 |
| `delTable` | `/platform/customer_tag/` | `DELETE` | 删除 |
| `info` | `/platform/customer_tag/detail/` | `GET` | 查询信息 |
| `update` | `/platform/customer_tag/update` | `POST` | 修改 |
| `updateConsultation` | `/platform/customer_tag/update_consultation` | `POST` | 更改详细咨询 |
| `getConsultation` | `/platform/customer_tag/get_consultation` | `POST` | 查询详细咨询 |

### platform/menuConfig.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `menuGroupPage` | `/platform/menu_group/page` | `GET` | 分页查询菜单分组 |
| `menuGroupDetail` | `/platform/menu_group/detail/` | `GET` | 查询分组详情 |
| `menuGroupSave` | `/platform/menu_group/save` | `POST` | 新增菜单分组 |
| `menuGroupUpdate` | `/platform/menu_group/update` | `POST` | 修改菜单分组 |
| `menuGroupRemove` | `/platform/menu_group/remove` | `DELETE` | 删除菜单分组 |
| `menuGroupToggle` | `/platform/menu_group/toggle/` | `GET` | 切换分组启用/禁用 |
| `menuItemPage` | `/platform/menu_item/page` | `GET` | 分页查询菜单项 |
| `menuItemDetail` | `/platform/menu_item/detail/` | `GET` | 查询菜单项详情 |
| `menuItemSave` | `/platform/menu_item/save` | `POST` | 新增菜单项 |
| `menuItemUpdate` | `/platform/menu_item/update` | `POST` | 修改菜单项 |
| `menuItemRemove` | `/platform/menu_item/remove` | `DELETE` | 删除菜单项 |
| `menuItemToggle` | `/platform/menu_item/toggle/` | `GET` | 切换菜单项启用/禁用 |

### platform/merchant.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/merchant/page` | `GET` | 查询入驻申请列表 |
| `detail` | `/platform/merchant/detail/` | `GET` | 查询入驻申请详情 |
| `audit` | `/platform/merchant/audit` | `POST` | 审核商家入驻申请 |

### platform/mobileMatron.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/mobile_nanny/page` | `GET` | - |
| `save` | `/platform/mobile_nanny/save` | `PUT` | 添加 |
| `delTable` | `/platform/mobile_nanny/` | `DELETE` | 删除表数据 |
| `info` | `/platform/mobile_nanny/info/` | `GET` | 查询信息 |
| `update` | `/platform/mobile_nanny/update` | `POST` | 修改 |

### platform/mommyvideo.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/tk/case/list` | `GET` | - |
| `save` | `/platform/tk/case` | `POST` | 添加 |
| `delTable` | `/platform/tk/case/` | `DELETE` | 删除 |
| `info` | `/platform/tk/case/` | `GET` | 详情 |
| `update` | `/platform/tk/case` | `PUT` | 修改 |
| `videoFirstFrame` | `/common/videoFirstFrame` | `GET` | 获取视频第一帧 |

### platform/monthlyDiet.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `saves` | `/platform/meal/saveOrUpdate` | `POST` | 添加 |
| `infos` | `/platform/meal/info/merchants` | `GET` | 查询 |
| `mealPage` | `/platform/meal/page` | `GET` | 分页查询月子膳食列表 |
| `getItemDetail` | `/platform/meal/itemDetail?itemId=` | `GET` | 获取菜品详情 |
| `deleteItem` | `/platform/meal/deleteItem?itemId=` | `GET` | 删除菜品 |
| `saveItem` | `/platform/meal/saveItem` | `POST` | 添加修改 |
| `isRec` | `/platform/meal/isRec?itemId=` | `GET` | 是否推荐 |
| `isMealTags` | `/platform/meal/isMealTags?mealId=` | `GET` | 是否启用膳食图片 |

### platform/nodeDeployment.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/task_node/page` | `GET` | - |
| `save` | `/platform/task_node/save` | `POST` | 添加 |
| `delTable` | `/platform/task_node/` | `DELETE` | 删除 |
| `update` | `/platform/task_node/update` | `PUT` | 修改 |
| `getNodeOptions` | `/platform/task_node/options` | `GET` | - |
| `changeFeatured` | `/platform/task_node/changeFeatured` | `POST` | 更改节点精选状态 |

### platform/nursingProject.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/nursing_project/page` | `GET` | 列表 |
| `save1` | `/platform/nursing_project/save_mama` | `PUT` | 新增妈妈 |
| `save2` | `/platform/nursing_project/save_baby` | `PUT` | 新增宝宝 |
| `delTable` | `/platform/nursing_project/` | `DELETE` | 删除表数据 |
| `update` | `/platform/nursing_project/update` | `POST` | - |

### platform/nursingStaff.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/staff/page` | `GET` | - |
| `save` | `/platform/staff/save` | `PUT` | 添加 |
| `delTable` | `/platform/staff/` | `DELETE` | 删除表数据 |
| `info` | `/platform/staff/info/` | `GET` | 查询信息 |
| `update` | `/platform/staff/update` | `POST` | 修改 |
| `homepage` | `/platform/staff/homepage/${data.staffId}/${data.status}` | `POST` | 改变护理人员主页显示状态 |
| `queryStaffList` | `/platform/staff/list` | `GET` | 查询护理人员列表 |

### platform/permission.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getPermissionPage` | `/platform/wechat/perms/page` | `GET` | 分页查询权限列表 |
| `getPermissionList` | `/platform/wechat/perms/list` | `GET` | 查询所有权限列表（用于下拉选择） |
| `createPermission` | `/platform/wechat/perms/save` | `POST` | 新增权限 |
| `updatePermission` | `/platform/wechat/perms/update` | `PUT` | 修改权限 |
| `deletePermission` | `/platform/wechat/perms/remove/${permsId}` | `DELETE` | 删除权限 |
| `getPermissionDetail` | `/platform/wechat/perms/info/${permsId}` | `GET` | 获取权限详情 |

### platform/postBirth.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/postpartum_recovery/page` | `GET` | 列表 |
| `save` | `/platform/postpartum_recovery/save ` | `PUT` | 新增 |
| `delTable` | `/platform/postpartum_recovery/` | `DELETE` | 删除表数据 |
| `online` | `/platform/postpartum_recovery/onShelf/${query.id}/${query.status}` | `POST` | 产后康复项目上架&下架 |
| `info` | `/platform/postpartum_recovery/info/` | `GET` | 查询产后康复项目信息 |
| `update` | `/platform/postpartum_recovery/update` | `POST` | 修改产后康复 |
| `homepage` | `/platform/postpartum_recovery/homepage/${data.projectId}/${data.status}` | `POST` | 改变产后康复项目主页显示状态 |

### platform/pregnancyAssistant.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/pregnancy_tracker/page` | `GET` | - |
| `save` | `/platform/pregnancy_tracker` | `POST` | 添加 |
| `delTable` | `/platform/pregnancy_tracker/` | `DELETE` | 删除表数据 |
| `info` | `/platform/pregnancy_tracker/` | `GET` | 查询信息 |
| `update` | `/platform/pregnancy_tracker` | `PUT` | 修改 |

### platform/public.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `giftList` | `/platform/contract_gift/list` | `GET` | - |

### platform/questionsConfiguration.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/question/page` | `GET` | - |
| `save` | `/platform/question/save` | `PUT` | 添加 |
| `delTable` | `/platform/question/` | `DELETE` | 删除 |
| `homepage` | `/platform/question/change/${query.state}/${query.questionId}` | `PUT` | 更改问题显示状态 |

### platform/recoveryProject.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/nursing_project/page` | `GET` | 列表 |
| `save` | `/platform/nursing_project/save_ck` | `PUT` | 新增 |
| `delTable` | `/platform/nursing_project/` | `DELETE` | 删除表数据 |
| `update` | `/platform/nursing_project/update` | `POST` | - |

### platform/role.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getRolePage` | `/platform/wechat/role/page` | `GET` | 分页查询角色列表 |
| `getRoleList` | `/platform/wechat/role/list` | `GET` | 查询所有角色列表（用于下拉选择） |
| `createRole` | `/platform/wechat/role/save` | `POST` | 新增角色 |
| `updateRole` | `/platform/wechat/role/update` | `PUT` | 修改角色 |
| `deleteRole` | `/platform/wechat/role/remove/${roleId}` | `DELETE` | 删除角色 |
| `getRoleDetail` | `/platform/wechat/role/info/${roleId}` | `GET` | 获取角色详情 |
| `getEmployeeRoleList` | `/platform/employee/role_list` | `GET` | 查询平台员工角色列表（保留原有接口） |
| `assignRolePermissions` | `/platform/wechat/role/assign-perms` | `POST` | 为角色分配权限 |
| `getRolePermissions` | `/platform/wechat/role/perms/${roleId}` | `GET` | 获取角色的权限列表 |
| `getPermissionList` | `/platform/wechat/perms/list` | `GET` | 查询所有权限列表（用于下拉选择） |

### platform/room.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getStaffCustomerOptions` | `/platform/room/customer_options?staffUserId=${staffUserId}` | `GET` | 查询员工已经服务的客户下拉列表 |
| `getCustomerServicePersonnelOptions` | `/platform/room/staff_options?customerId=${customerId}` | `GET` | 查询客户服务人员下拉列表 |
| `replyRoomFeedback` | `/platform/room/reply` | `POST` | 回复房间反馈 |
| `getList` | `/platform/room/options` | `GET` | 查询房间列表 |
| `getRoomUserList` | `/platform/room/user_options?roomId=${roomId}` | `GET` | 查询房间用户列表 |

### platform/roomManagement.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `list` | `/platform/room/list` | `GET` | 查询 |
| `addLevel` | `/platform/room/add_level` | `PUT` | 新增楼层 |
| `listLevel` | `/platform/room/list_level` | `GET` | 获取楼层列表 |
| `listLevelRoom` | `/platform/room/list_level_room` | `GET` | 获取楼层房间列表 |
| `addRoom` | `/platform/room/add_room` | `PUT` | 新增房间 |
| `houseList` | `/platform/suite/page` | `GET` | 房型列表 |
| `options` | `/platform/suite/options` | `GET` | 获取房型 |
| `customer` | `/platform/customer/options` | `GET` | 房型列表 |
| `saveRoom` | `/platform/room` | `POST` | 修改房间&办理入住 |
| `staffPage` | `/platform/staff/page` | `GET` | 护理人员 |
| `todo` | `/platform/room/todo/` | `GET` | 查询房间待办 |
| `reply` | `/platform/room/reply` | `PUT` | 回复投诉 |
| `checkoutPage` | `/platform/room/checkout_page` | `GET` | 分页查询房间客户入住记录 |
| `checkoutPages` | `/platform/room/checkout_page/` | `GET` | 查询房间退房详情信息 |
| `roomInfo` | `/platform/room/info/` | `GET` | 查询房间信息 |
| `roomOptions` | `/platform/room/options` | `GET` | 查询楼层下拉选项数据 |
| `checkOut` | `/platform/room/out/${roomId}` | `POST` | 退房 |

### platform/serviceNote.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/diary/page` | `GET` | 分页查询笔记 |
| `roleCode` | `/platform/diary/getMomTeam` | `GET` | 通过角色编码获取人员 |
| `roleCodeapi` | `/platform/diary/getMomTeam?roleCode=` | `GET` | 通过角色编码获取人员 |
| `listByType` | `/platform/task_node/listByType` | `POST` | 通过类型与角色查询标签列表 |
| `getMomListapi` | `/platform/diary/getMomList` | `GET` | 获取可选择的优质宝妈列表(下拉) |
| `templateStyle` | `/platform/template_style/list` | `GET` | 获取所有模板风格 |
| `getDiaryTemplateapi` | `/platform/diary/getDiaryTemplate` | `GET` | 获取笔记模板 |
| `save` | `/platform/diary/publish` | `POST` | 发布笔记 |
| `update` | `/platform/diary/update` | `POST` | 修改笔记 |
| `getDetailapi` | `/platform/diary/getDetail?diaryId=` | `GET` | 获取笔记详情 |
| `getDeleteapi` | `/platform/diary/delete?diaryId=` | `GET` | 删除宝妈笔记 |

### platform/suite.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/suite/page` | `GET` | - |
| `save` | `/platform/suite/save` | `PUT` | - |
| `delTable` | `/platform/suite/` | `DELETE` | 删除表数据 |
| `info` | `/platform/suite/info/` | `GET` | 查询月子套房信息 |
| `online` | `/platform/suite/online/${query.suiteId}/${query.status}` | `GET` | 月子套房上下架 |
| `update` | `/platform/suite/update` | `POST` | 修改月子套房 |
| `suiteShow` | `/platform/suite/show/${query.suiteId}/${query.status}` | `GET` | 月子套房展示状态 |
| `setRecommended` | `/platform/suite/recommended` | `POST` | 设置热门推荐房型 |
| `cancelRecommended` | `/platform/suite/cancel_recommended` | `POST` | 取消热门推荐房型 |

### platform/suppliesManagement.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/supplies/page` | `GET` | 列表 |
| `save1` | `/platform/supplies/save_mama` | `PUT` | 新增妈妈 |
| `save2` | `/platform/supplies/save_baby` | `PUT` | 新增宝宝 |
| `delTable` | `/platform/supplies/` | `DELETE` | 删除表数据 |
| `update` | `/platform/supplies/update` | `POST` | - |

### platform/tagmanagement.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `list` | `/platform/invitation_label/info` | `GET` | 查询 |
| `save` | `/platform/invitation_label/save` | `PUT` | 新增 |

### platform/topicManagement.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `page` | `/platform/topic/page` | `GET` | 列表 |
| `save` | `/platform/topic/save` | `PUT` | 添加 |
| `delTable` | `/platform/topic/` | `DELETE` | 删除表数据 |
| `info` | `/platform/topic/info/` | `GET` | 查询 |
| `online` | `/platform/topic/online/${query.topicId}/${query.status}` | `GET` | 上下架 |
| `update` | `/platform/topic/update` | `POST` | 修改 |

### platform/wechatUser.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `queryWechatUserOptions` | `/platform/wechat_user/options` | `GET` | 查询微信用户下拉列表 |
| `getList` | `/platform/wechat_user/list` | `GET` | 查询微信用户列表 |

## 系统管理 (system)

### system/config.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listConfig` | `/system/config/list` | `GET` | 查询参数列表 |
| `getConfig` | `/system/config/` | `GET` | 查询参数详细 |
| `getConfigKey` | `/system/config/configKey/` | `GET` | 根据参数键名查询参数值 |
| `addConfig` | `/system/config` | `POST` | 新增参数配置 |
| `updateConfig` | `/system/config` | `PUT` | 修改参数配置 |
| `delConfig` | `/system/config/` | `DELETE` | 删除参数配置 |
| `refreshCache` | `/system/config/refreshCache` | `DELETE` | 刷新参数缓存 |

### system/dept.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listDept` | `/system/dept/list` | `GET` | 查询部门列表 |
| `listDeptExcludeChild` | `/system/dept/list/exclude/` | `GET` | 查询部门列表（排除节点） |
| `getDept` | `/system/dept/` | `GET` | 查询部门详细 |
| `addDept` | `/system/dept` | `POST` | 新增部门 |
| `updateDept` | `/system/dept` | `PUT` | 修改部门 |
| `delDept` | `/system/dept/` | `DELETE` | 删除部门 |

### system/dict/data.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listData` | `/system/dict/data/list` | `GET` | 查询字典数据列表 |
| `getData` | `/system/dict/data/` | `GET` | 查询字典数据详细 |
| `getDicts` | `/system/dict/data/type/` | `GET` | 根据字典类型查询字典数据信息 |
| `addData` | `/system/dict/data` | `POST` | 新增字典数据 |
| `updateData` | `/system/dict/data` | `PUT` | 修改字典数据 |
| `delData` | `/system/dict/data/` | `DELETE` | 删除字典数据 |

### system/dict/type.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listType` | `/system/dict/type/list` | `GET` | 查询字典类型列表 |
| `getType` | `/system/dict/type/` | `GET` | 查询字典类型详细 |
| `addType` | `/system/dict/type` | `POST` | 新增字典类型 |
| `updateType` | `/system/dict/type` | `PUT` | 修改字典类型 |
| `delType` | `/system/dict/type/` | `DELETE` | 删除字典类型 |
| `refreshCache` | `/system/dict/type/refreshCache` | `DELETE` | 刷新字典缓存 |
| `optionselect` | `/system/dict/type/optionselect` | `GET` | 获取字典选择框列表 |

### system/menu.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listMenu` | `/system/menu/list` | `GET` | 查询菜单列表 |
| `getMenu` | `/system/menu/` | `GET` | 查询菜单详细 |
| `treeselect` | `/system/menu/treeselect` | `GET` | 查询菜单下拉树结构 |
| `roleMenuTreeselect` | `/system/menu/roleMenuTreeselect/` | `GET` | 根据角色ID查询菜单下拉树结构 |
| `addMenu` | `/system/menu` | `POST` | 新增菜单 |
| `updateMenu` | `/system/menu` | `PUT` | 修改菜单 |
| `delMenu` | `/system/menu/` | `DELETE` | 删除菜单 |
| `getTenantPackageMenuTreeselect` | `/system/menu/tenantPackageMenuTreeselect/${packageId}` | `GET` | - |

### system/notice.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listNotice` | `/system/notice/list` | `GET` | 查询公告列表 |
| `getNotice` | `/system/notice/` | `GET` | 查询公告详细 |
| `addNotice` | `/system/notice` | `POST` | 新增公告 |
| `updateNotice` | `/system/notice` | `PUT` | 修改公告 |
| `delNotice` | `/system/notice/` | `DELETE` | 删除公告 |

### system/post.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listPost` | `/system/post/list` | `GET` | 查询岗位列表 |
| `getPost` | `/system/post/` | `GET` | 查询岗位详细 |
| `addPost` | `/system/post` | `POST` | 新增岗位 |
| `updatePost` | `/system/post` | `PUT` | 修改岗位 |
| `delPost` | `/system/post/` | `DELETE` | 删除岗位 |

### system/role.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listRole` | `/system/role/list` | `GET` | 查询角色列表 |
| `getRole` | `/system/role/` | `GET` | 查询角色详细 |
| `addRole` | `/system/role` | `POST` | 新增角色 |
| `updateRole` | `/system/role` | `PUT` | 修改角色 |
| `dataScope` | `/system/role/dataScope` | `PUT` | 角色数据权限 |
| `changeRoleStatus` | `/system/role/changeStatus` | `PUT` | 角色状态修改 |
| `delRole` | `/system/role/` | `DELETE` | 删除角色 |
| `allocatedUserList` | `/system/role/authUser/allocatedList` | `GET` | 查询角色已授权用户列表 |
| `unallocatedUserList` | `/system/role/authUser/unallocatedList` | `GET` | 查询角色未授权用户列表 |
| `authUserCancel` | `/system/role/authUser/cancel` | `PUT` | 取消用户授权角色 |
| `authUserCancelAll` | `/system/role/authUser/cancelAll` | `PUT` | 批量取消用户授权角色 |
| `authUserSelectAll` | `/system/role/authUser/selectAll` | `PUT` | 授权用户选择 |
| `deptTreeSelect` | `/system/role/deptTree/` | `GET` | 根据角色ID查询部门树结构 |

### system/tenant.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `queryList` | `/system/tenant/list` | `GET` | 查询租户列表 |
| `queryOptions` | `/system/tenant/options` | `GET` | 查询租户下拉选项列表 |
| `getById` | `/system/tenant/${id}` | `GET` | 查询租户详细信息 |
| `syncTenantPackage` | `/system/tenant/syncTenantPackage` | `GET` | 同步租户套餐 |
| `querySelectOptions` | `/system/tenant/package/selectList` | `GET` | 查询租户套餐下拉列表 |
| `changeTenantStatus` | `/system/tenant/changeStatus` | `PUT` | 改变租户状态 |
| `createTenant` | `/system/tenant` | `POST` | 新增租户 |
| `updateTenant` | `/system/tenant` | `PUT` | 修改租户 |
| `deleteTenant` | `/system/tenant/${tenantId}` | `DELETE` | 删除租户 |
| `dynamicTenant` | `/system/tenant/dynamic/${tenantId}` | `GET` | 动态设置租户 |
| `clearTenant` | `/system/tenant/dynamic/clear` | `GET` | 清除租户 |

### system/tenantFunction.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listTenantFunction` | `/system/tenant-function/list` | `GET` | 分页查询功能列表 |
| `exportTenantFunction` | `/system/tenant-function/export` | `POST` | 导出功能列表 |
| `getTenantFunction` | `/system/tenant-function/${functionId}` | `GET` | 获取功能详情 |
| `getFunctionsByPackage` | `/system/tenant-function/package/${packageId}` | `GET` | 根据套餐查询功能 |
| `getAllEnabledFunctions` | `/system/tenant-function/all-enabled` | `GET` | 查询所有启用的功能 |
| `getFunctionByCode` | `/system/tenant-function/code/${functionCode}` | `GET` | 根据编码查询功能 |
| `addTenantFunction` | `/system/tenant-function` | `POST` | 新增功能 |
| `updateTenantFunction` | `/system/tenant-function` | `PUT` | 修改功能 |
| `delTenantFunction` | `/system/tenant-function/${functionIds}` | `DELETE` | 删除功能 |

### system/tenantFunctionMenu.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getMenusByFunction` | `/system/tenant-function-menu/function/${functionId}` | `GET` | 查询功能的菜单列表 |
| `getFunctionsByMenu` | `/system/tenant-function-menu/menu/${menuId}` | `GET` | 查询菜单的功能列表 |
| `saveFunctionMenus` | `/system/tenant-function-menu/save` | `POST` | 批量设置功能的菜单关联 |
| `deleteFunctionMenus` | `/system/tenant-function-menu/function/${functionId}` | `DELETE` | 删除功能的所有菜单关联 |

### system/tenantPackage.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `queryList` | `/system/tenant/package/list` | `GET` | 查询租户套餐列表 |
| `createPackage` | `/system/tenant/package` | `POST` | 新增租户套餐 |
| `getById` | `/system/tenant/package/${id}` | `GET` | 查询租户套餐详细信息 |
| `updatePackage` | `/system/tenant/package` | `PUT` | 修改租户套餐 |
| `remove` | `/system/tenant/package/${id}` | `DELETE` | 删除租户套餐 |
| `changePackageStatus` | `/system/tenant/package/changeStatus` | `PUT` | 改变租户套餐状态 |

### system/tenantPackageFunction.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getFunctionsByPackage` | `/system/tenant-package-function/package/${packageId}` | `GET` | 查询套餐的功能列表 |
| `getPackagesByFunction` | `/system/tenant-package-function/function/${functionId}` | `GET` | 查询功能的套餐列表 |
| `savePackageFunctions` | `/system/tenant-package-function/save` | `POST` | 批量设置套餐的功能关联 |
| `deletePackageFunctions` | `/system/tenant-package-function/package/${packageId}` | `DELETE` | 删除套餐的所有功能关联 |

### system/user.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listUser` | `/system/user/list` | `GET` | 查询用户列表 |
| `getUser` | `/system/user/` | `GET` | 查询用户详细 |
| `addUser` | `/system/user` | `POST` | 新增用户 |
| `updateUser` | `/system/user` | `PUT` | 修改用户 |
| `delUser` | `/system/user/` | `DELETE` | 删除用户 |
| `resetUserPwd` | `/system/user/resetPwd` | `PUT` | 用户密码重置 |
| `changeUserStatus` | `/system/user/changeStatus` | `PUT` | 用户状态修改 |
| `getUserProfile` | `/system/user/profile` | `GET` | 查询用户个人信息 |
| `updateUserProfile` | `/system/user/profile` | `PUT` | 修改用户个人信息 |
| `updateUserPwd` | `/system/user/profile/updatePwd` | `PUT` | 用户密码重置 |
| `uploadAvatar` | `/system/user/profile/avatar` | `POST` | 用户头像上传 |
| `getAuthRole` | `/system/user/authRole/` | `GET` | 查询授权角色 |
| `updateAuthRole` | `/system/user/authRole` | `PUT` | 保存授权角色 |
| `deptTreeSelect` | `/system/user/deptTree` | `GET` | 查询部门下拉树结构 |

### system/wechat.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `getWechatConfigPage` | `/platform/wechat_mini_program/page` | `GET` | 查询微信配置列表 |
| `updateWechatConfig` | `/platform/wechat_mini_program/update` | `PUT` | 修改微信配置 |
| `changeWechatConfigStatus` | `/platform/wechat_mini_program/change/${status}/${wConfigId}` | `POST` | 更改微信配置状态 |
| `saveWechatConfig` | `/platform/wechat_mini_program/save` | `POST` | 新增微信配置 |
| `getWechatConfig` | `/platform/wechat_mini_program/info/` | `GET` | 查询微信配置详细 |
| `getTenantMiniProgramPage` | `/platform/tenant_mini_program/page` | `GET` | 查询微信小程序商户配置列表 |
| `generateQrCode` | `/platform/tenant_mini_program/qr_code/` | `GET` | 生成小程序二维码 |
| `generateQrCodeWithPath` | `/platform/tenant_mini_program/qr_code` | `GET` | 生成小程序二维码（自定义路径） |
| `generateUrlLink` | `/platform/tenant_mini_program/url_like/` | `GET` | 生成小程序url_link |
| `generateUrlScheme` | `/platform/tenant_mini_program/url_scheme/` | `GET` | 生成小程序url_scheme |
| `saveTenantMiniProgram` | `/platform/tenant_mini_program/save` | `POST` | 新增小程序商户配置 |
| `getWechatUserPage` | `/platform/wechat_user/page` | `GET` | 查询微信用户列表 |
| `changeWechatUserStatus` | `/platform/wechat_user/change/${status}/${userId}` | `POST` | 更改微信用户状态 |
| `createWechatUser` | `/platform/wechat_user/save` | `POST` | 新增微信用户 |
| `removeWechatUser` | `/platform/wechat_user/remove/${userId}` | `DELETE` | 删除微信用户 |
| `updateWechatUser` | `/platform/wechat_user/update` | `PUT` | 修改微信用户 |
| `getWechatUser` | `/platform/wechat_user/info/${id}` | `GET` | 查询微信用户详情 |
| `creatUserForStaffId` | `/platform/wechat_user/creatForStaffId/${staffId}` | `GET` | 通过员工id创建微信用户 |
| `creatForCustomerId` | `/platform/wechat_user/creatForCustomerId/${customerId}` | `GET` | 通过客户id创建微信用户 |
| `getRoles` | `/platform/wechat_user/roles` | `GET` | 查询微信角色列表 |
| `getTemplates` | `/platform/wechat_template_config/getTemplates` | `GET` | 查询小程序模板配置 |
| `saveUpdate` | `/platform/wechat_template_config/saveUpdate` | `POST` | 新增修改消息模板配置 |
| `getAllReminderTypes` | `/platform/wechat_template_config/getAllReminderTypes` | `GET` | 获取所有提醒类型 |
| `getDetail` | `/platform/wechat_template_config/getDetail` | `GET` | 获取推送模板详情 |

## 系统工具 (tool)

### tool/gen.js

| 方法名 | 接口地址 | 请求方式 | 接口描述/说明 |
| -- | -- | -- | -- |
| `listTable` | `/tool/gen/list` | `GET` | 查询生成表数据 |
| `listDbTable` | `/tool/gen/db/list` | `GET` | 查询db数据库列表 |
| `getGenTable` | `/tool/gen/` | `GET` | 查询表详细信息 |
| `updateGenTable` | `/tool/gen` | `PUT` | 修改代码生成信息 |
| `importTable` | `/tool/gen/importTable` | `POST` | 导入表 |
| `createTable` | `/tool/gen/createTable` | `POST` | 创建表 |
| `previewTable` | `/tool/gen/preview/` | `GET` | 预览生成代码 |
| `delTable` | `/tool/gen/` | `DELETE` | 删除表数据 |
| `genCode` | `/tool/gen/genCode/` | `GET` | 生成代码（自定义路径） |
| `synchDb` | `/tool/gen/synchDb/` | `GET` | 同步数据库 |

