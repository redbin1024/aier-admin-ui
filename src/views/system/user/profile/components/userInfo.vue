<template>
  <a-form ref="formRef" :model="form" :rules="rules" auto-label-width>
    <a-form-item label="用户昵称" field="nickName">
      <a-input v-model="form.nickName" :max-length="30" allow-clear />
    </a-form-item>
    <a-form-item label="手机号码" field="phonenumber">
      <a-input v-model="form.phonenumber" :max-length="11" allow-clear />
    </a-form-item>
    <a-form-item label="邮箱" field="email">
      <a-input v-model="form.email" :max-length="50" allow-clear />
    </a-form-item>
    <a-form-item label="性别" field="sex">
      <a-radio-group v-model="form.sex">
        <a-radio value="0">男</a-radio>
        <a-radio value="1">女</a-radio>
      </a-radio-group>
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
  import { ref, watch } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import { updateUserProfile } from '@/api/system/user';
  import { useTabBarStore } from '@/store';

  const props = defineProps({
    user: {
      type: Object,
      default: () => ({}),
    },
  });

  const emit = defineEmits(['update']);
  const router = useRouter();
  const tabBarStore = useTabBarStore();
  const formRef = ref();

  const form = ref<any>({
    nickName: '',
    phonenumber: '',
    email: '',
    sex: '0',
  });

  const rules = {
    nickName: [{ required: true, message: '用户昵称不能为空' }],
    email: [
      { required: true, message: '邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的邮箱地址' },
    ],
    phonenumber: [
      { required: true, message: '手机号码不能为空' },
      {
        match: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: '请输入正确的手机号码',
      },
    ],
  };

  watch(
    () => props.user,
    (newUser) => {
      if (newUser) {
        form.value = {
          nickName: newUser.nickName,
          phonenumber: newUser.phonenumber,
          email: newUser.email,
          sex: newUser.sex,
        };
      }
    },
    { immediate: true }
  );

  const submit = async () => {
    const errors = await formRef.value?.validate();
    if (!errors) {
      try {
        await updateUserProfile(form.value);
        Message.success('修改成功');
        emit('update');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  const close = () => {
    // 类似于 this.$tab.closePage() 的逻辑
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
