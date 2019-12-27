<template lang="html">
  <div :class="['ecp-top-header', device]">
    <div class="ecp-top-header__title">System Name</div>
    <user-menu></user-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import global from '@/mixins/global';
import device from '@/mixins/device';

import UserMenu from './UserMenu';

export default {
  name: 'TopHeader',
  mixins: [global, device],
  props: {},
  components: {
    UserMenu
  },
  data() {
    return {
      collapsed: false
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
    toggle() {
      this.collapsed = !this.collapsed;
      this.setSidebar(!this.collapsed);
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
