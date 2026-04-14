import { defineConfig, loadEnv, mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return mergeConfig(
    {
      mode: 'development',
      server: {
        open: true,
        fs: {
          strict: true,
        },
        proxy: {
          [env.VITE_API_BASE_URL]: {
            target: 'https://test.xiaodingdang1.com',
            changeOrigin: true,
            rewrite: (path) =>
              path.replace(new RegExp(`^${env.VITE_API_BASE_URL}`), '/api'),
          },
          '/douyin-api': {
            target: 'https://login.douyin.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/douyin-api/, ''),
          },
        },
      },
      plugins: [
        eslint({
          cache: true,
          include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
          exclude: ['node_modules'],
          failOnWarning: false,
          failOnError: false,
        }),
      ],
    },
    baseConfig
  );
});
