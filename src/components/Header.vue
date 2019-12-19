<template lang="html">
  <a-layout :class="['layout', device]">
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>
    </a-drawer>
  </a-layout>
</template>

<script>
import global from '@/mixins/global';
import device from '@/mixins/device';

export default {
  name: 'Header',
  mixins: [global, device],
  components: {},
  data() {
    return {
      collapsed: false,
      menus: []
    }
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
</style>
