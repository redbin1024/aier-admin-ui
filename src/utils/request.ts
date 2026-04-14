/* eslint-disable import/no-unresolved */
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import { Message, Modal, Notification } from '@arco-design/web-vue';
import NProgress from 'nprogress';
import { clearToken, getToken } from './auth';
import encryptRSA from './jsencrypt';
import { encryptBase64, encryptWithAes, generateAesKey } from './crypto';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestHeaders extends Record<string, any> {
  isToken?: boolean;
  isEncrypt?: boolean;
  repeatSubmit?: boolean;
}

interface RequestConfig {
  url: string;
  method?: HttpMethod | string;
  params?: Record<string, any>;
  data?: any;
  headers?: RequestHeaders;
  timeout?: number;
  responseType?: 'blob' | 'json' | string;
}

const REPEAT_SUBMIT_GAP = 1000;

interface AlovaMethodLike {
  url: string;
  data?: any;
  type?: string;
  config: {
    headers?: RequestHeaders;
    responseType?: string;
    [key: string]: any;
  };
}

const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  requestAdapter: adapterFetch(),
  timeout: 100000,
  beforeRequest(method: AlovaMethodLike) {
    NProgress.start();

    const headers = (method.config.headers || {}) as RequestHeaders;
    method.config.headers = headers;

    const token = getToken();
    if (token && headers.isToken !== false) {
      headers.Authorization = `Bearer ${token}`;
    }

    headers.clientId = import.meta.env.VITE_CLIENT_ID;
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=UTF-8';
    }

    if (
      headers.isEncrypt === true &&
      method.data &&
      !(method.data instanceof FormData)
    ) {
      // generateAesKey() 返回 WordArray（32字节，AES-256），与后端一致
      const aesKey = generateAesKey();
      // encryptBase64 接收 WordArray，直接 stringify 为 Base64 字符串
      const b64AesKey = encryptBase64(aesKey);
      // 用 RSA 公钥加密 Base64 字符串后放入请求头
      const encryptedAesKey = encryptRSA(b64AesKey);
      if (!encryptedAesKey) {
        throw new Error('RSA加密失败');
      }
      headers['encrypt-key'] = encryptedAesKey;
      // 用 AES-ECB 加密请求体，aesKey 为 WordArray
      // eslint-disable-next-line prettier/prettier
      method.data = encryptWithAes(JSON.stringify(method.data), aesKey);
      // 注意：成功的 curl 中包含 -H 'isEncrypt: true'，说明后端需要这个标记
      // 不要在这里 delete headers.isEncrypt;
    }

    const methodType = String(method.type || '').toUpperCase();
    if (
      ['POST', 'PUT'].includes(methodType) &&
      headers.repeatSubmit !== false &&
      typeof window !== 'undefined'
    ) {
      const requestKey = `${method.url}:${JSON.stringify(method.data ?? {})}`;
      const last = sessionStorage.getItem(requestKey);
      const lastTime = last ? Number(last) : 0;
      if (lastTime && Date.now() - lastTime < REPEAT_SUBMIT_GAP) {
        throw new Error('数据正在处理，请勿重复提交');
      }
      sessionStorage.setItem(requestKey, String(Date.now()));
    }
  },
  async responded(response: Response, method: AlovaMethodLike) {
    NProgress.done();

    if ((method.config as RequestConfig).responseType === 'blob') {
      return response.blob();
    }

    const res = await response.json();
    const code = Number(res?.code);
    const msg = res?.msg || res?.message || '请求失败';

    if (code === 200 || code === 20000) {
      return res;
    }

    if (code === 401) {
      Modal.warning({
        title: '系统提示',
        content: '登录状态已过期，请重新登录',
        okText: '重新登录',
        onOk: async () => {
          clearToken();
          window.location.href = '/login';
        },
      });
    } else if (code === 500) {
      Message.error(msg);
    } else if (code === 601) {
      Message.warning(msg);
    } else {
      Notification.error({ title: '错误', content: msg });
    }

    throw new Error(msg);
  },
});

function sendRequest<T = any>(config: RequestConfig): Promise<T> {
  const method = String(config.method || 'GET').toUpperCase() as HttpMethod;
  const requestConfig = {
    params: config.params,
    headers: config.headers,
    timeout: config.timeout,
    responseType: config.responseType,
  };

  if (method === 'GET') {
    return alovaInstance.Get(config.url, requestConfig).send() as Promise<T>;
  }
  if (method === 'POST') {
    return alovaInstance
      .Post(config.url, config.data, requestConfig)
      .send() as Promise<T>;
  }
  if (method === 'PUT') {
    return alovaInstance
      .Put(config.url, config.data, requestConfig)
      .send() as Promise<T>;
  }
  if (method === 'DELETE') {
    return alovaInstance
      .Delete(config.url, config.data, requestConfig)
      .send() as Promise<T>;
  }
  if (method === 'PATCH') {
    return alovaInstance
      .Patch(config.url, config.data, requestConfig)
      .send() as Promise<T>;
  }
  return Promise.reject(new Error(`不支持的请求方法: ${method}`));
}

interface RequestInstance {
  <T = any>(config: RequestConfig): Promise<T>;
  get<T = any>(
    url: string,
    config?: Omit<RequestConfig, 'url' | 'method' | 'data'>
  ): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, 'url' | 'method'>
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, 'url' | 'method'>
  ): Promise<T>;
  delete<T = any>(
    url: string,
    config?: Omit<RequestConfig, 'url' | 'method'>
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, 'url' | 'method'>
  ): Promise<T>;
}

const request = function requestProxy<T = any>(config: RequestConfig) {
  return sendRequest<T>(config);
} as unknown as RequestInstance;

request.get = function get(url, config) {
  return sendRequest({ ...config, url, method: 'GET' });
};

request.post = function post(url, data, config) {
  return sendRequest({ ...config, url, data, method: 'POST' });
};

request.put = function put(url, data, config) {
  return sendRequest({ ...config, url, data, method: 'PUT' });
};

request.delete = function del(url, config) {
  return sendRequest({ ...config, url, method: 'DELETE' });
};

request.patch = function patch(url, data, config) {
  return sendRequest({ ...config, url, data, method: 'PATCH' });
};

export { alovaInstance };
export default request;
