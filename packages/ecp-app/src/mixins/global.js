import { mapState } from 'vuex';

const global = {
  computed: {
    ...mapState({
      layoutMode: state => state.layout,
      navTheme: state => state.theme,
      primaryColor: state => state.color,
      topHeaderColor: state => state.topHeaderColor,
      colorWeak: state => state.weak,
      fixedHeader: state => state.fixedHeader,
      fixSiderbar: state => state.fixSiderbar,
      fixSidebar: state => state.fixSiderbar,
      contentWidth: state => state.contentWidth,
      autoHideHeader: state => state.autoHideHeader,
      sidebarOpened: state => state.sidebar,
      collapsedWidth: state => state.collapsedWidth,
      multiTab: state => state.multiTab
    })
  },
  methods: {
    isTopMenu() {
      return this.layoutMode === 'topmenu';
    },
    isSideMenu() {
      return !this.isTopMenu();
    }
  }
};

export default global;
