import { message } from 'ant-design-vue/es';
import client from 'webpack-theme-color-replacer/client';
import generate from '@ant-design/colors/lib/generate';

message.config({
  top: '8px',
  duration: 2,
  maxCount: 3
});

const themeColor = {
  getAntdSerials(color) {
    const lightens = new Array(9).fill().map((t, i) => {
      return client.varyColor.lighten(color, i / 10);
    });
    const colorPalettes = generate(color);
    const rgb = client.varyColor.toNum3(color.replace('#', '')).join(',');
    return lightens.concat(colorPalettes).concat(rgb);
  },
  changeColor(newColor) {
    var options = {
      newColors: this.getAntdSerials(newColor),
      changeUrl(cssUrl) {
        return `/${cssUrl}`;
      }
    };
    return client.changer.changeColor(options, Promise).then(() => {
      console.log('Theme colors changed!'); // eslint-disable-line
    });
  }
};

const colorList = [
  {
    key: '默认蓝',
    color: '#2D4F97'
  },
  {
    key: '明青',
    color: '#21a0a0'
  },
  {
    key: '薄暮',
    color: '#c92828'
  },
  {
    key: '火山',
    color: '#d14719'
  },
  {
    key: '极光绿',
    color: '#39820f'
  },
  {
    key: '拂晓蓝',
    color: '#2787db'
  },
  {
    key: '极客蓝',
    color: '#1136c6'
  },
  {
    key: '酱紫',
    color: '#6837ad'
  }
];

const updateTheme = newPrimaryColor => {
  const hideMessage = message.loading('正在切换主题！', 0);
  themeColor.changeColor(newPrimaryColor).finally(() => {
    setTimeout(() => {
      hideMessage();
    });
  });
};

export { updateTheme, colorList, themeColor };
