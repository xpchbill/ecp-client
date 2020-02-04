import classnames from 'classnames';
import Icon from 'ant-design-vue/es/icon';
import Popover from 'ant-design-vue/es/popover';

export default {
  name: 'DrawerMenuItem',
  props: {
    itemData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visible: false
    };
  },
  mounted() {
    this.updateMenu();
  },
  watch: {
    $route: function() {
      this.updateMenu();
      this.hide();
    }
  },
  methods: {
    hide() {
      this.visible = false;
    },
    handleVisibleChange(visible) {
      this.visible = visible;
    },
    updateMenu() {
      const routes = this.$route.matched.concat();
      const { hidden } = this.$route.meta;
      if (routes.length >= 3 && hidden) {
        routes.pop();
        this.selectedKeys = [routes[routes.length - 1].path];
      } else {
        this.selectedKeys = [routes.pop().path];
      }
    },
    renderChildren(children) {
      if (children) {
        const { path } = this.$route;

        return (
          <ul class="ecp-left-popover-list__content">
            {children.map(child => (
              <li>
                {path !== child.path ? (
                  <router-link to={child.path}>{child.meta.title}</router-link>
                ) : (
                  child.meta.title
                )}
              </li>
            ))}
          </ul>
        );
      }
      return null;
    },
    // render
    renderItem(itemData) {
      if (!itemData.hidden) {
        const children = this.renderChildren(itemData.children);
        return (
          <div class="ecp-left-popover-list">
            <div class="ecp-left-popover-list__title">{itemData.meta.title}</div>
            {children}
          </div>
        );
      }
      // if (!itemData.hidden && itemData.children && itemData.children.length) {
      //   return itemData.children.map(item => {
      //     if (item.hidden) {
      //       return null;
      //     }
      //     return <DrawerMenuItem itemData={item} />;
      //   });
      // }
      return null;
    }
  },

  render() {
    const { visible } = this;
    const { itemData } = this.$props;
    const childItems = itemData.children.map(child => this.renderItem(child));
    const routes = this.$route.matched.concat();
    const isActiveItem = routes.some(route => route.path && route.path === itemData.path);
    const classes = classnames('ecp-drawer-menu-item', {
      'is-active': isActiveItem
    });

    return (
      <Popover
        overlayClassName="ecp-drawer-menu-popover"
        placement="rightTop"
        visible={visible}
        // trigger="click"
        on-visibleChange={this.handleVisibleChange}>
        <template slot="content">{childItems}</template>
        <div class={classes}>
          <Icon type={itemData.meta.icon} />
          {itemData.meta.title}
        </div>
      </Popover>
    );
  }
};
