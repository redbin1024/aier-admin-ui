<template>
  <div class="login-form-wrapper">
    <!-- Logo & Title -->
    <div class="form-header">
      <img src="@/assets/images/xdd-logo.png" alt="小叮当" class="form-logo" />
      <h2 class="form-title">欢迎回来</h2>
      <p class="form-subtitle">登录小叮当管理平台</p>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="form-error">
      <icon-exclamation-circle-fill />
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Login Form -->
    <a-form
      ref="loginForm"
      :model="loginFormData"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="tenantId"
        :rules="[{ required: true, message: '请输入商户编号' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="loginFormData.tenantId"
          placeholder="商户编号"
          allow-clear
          size="large"
        >
          <template #prefix>
            <icon-safe />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        field="username"
        :rules="[{ required: true, message: '请输入账号' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="loginFormData.username"
          placeholder="账号"
          allow-clear
          size="large"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        field="password"
        :rules="[{ required: true, message: '请输入密码' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="loginFormData.password"
          placeholder="密码"
          allow-clear
          size="large"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>

      <div class="form-options">
        <a-checkbox
          :model-value="loginFormData.rememberMe"
          @change="setRememberPassword"
        >
          <span class="remember-text">记住账号</span>
        </a-checkbox>
      </div>

      <a-button
        type="primary"
        html-type="submit"
        long
        size="large"
        :loading="loading"
        class="login-btn"
      >
        {{ loading ? '登 录 中...' : '登 录' }}
      </a-button>
    </a-form>

    <!-- 底部分割线 -->
    <div class="form-divider">
      <span class="divider-line"></span>
      <span class="divider-text">加入我们 让管理变得简单又轻松</span>
      <span class="divider-line"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import Cookies from 'js-cookie';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  // encrypt/decrypt 已在 request 拦截器中统一处理
  import type { LoginData } from '@/api/login';

  const router = useRouter();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();

  const loginFormData = reactive({
    tenantId: Cookies.get('tenantId') || '',
    username: Cookies.get('username') || '',
    password: Cookies.get('password') || '',
    rememberMe: Boolean(Cookies.get('rememberMe')),
  });

  const handleSubmit = async ({
    errors,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    values: _values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      errorMessage.value = '';
      try {
        if (loginFormData.rememberMe) {
          Cookies.set('tenantId', loginFormData.tenantId, { expires: 30 });
          Cookies.set('username', loginFormData.username, { expires: 30 });
          Cookies.set('password', loginFormData.password, { expires: 30 });
          Cookies.set('rememberMe', '1', { expires: 30 });
        } else {
          Cookies.remove('tenantId');
          Cookies.remove('username');
          Cookies.remove('password');
          Cookies.remove('rememberMe');
        }

        await userStore.login({
          tenantId: loginFormData.tenantId,
          username: loginFormData.username,
          password: loginFormData.password,
        } as LoginData);

        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        const redirectPath = redirect as string;

        if (redirectPath && redirectPath.startsWith('/')) {
          await router.push({ path: redirectPath, query: othersQuery });
        } else {
          await router.push({ path: '/', query: othersQuery });
        }
        Message.success('登录成功');
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };

  const setRememberPassword = (value: boolean) => {
    loginFormData.rememberMe = value;
  };
</script>

<style lang="less" scoped>
  .login-form-wrapper {
    width: 100%;
  }

  .form-header {
    text-align: center;
    margin-bottom: 36px;
  }

  .form-logo {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    filter: drop-shadow(0 0 16px rgba(96, 165, 250, 0.3));
  }

  .form-title {
    font-size: 26px;
    font-weight: 700;
    color: #e2e8f0;
    margin: 0 0 6px;
    letter-spacing: 1px;
  }

  .form-subtitle {
    font-size: 14px;
    color: rgba(148, 163, 184, 0.6);
    margin: 0;
  }

  .form-error {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    margin-bottom: 16px;
    border-radius: 8px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: #fca5a5;
    font-size: 13px;
    animation: shakeX 0.4s ease-in-out;
  }

  .login-form {
    :deep(.arco-input-wrapper) {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.12);
      border-radius: 10px;
      height: 44px;
      transition: all 0.3s ease;

      &:hover {
        border-color: rgba(96, 165, 250, 0.3);
      }

      &.arco-input-focus {
        border-color: rgba(96, 165, 250, 0.6);
        box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
      }

      .arco-input {
        color: #e2e8f0;

        &::placeholder {
          color: rgba(148, 163, 184, 0.4);
        }
      }

      .arco-input-prefix {
        color: rgba(148, 163, 184, 0.5);
      }
    }

    :deep(.arco-form-item) {
      margin-bottom: 20px;
    }
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .remember-text {
      color: rgba(148, 163, 184, 0.6);
      font-size: 13px;
    }

    :deep(.arco-checkbox-label) {
      color: rgba(148, 163, 184, 0.6);
    }
  }

  .login-btn {
    height: 46px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 4px;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
      background: linear-gradient(135deg, #60a5fa, #818cf8);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .form-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 32px;
    gap: 12px;
  }

  .divider-line {
    width: 32px;
    height: 1px;
    background: rgba(148, 163, 184, 0.15);
  }

  .divider-text {
    font-size: 12px;
    color: rgba(148, 163, 184, 0.3);
    white-space: nowrap;
  }

  @keyframes shakeX {
    0%,
    100% {
      transform: translateX(0);
    }
    20%,
    60% {
      transform: translateX(-6px);
    }
    40%,
    80% {
      transform: translateX(6px);
    }
  }
</style>
