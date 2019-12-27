<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    :getPopupContainer="() => $refs.themeIconRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '260px', top: '50px' }"
  >
    <template slot="content">
      <a-card class="top-theme-icon__card" title="主题" :bordered="false">
        <a-tooltip
          class="setting-drawer-theme-color-colorBlock"
          v-for="(item, index) in colorList"
          :key="index"
        >
          <template slot="title">
            {{ item.key }}
          </template>
          <a-tag :color="item.color" @click="changeColor(item.color)">
            <a-icon type="check" v-if="item.color === primaryColor"></a-icon>
          </a-tag>
        </a-tooltip>
      </a-card>
    </template>
    <span class="user-menu-icon" ref="themeIconRef">
      <a-icon style="font-size: 16px; padding: 4px" type="appstore" />
    </span>
  </a-popover>
</template>

<script>
import global from '@/mixins/global';
import device from '@/mixins/device';

import { updateTheme, colorList } from './theme';

export default {
  name: 'ThemeIcon',
  mixins: [global, device],
  data() {
    return {
      colorList
    };
  },
  mounted() {
    updateTheme(this.primaryColor);
  },
  methods: {
    changeColor(color) {
      if (this.primaryColor !== color) {
        this.$store.dispatch('ToggleColor', color);
        updateTheme(color);
      }
    }
  }
};
</script>

<style lang="css">
.top-theme-icon__card .ant-card-head {
  min-height: 28px;
  padding: 0 8px;
  font-weight: 400;
}
.top-theme-icon__card .ant-card-head-title {
  padding: 0;
}
.top-theme-icon__card .ant-card-body {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10px;
}
.top-theme-icon__card .ant-tag {
  display: flex;
  height: 22px;
  width: 22px;
  margin: 10px 12px 0 0;
  justify-content: center;
  align-items: center;
}
</style>

<style lang="less" scoped>
.user-menu-icon {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }
}
</style>
