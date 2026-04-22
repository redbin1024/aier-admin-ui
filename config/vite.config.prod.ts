import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';
import configArcoResolverPlugin from './plugin/arcoResolver';
import configImageminPlugin from './plugin/imagemin';

function appendPlugins(
  target: any[],
  pluginOrPlugins: any | any[]
): void {
  if (!pluginOrPlugins) return;
  if (Array.isArray(pluginOrPlugins)) {
    target.push(...pluginOrPlugins);
    return;
  }
  target.push(pluginOrPlugins);
}

const plugins: any[] = [];

appendPlugins(plugins, configVisualizerPlugin());
appendPlugins(plugins, configArcoResolverPlugin());

if (process.env.BUILD_IMAGEMIN === 'true') {
  appendPlugins(plugins, configImageminPlugin());
}

if (process.env.BUILD_COMPRESS === 'true') {
  appendPlugins(plugins, configCompressPlugin('gzip'));
}

export default mergeConfig(
  {
    mode: 'production',
    plugins,
    build: {
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks: {
            arco: ['@arco-design/web-vue'],
            chart: ['echarts', 'vue-echarts'],
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  },
  baseConfig
);
