<template>
  <s-menu
    :collapsed="collapsed"
    :menu="menus"
    :theme="theme"
    :mode="mode"
    @select="onSelect"
  ></s-menu>
</template>

<script>
import SMenu from './index';
import global from '@/mixins/global';
import device from '@/mixins/device';

export default {
  name: 'SideMenu',
  components: { SMenu },
  mixins: [global, device],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'light'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj);
    }
  }
};
</script>
