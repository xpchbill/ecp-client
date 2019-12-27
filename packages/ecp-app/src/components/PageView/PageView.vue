<template>
  <div class="ecp-page-view">
    <router-view ref="content" />
  </div>
</template>

<script>
export default {
  name: 'PageView',
  components: {},
  props: {},
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.ecp-page-view {
  padding: 10px 20px;
}
</style>
