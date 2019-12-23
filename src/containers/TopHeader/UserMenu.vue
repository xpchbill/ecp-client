<template>
  <div class="user-wrapper">
    <div class="content-box">
      <span>
        <span class="user-menu-item action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </span>
      <app-icon class="user-menu-item action" />
      <theme-icon class="user-menu-item action" />
      <notice-icon class="user-menu-item action" />
      <a-dropdown :trigger="['click']">
        <span class="user-menu-item action ant-dropdown-link user-dropdown-menu">
          <!-- <a-avatar class="avatar" size="small" :src="avatar"/> -->
          <span>Bill Xiong</span>
          <a-icon type="down" />
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user" />
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting" />
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2" disabled>
            <a-icon type="setting" />
            <span>测试</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/AppIcon';
import ThemeIcon from '@/components/ThemeIcon';
import NoticeIcon from '@/components/NoticeIcon';

export default {
  name: 'UserMenu',
  components: {
    AppIcon,
    ThemeIcon,
    NoticeIcon
  },
  computed: {},
  methods: {
    handleLogout() {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({})
            .then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 16);
            })
            .catch(err => {
              this.$message.error({
                title: '错误',
                description: err.message
              });
            });
        },
        onCancel() {}
      });
    }
  }
};
</script>

<style lang="less" scoped>
.user-menu-item {
  cursor: pointer;

  padding: 0 12px;
}

.user-dropdown-menu {
  span {
    user-select: none;
    margin-right: 4px;
  }
}
</style>
