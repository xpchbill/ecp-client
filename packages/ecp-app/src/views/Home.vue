<template>
  <a-layout :class="['ecp-layout', device]">
    <a-layout-header class="ecp-layout__header">
      <top-header />
    </a-layout-header>
    <a-layout class="ecp-layout__main">
      <left-menu />
      <a-layout-content class="ecp-layout__main-body">
        <multi-tab
          v-if="multiTab"
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
    return {};
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
}
</style>
