<template>
  <a-layout-sider
    v-model="collapsed"
    class="ecp-layout__main-menu"
    :theme="navTheme"
    :collapsedWidth="collapsedWidth"
  >
    <side-menu
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>
  </a-layout-sider>
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
      menus: [...routes[0].children]
    };
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val;
    }
  },
  created() {
    this.collapsed = !this.sidebarOpened;
  },
  mounted() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed;
        setTimeout(() => {
          this.collapsed = !this.collapsed;
        }, 16);
      });
    }
  },
  methods: {
    drawerClose() {
      this.collapsed = false;
    }
  }
};
</script>
