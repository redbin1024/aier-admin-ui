<template>
  <div class="user-profile">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card class="box-card" title="个人信息">
          <div class="text-center">
            <userAvatar />
          </div>
          <a-list :bordered="false" size="small" class="user-info-list">
            <a-list-item>
              <div class="list-item-content">
                <span class="label"> <icon-user /> 用户名称 </span>
                <span class="value">{{ user.userName || '-' }}</span>
              </div>
            </a-list-item>
            <a-list-item>
              <div class="list-item-content">
                <span class="label"> <icon-phone /> 手机号码 </span>
                <span class="value">{{ user.phonenumber || '-' }}</span>
              </div>
            </a-list-item>
            <a-list-item>
              <div class="list-item-content">
                <span class="label"> <icon-email /> 用户邮箱 </span>
                <span class="value">{{ user.email || '-' }}</span>
              </div>
            </a-list-item>
            <a-list-item v-if="user.dept">
              <div class="list-item-content">
                <span class="label"> <icon-mind-mapping /> 所属部门 </span>
                <span class="value"
                  >{{ user.dept.deptName }} / {{ postGroup }}</span
                >
              </div>
            </a-list-item>
            <a-list-item>
              <div class="list-item-content">
                <span class="label"> <icon-user-group /> 所属角色 </span>
                <span class="value">{{ roleGroup || '-' }}</span>
              </div>
            </a-list-item>
            <a-list-item>
              <div class="list-item-content">
                <span class="label"> <icon-history /> 创建日期 </span>
                <span class="value">{{ user.createTime || '-' }}</span>
              </div>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="16">
        <a-card class="box-card" title="基本资料">
          <a-tabs v-model:active-key="activeTab" type="rounded">
            <a-tab-pane key="userinfo" title="基本资料">
              <userInfo :user="user" @update="getUser" />
            </a-tab-pane>
            <a-tab-pane key="resetPwd" title="修改密码">
              <resetPwd />
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getUserProfile } from '@/api/system/user';
  import userAvatar from './components/userAvatar.vue';
  import userInfo from './components/userInfo.vue';
  import resetPwd from './components/resetPwd.vue';

  const user = ref<any>({});
  const roleGroup = ref('');
  const postGroup = ref('');
  const activeTab = ref('userinfo');

  const getUser = async () => {
    try {
      const response: any = await getUserProfile();
      user.value = response.data?.user || {};
      roleGroup.value = response.roleGroup || '';
      postGroup.value = response.postGroup || '';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  onMounted(() => {
    getUser();
  });
</script>

<script lang="ts">
  export default {
    name: 'Profile',
  };
</script>

<style scoped lang="less">
  .user-profile {
    padding: 16px 20px;
    background-color: var(--color-fill-2);
    min-height: calc(100vh - 60px);

    :deep(.arco-card) {
      border-radius: 4px;
      margin-bottom: 16px;
    }

    .text-center {
      text-align: center;
      margin-bottom: 24px;
    }

    .user-info-list {
      .list-item-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 4px 0;

        .label {
          color: var(--color-text-2);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .value {
          color: var(--color-text-1);
          font-weight: 500;
        }
      }
    }
  }
</style>
