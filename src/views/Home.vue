<template>
  <a-layout :class="['ecp-layout', device]">
    <a-layout-header class="ecp-layout__header">
      <top-header />
    </a-layout-header>
    <a-layout class="ecp-layout__main">
      <a-layout-sider class="ecp-layout__main-menu" width="200">
        <left-menu />
      </a-layout-sider>
      <a-layout-content class="ecp-layout__main-body">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import device from '@/mixins/device';
import TopHeader from '@/containers/TopHeader';
import LeftMenu from '@/containers/LeftMenu';

export default {
  name: 'Home',
  mixins: [device],
  components: {
    'top-header': TopHeader,
    'left-menu': LeftMenu
  },
  data() {
    return {};
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
    padding: 0;
  }

  &__main-body {
    padding: 10px;
  }
}
</style>
