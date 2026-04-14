const TOKEN_KEY = 'token';
const DYNAMIC_TENANT_KEY = 'dynamic_tenant_id';

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const getDynamicTenant = () => {
  return localStorage.getItem(DYNAMIC_TENANT_KEY);
};

const setDynamicTenant = (tenantId: string) => {
  localStorage.setItem(DYNAMIC_TENANT_KEY, tenantId);
};

const clearDynamicTenant = () => {
  localStorage.removeItem(DYNAMIC_TENANT_KEY);
};

export {
  isLogin,
  getToken,
  setToken,
  clearToken,
  getDynamicTenant,
  setDynamicTenant,
  clearDynamicTenant,
};
