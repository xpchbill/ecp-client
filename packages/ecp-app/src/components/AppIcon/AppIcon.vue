<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    :getPopupContainer="() => $refs.appIconRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '280px', top: '50px' }"
  >
    <template slot="content">
      <a-tabs class="app-icon__tabs">
        <a-tab-pane tab="Android" key="1">
          <a-icon type="android" />
        </a-tab-pane>
        <a-tab-pane tab="Apple" key="2">
          <a-icon type="apple" />
        </a-tab-pane>
      </a-tabs>
    </template>
    <span class="user-menu-icon" ref="appIconRef">
      <a-icon style="font-size: 16px; padding: 4px" type="mobile" />
    </span>
  </a-popover>
</template>

<script>
export default {
  name: 'AppIcon'
};
</script>

<style lang="less" scoped>
.user-menu-icon {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }
}
.app-icon__tabs {
  .anticon {
    width: 50px;
    height: 50px;
    font-size: 50px;
  }

  .ant-tabs-tabpane {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
}
</style>
