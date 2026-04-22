/**
 * Image resource files used to compress the output of the production environment
 * 图片压缩
 * https://github.com/anncwb/vite-plugin-imagemin
 */
export default function configImageminPlugin() {
  let viteImagemin: any;
  try {
    viteImagemin = (Function('return require')() as any)('vite-plugin-imagemin').default;
  } catch (error) {
    throw new Error(
      'BUILD_IMAGEMIN=true 需要安装 vite-plugin-imagemin（已默认关闭图片压缩以提升构建稳定性）'
    );
  }
  const imageminPlugin = viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    mozjpeg: {
      quality: 20,
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4,
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox',
        },
        {
          name: 'removeEmptyAttrs',
          active: false,
        },
      ],
    },
  });
  return imageminPlugin;
}
