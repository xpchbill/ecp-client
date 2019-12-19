<!-- Copyright 2019 Edouard Maleix, read LICENSE -->

<template lang="html">
  <div class="not-found-view">
    <h5>Error 404</h5>
    <br />
    <p>Are you lost ?</p>
    <p>
      <router-link to="/" class="go-back-home">
        <i class="fa fa-arrow-left" />
        This way !
      </router-link>
    </p>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'NotFound',

  components: {
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>
