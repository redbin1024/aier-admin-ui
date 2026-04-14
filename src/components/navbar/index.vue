<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img
          alt="logo"
          src="@/assets/images/xdd-logo.png"
          style="width: 32px; height: 32px"
        />
        <a-typography-title
          :style="{ margin: 0, fontSize: '18px' }"
          :heading="5"
        >
          孕妈小叮当
        </a-typography-title>
        <icon-menu-fold
          v-if="!topMenu && appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>
    <div class="center-side">
      <Menu v-if="topMenu" />
    </div>
    <ul class="right-side">
      <li v-permission="['superadmin']">
        <a-select
          v-model="companyName"
          :style="{ width: '280px' }"
          placeholder="切换商户"
          allow-clear
          allow-search
          @change="dynamicTenantEvent"
          @clear="dynamicClearEvent"
        >
          <template #prefix>
            <icon-storage />
          </template>
          <a-option
            v-for="item in tenantList"
            :key="item.tenantId"
            :value="item.tenantId"
            :label="item.companyName"
          />
        </a-select>
      </li>
      <li>
        <a-tooltip :content="$t('settings.search')">
          <a-select
            v-model="searchValue"
            :style="{
              width: '200px',
              borderRadius: '20px',
              backgroundColor: 'var(--color-fill-2)',
            }"
            :placeholder="$t('settings.search')"
            allow-search
            allow-clear
            @change="handleSearchSelect"
          >
            <template #prefix>
              <icon-search />
            </template>
            <a-option
              v-for="item in searchOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </a-select>
        </a-tooltip>
      </li>
      <!-- <li>
        <a-tooltip :content="$t('settings.language')">
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setDropDownVisible">
            <template #icon>
              <icon-language />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click" @select="changeLocale as any">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption v-for="item in locales" :key="item.value" :value="item.value">
              <template #icon>
                <icon-check v-show="item.value === currentLocale" />
              </template>
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </li> -->
      <li>
        <a-tooltip
          :content="
            theme === 'light'
              ? $t('settings.navbar.theme.toDark')
              : $t('settings.navbar.theme.toLight')
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="handleToggleTheme"
          >
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <!-- <li>
        <a-tooltip :content="$t('settings.navbar.alerts')">
          <div class="message-box-trigger">
            <a-badge :count="9" dot>
              <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setPopoverVisible">
                <icon-notification />
              </a-button>
            </a-badge>
          </div>
        </a-tooltip>
        <a-popover trigger="click" :arrow-style="{ display: 'none' }" :content-style="{ padding: 0, minWidth: '400px' }"
          content-class="message-popover">
          <div ref="refBtn" class="ref-btn"></div>
          <template #content>
            <message-box />
          </template>
        </a-popover>
      </li> -->
      <li>
        <a-tooltip
          :content="
            isFullscreen
              ? $t('settings.navbar.screen.toExit')
              : $t('settings.navbar.screen.toFull')
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="toggleFullScreen"
          >
            <template #icon>
              <icon-fullscreen-exit v-if="isFullscreen" />
              <icon-fullscreen v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="$t('settings.title')">
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="setVisible"
          >
            <template #icon>
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar
            :size="32"
            :style="{ marginRight: '8px', cursor: 'pointer' }"
          >
            <img alt="avatar" :src="avatar" />
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space @click="switchRoles">
                <icon-tag />
                <span>
                  {{ $t('messageBox.switchRoles') }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'UserProfile' })">
                <icon-user />
                <span>
                  {{ $t('messageBox.userCenter') }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'Setting' })">
                <icon-settings />
                <span>
                  {{ $t('messageBox.userSettings') }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>
                  {{ $t('messageBox.logout') }}
                </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, inject, onMounted } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useDark, useToggle, useFullscreen } from '@vueuse/core';
  import { useRouter, RouteRecordRaw } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { useAppStore, useUserStore, useTabBarStore } from '@/store';
  // import { LOCALE_OPTIONS } from '@/locale';
  // import useLocale from '@/hooks/locale';
  import useUser from '@/hooks/user';
  import Menu from '@/components/menu/index.vue';
  // import MessageBox from '../message-box/index.vue';
  import {
    queryOptions,
    dynamicTenant,
    clearTenant,
  } from '@/api/system/tenant';
  import {
    getDynamicTenant,
    setDynamicTenant,
    clearDynamicTenant,
  } from '@/utils/auth';
  import useMenuTree from '../menu/use-menu-tree';

  const companyName = ref('');
  const tenantList = ref<any[]>([]);

  const router = useRouter();
  const tabBarStore = useTabBarStore();
  const { t } = useI18n();
  const { menuTree } = useMenuTree();

  const searchOptions = computed(() => {
    const options: { value: string; label: string; path: string }[] = [];

    const traverse = (routes: RouteRecordRaw[], parentTitle = '') => {
      routes.forEach((route) => {
        const localeStr = route.meta?.locale as string;
        let title = '';
        if (localeStr) {
          title = localeStr.startsWith('menu.') ? t(localeStr) : localeStr;
        }

        const fullTitle = parentTitle ? `${parentTitle} - ${title}` : title;

        if (!route.children || route.children.length === 0) {
          if (route.name && title) {
            options.push({
              value: route.name as string,
              label: fullTitle,
              path: route.path,
            });
          }
        } else {
          traverse(route.children, fullTitle);
        }
      });
    };

    traverse(menuTree.value as RouteRecordRaw[]);
    return options;
  });

  const searchValue = ref('');
  const handleSearchSelect = (name: any) => {
    if (name) {
      router.push({ name });
      searchValue.value = '';
    }
  };

  const getTenantList = async () => {
    try {
      const res: any = await queryOptions();
      tenantList.value = res.data || [];

      // 初始化时从本地存储恢复选择状态
      const savedTenantId = getDynamicTenant();
      if (savedTenantId) {
        // 检查已保存的 tenantId 是否存在于当前选项中
        const exists = tenantList.value.some(
          (item) => String(item.tenantId) === String(savedTenantId)
        );
        if (exists) {
          companyName.value = savedTenantId;
        } else {
          // 如果不在列表中，可能是权限变化或者缓存过期，清除本地缓存
          clearDynamicTenant();
        }
      }
    } catch (error) {
      Message.error('获取租户列表失败');
    }
  };

  const dynamicTenantEvent = async (tenantId: any) => {
    if (companyName.value != null && companyName.value !== '') {
      await dynamicTenant(tenantId);
      setDynamicTenant(String(tenantId));
      tabBarStore.resetTabList();
      window.location.href = '/';
    }
  };

  const dynamicClearEvent = async () => {
    await clearTenant();
    companyName.value = '';
    clearDynamicTenant();
    tabBarStore.resetTabList();
    window.location.href = '/';
  };

  onMounted(() => {
    getTenantList();
  });

  const appStore = useAppStore();
  const userStore = useUserStore();
  const { logout } = useUser();
  // const { changeLocale, currentLocale } = useLocale();
  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
  // const locales = [...LOCALE_OPTIONS];
  const avatar = computed(() => {
    return userStore.avatar;
  });
  const theme = computed(() => {
    return appStore.theme;
  });
  const topMenu = computed(() => appStore.topMenu && appStore.menu);
  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      // overridden default behavior
      appStore.toggleTheme(dark);
    },
  });
  const toggleTheme = useToggle(isDark);
  const handleToggleTheme = () => {
    toggleTheme();
  };
  const setVisible = () => {
    appStore.updateSettings({ globalSettings: true });
  };
  // const refBtn = ref();
  // const triggerBtn = ref();
  // const setPopoverVisible = () => {
  //   const event = new MouseEvent('click', {
  //     view: window,
  //     bubbles: true,
  //     cancelable: true,
  //   });
  //   refBtn.value.dispatchEvent(event);
  // };
  const handleLogout = () => {
    logout();
  };
  // const setDropDownVisible = () => {
  //   const event = new MouseEvent('click', {
  //     view: window,
  //     bubbles: true,
  //     cancelable: true,
  //   });
  //   triggerBtn.value.dispatchEvent(event);
  // };
  const switchRoles = async () => {
    const res = await userStore.switchRoles();
    Message.success(res as string);
  };
  const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void;
</script>

<style scoped lang="less">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .center-side {
    flex: 1;
  }

  .right-side {
    display: flex;
    padding-right: 20px;
    list-style: none;

    :deep(.locale-select) {
      border-radius: 20px;
    }

    li {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }

    .nav-btn {
      border-color: rgb(var(--gray-2));
      color: rgb(var(--gray-8));
      font-size: 16px;
    }

    .trigger-btn,
    .ref-btn {
      position: absolute;
      bottom: 14px;
    }

    .trigger-btn {
      margin-left: 14px;
    }
  }
</style>

<style lang="less">
  .message-popover {
    .arco-popover-content {
      margin-top: 0;
    }
  }
</style>
