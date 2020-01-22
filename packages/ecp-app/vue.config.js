const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const ThemeColorReplacer = require('webpack-theme-color-replacer');
const generate = require('@ant-design/colors/lib/generate').default;

const devMode = process.env.NODE_ENV !== 'production';
process.env.VUE_APP_VERSION = require('./package.json').version;

const getAntdSerials = color => {
  const lightens = new Array(9).fill().map((t, i) => {
    return ThemeColorReplacer.varyColor.lighten(color, i / 10);
  });
  const colorPalettes = generate(color);
  const rgb = ThemeColorReplacer.varyColor.toNum3(color.replace('#', '')).join(',');
  return lightens.concat(colorPalettes).concat(rgb);
};

const themePluginOption = {
  fileName: 'css/theme-colors-[contenthash:8].css',
  matchColors: getAntdSerials('#2D4F97'),
  changeSelector(selector) {
    switch (selector) {
      case '.ant-calendar-today .ant-calendar-date':
        return ':not(.ant-calendar-selected-date):not(.ant-calendar-selected-day)' + selector;
      case '.ant-btn:focus,.ant-btn:hover':
        return '.ant-btn:focus:not(.ant-btn-primary):not(.ant-btn-danger),.ant-btn:hover:not(.ant-btn-primary):not(.ant-btn-danger)';
      case '.ant-btn.active,.ant-btn:active':
        return '.ant-btn.active:not(.ant-btn-primary):not(.ant-btn-danger),.ant-btn:active:not(.ant-btn-primary):not(.ant-btn-danger)';
      case '.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon':
      case '.ant-steps-item-process .ant-steps-item-icon>.ant-steps-icon':
        return ':not(.ant-steps-item-process)' + selector;
      case '.ant-menu-horizontal>.ant-menu-item-active,.ant-menu-horizontal>.ant-menu-item-open,.ant-menu-horizontal>.ant-menu-item-selected,.ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-submenu-active,.ant-menu-horizontal>.ant-menu-submenu-open,.ant-menu-horizontal>.ant-menu-submenu-selected,.ant-menu-horizontal>.ant-menu-submenu:hover':
      case '.ant-menu-horizontal > .ant-menu-item-active,.ant-menu-horizontal > .ant-menu-item-open,.ant-menu-horizontal > .ant-menu-item-selected,.ant-menu-horizontal > .ant-menu-item:hover,.ant-menu-horizontal > .ant-menu-submenu-active,.ant-menu-horizontal > .ant-menu-submenu-open,.ant-menu-horizontal > .ant-menu-submenu-selected,.ant-menu-horizontal > .ant-menu-submenu:hover':
        return '.ant-menu-horizontal > .ant-menu-item-active,.ant-menu-horizontal > .ant-menu-item-open,.ant-menu-horizontal > .ant-menu-item-selected,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,.ant-menu-horizontal > .ant-menu-submenu-active,.ant-menu-horizontal > .ant-menu-submenu-open,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover';
      case '.ant-menu-horizontal > .ant-menu-item-selected > a':
      case '.ant-menu-horizontal>.ant-menu-item-selected>a':
        return '.ant-menu-horizontal:not(ant-menu-light):not(.ant-menu-dark) > .ant-menu-item-selected > a';
      case '.ant-menu-horizontal > .ant-menu-item > a:hover':
      case '.ant-menu-horizontal>.ant-menu-item>a:hover':
        return '.ant-menu-horizontal:not(ant-menu-light):not(.ant-menu-dark) > .ant-menu-item > a:hover';
      default:
        return selector;
    }
  }
};

module.exports = {
  parallel: false,

  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },

  // configureWebpack: {
  //   plugins: [new ThemeColorReplacer(themePluginOption)]
  //   optimization: {
  //     // runtimeChunk: 'single',
  //     splitChunks: {
  //       minSize: 10000,
  //       maxSize: 250000,
  //       cacheGroups: {
  //         node_vendors: {
  //           test: /[\\/]node_modules[\\/]/,
  //           // chunks: "async",
  //           priority: 1
  //         }
  //       }
  //     }
  //   }
  // },

  chainWebpack: config => {
    config.resolve.alias.set('@$', path.join(__dirname, 'src'));
    // config.plugins.delete('prefetch');

    config.plugin('MiniCssExtractPlugin').use(
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
      })
    );

    // if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
    //   config.plugin('CompressionPlugin').use(
    //     new CompressionPlugin({
    //       filename: '[path].gz[query]',
    //       cache: true,
    //       algorithm: 'gzip',
    //       test: new RegExp('\\.(js|css)$'),
    //       threshold: 1024,
    //       minRatio: 0.8,
    //       compressionOptions: { level: 6 }
    //     })
    //   );
    // }

    config.plugin('ThemeColorReplacer').use(new ThemeColorReplacer(themePluginOption));

    // config.module
    //   .rule('css')
    //   .test(/\.less$/i)
    //   .use('less-loader')
    //   .tap(options => {
    //     return {
    //       ...options,
    //       javascriptEnabled: true
    //     };
    //   });
    // config.module
    //   .rule('worker')
    //   .test(/\.worker\.js$/i)
    //   .use('worker-loader')
    //   .loader('worker-loader')
    //   .tap(options => {
    //     if (!options) options = {};
    //     // options.publicPath = '/workers/';
    //     if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    //       options.name = `[hash].${(Math.random() * 1e32).toString(36)}-worker.js`;
    //     } else {
    //       options.name = '[hash].worker.js';
    //     }
    //     options.inline = true;
    //     options.fallback = false;
    //     return options;
    //   });
  }
};
