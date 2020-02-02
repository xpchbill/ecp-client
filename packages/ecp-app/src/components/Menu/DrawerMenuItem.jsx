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
    // this.updateMenu();
  },
  watch: {
    $route: function() {
      // this.updateMenu();
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
    renderChildren(children) {
      if (children) {
        return (
          <ul class="ecp-left-popover-list__content">
            {children.map(child => (
              <li>
                <router-link to={child.path}>{child.meta.title}</router-link>
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

    return (
      <Popover
        overlayClassName="ecp-drawer-menu-popover"
        placement="rightTop"
        visible={visible}
        on-visibleChange={this.handleVisibleChange}>
        <template slot="content">{childItems}</template>
        <div class="ecp-drawer-menu-item">
          {itemData.meta.title}
          <Icon type={itemData.meta.icon} />
        </div>
      </Popover>
    );
  }
};
