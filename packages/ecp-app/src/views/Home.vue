<template>
  <a-layout :class="['ecp-layout', device]">
    <a-layout-header v-if="showGlobalUI" class="ecp-layout__header">
      <top-header />
    </a-layout-header>
    <a-layout class="ecp-layout__main">
      <left-menu v-if="showGlobalUI" />
      <a-layout-content
        class="ecp-layout__main-body"
        v-bind:style="{ 'padding-top': showGlobalUI ? '40px' : '15px' }"
      >
        <multi-tab
          v-if="multiTab && showGlobalUI"
          class="ecp-multi-tabs"
          :style="{ width: multiTabWidth }"
        ></multi-tab>
        <transition name="page-transition">
          <router-view></router-view>
        </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import global from '@/mixins/global';
import device from '@/mixins/device';
import TopHeader from '@/containers/TopHeader';
import LeftMenu from '@/containers/LeftMenu';
import MultiTab from '@/components/MultiTab';

export default {
  name: 'Home',
  mixins: [global, device],
  components: {
    MultiTab,
    'top-header': TopHeader,
    'left-menu': LeftMenu
  },
  data() {
    return {
      showGlobalUI: `${process.env.VUE_APP_SHOW_GLOBAL_UI}` === 'true'
    };
  },
  computed: {
    multiTabWidth() {
      return '100%';
      // return `calc(100% - ${this.sidebarOpened ? 214 : 94}px)`;
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.ecp-layout {
  display: flex;
  flex-direction: column;

  &__header {
    height: 54px;
    line-height: 54px;
    padding: 0;
  }

  &__main-body {
    padding: 40px 0 0;
  }

  .ecp-multi-tabs {
    z-index: 3;
  }
}
</style>
