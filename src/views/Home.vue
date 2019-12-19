<template lang="html">
  <a-layout :class="['layout', device]">
    <frame-header></frame-header>
    <router-view></router-view>
  </a-layout>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'Home',
  components: {
    'frame-header': Header,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
</style>
