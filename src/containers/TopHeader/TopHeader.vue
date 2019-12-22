<template lang="html">
  <div :class="['ecp-top-header', device]">
    <div class="ecp-top-header__title">System Logo</div>
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import global from '@/mixins/global';
import device from '@/mixins/device';

export default {
  name: 'TopHeader',
  mixins: [global, device],
  props: {},
  components: {},
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    // contentPaddingLeft () {
    //   if (!this.fixSidebar || this.isMobile()) {
    //     return '0'
    //   }
    //   if (this.sidebarOpened) {
    //     return '256px'
    //   }
    //   return '80px'
    // }
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
      // triggerWindowResizeEvent();
    }
  }
};
</script>

<style lang="less" scoped>
.ecp-top-header {
  display: flex;
  align-items: center;
  background: #fff;

  &__title {
    flex: 0 0 200px;
    padding: 0 20px;
  }
}
</style>
