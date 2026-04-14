import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/login';
import { setToken, clearToken, clearDynamicTenant } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res: any = await getUserInfo();

      let userInfo = res.data;
      // 兼容 RuoYi 返回格式
      if (res.user || res.roles) {
        userInfo = {
          ...res.user,
          name: res.user?.userName || res.user?.nickName,
          avatar: res.user?.avatar,
          role: res.roles && res.roles.length > 0 ? res.roles[0] : 'user',
        };
      } else if (res.data && (res.data.user || res.data.roles)) {
        userInfo = {
          ...res.data.user,
          name: res.data.user?.userName || res.data.user?.nickName,
          avatar: res.data.user?.avatar,
          role:
            res.data.roles && res.data.roles.length > 0
              ? res.data.roles[0]
              : 'user',
        };
      }

      this.setInfo(userInfo);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        // 兼容后端返回 access_token 或 token
        const token = res.data.access_token || res.data.token;
        if (!token) {
          throw new Error('登录失败：未获取到 token');
        }
        setToken(token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      clearDynamicTenant();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
