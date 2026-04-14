<template>
  <a-form ref="formRef" :model="user" :rules="rules" auto-label-width>
    <a-form-item label="旧密码" field="oldPassword">
      <a-input-password
        v-model="user.oldPassword"
        placeholder="请输入旧密码"
        allow-clear
      />
    </a-form-item>
    <a-form-item label="新密码" field="newPassword">
      <a-input-password
        v-model="user.newPassword"
        placeholder="请输入新密码"
        allow-clear
      />
    </a-form-item>
    <a-form-item label="确认密码" field="confirmPassword">
      <a-input-password
        v-model="user.confirmPassword"
        placeholder="请确认新密码"
        allow-clear
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="submit">保存</a-button>
        <a-button type="outline" @click="close">关闭</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import { updateUserPwd } from '@/api/system/user';
  import { useTabBarStore } from '@/store';

  const router = useRouter();
  const tabBarStore = useTabBarStore();
  const formRef = ref();

  const user = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const rules = {
    oldPassword: [{ required: true, message: '旧密码不能为空' }],
    newPassword: [
      { required: true, message: '新密码不能为空' },
      { minLength: 6, maxLength: 20, message: '长度在 6 到 20 个字符' },
      { match: /^[^<>"'|\\]+$/, message: '不能包含非法字符：< > " \' \\ |' },
    ],
    confirmPassword: [
      { required: true, message: '确认密码不能为空' },
      {
        validator: (value: string, cb: (msg?: string) => void) => {
          if (user.value.newPassword !== value) {
            cb('两次输入的密码不一致');
          } else {
            cb();
          }
        },
      },
    ],
  };

  const submit = async () => {
    const errors = await formRef.value?.validate();
    if (!errors) {
      try {
        await updateUserPwd({
          oldPassword: user.value.oldPassword,
          newPassword: user.value.newPassword,
        });
        Message.success('修改成功');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  const close = () => {
    const currentRoute = router.currentRoute.value;
    tabBarStore.deleteTag(0, {
      title: currentRoute.meta.locale || '',
      name: currentRoute.name as string,
      fullPath: currentRoute.fullPath,
    });
    router.push({ name: 'Workplace' });
  };
</script>

<style scoped lang="less">
  .arco-form {
    margin-top: 20px;
    max-width: 600px;
  }
</style>
