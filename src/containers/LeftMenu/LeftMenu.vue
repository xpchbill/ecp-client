<template>
  <a-layout :class="['layout', device]">
    <side-menu
      v-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>
  </a-layout>
</template>

<script>
import global from '@/mixins/global';
import device from '@/mixins/device';

import SideMenu from '@/components/Menu/SideMenu';
import { routes } from '@/router';

export default {
  name: 'LeftMenu',
  mixins: [global, device],
  components: {
    SideMenu
  },
  data() {
    return {
      collapsed: false,
      menus: [
        ...routes[0].children
      ]
    };
  },
  mounted() {},
  methods: {
    drawerClose() {
      this.collapsed = false;
    }
  }
};
</script>
