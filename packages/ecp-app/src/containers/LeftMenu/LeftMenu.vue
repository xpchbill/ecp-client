<template>
  <a-layout-sider
    collapsible
    class="ecp-layout__main-menu"
    :collapsed="collapsed"
    :theme="navTheme"
    :collapsedWidth="collapsedWidth"
    @collapse="toggle"
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
import { mapActions } from 'vuex';
import global from '@/mixins/global';
import device from '@/mixins/device';

import SideMenu from '@/components/Menu/SideMenu';
import { routes } from '@/router';
import triggerWindowResizeEvent from '@/utils/triggerWindowResizeEvent';

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
    ...mapActions(['setSidebar']),
    drawerClose() {
      this.collapsed = false;
    },
    toggle() {
      this.collapsed = !this.collapsed;
      this.setSidebar(!this.collapsed);
      triggerWindowResizeEvent();
    }
  }
};
</script>

<style lang="less" scoped>
.ecp-layout__main-menu {
  z-index: 10;
  box-shadow: 4px 0 4px 0 rgba(217, 217, 217, 0.5);
}
</style>
