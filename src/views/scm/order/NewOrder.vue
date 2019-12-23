<template>
  <div>
    <a-card class="card" title="Tabs" :bordered="false">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="Tab 1" key="1">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane tab="Tab 2" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane tab="Tab 3" key="3">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </a-card>

    <a-card class="card" title="新增生产订单" :bordered="false">
      <a-form @submit="handleSubmit" :form="form" class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item label="仓库名">
              <a-input
                placeholder="请输入仓库名称"
                v-decorator="[
                  'name',
                  { rules: [{ required: true, message: '请输入仓库名称', whitespace: true }] }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 7, offset: 1 }" :lg="{ span: 8 }" :md="{ span: 12 }" :sm="24">
            <a-form-item label="仓库域名">
              <a-input
                addonBefore="http://"
                addonAfter=".com"
                placeholder="请输入"
                v-decorator="[
                  'url',
                  {
                    rules: [
                      { required: true, message: '请输入仓库域名', whitespace: true },
                      { validator: validate }
                    ]
                  }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 9, offset: 1 }" :lg="{ span: 10 }" :md="{ span: 24 }" :sm="24">
            <a-form-item label="仓库管理员">
              <a-select
                placeholder="请选择管理员"
                v-decorator="['owner', { rules: [{ required: true, message: '请选择管理员' }] }]"
              >
                <a-select-option value="王同学">王同学</a-select-option>
                <a-select-option value="李同学">李同学</a-select-option>
                <a-select-option value="黄同学">黄同学</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item label="审批人">
              <a-select
                placeholder="请选择审批员"
                v-decorator="['approver', { rules: [{ required: true, message: '请选择审批员' }] }]"
              >
                <a-select-option value="王晓丽">王晓丽</a-select-option>
                <a-select-option value="李军">李军</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 7, offset: 1 }" :lg="{ span: 8 }" :md="{ span: 12 }" :sm="24">
            <a-form-item label="生效日期">
              <a-range-picker
                style="width: 100%"
                v-decorator="[
                  'dateRange',
                  { rules: [{ required: true, message: '请选择生效日期' }] }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 9, offset: 1 }" :lg="{ span: 10 }" :md="{ span: 24 }" :sm="24">
            <a-form-item label="仓库类型">
              <a-select
                placeholder="请选择仓库类型"
                v-decorator="['type', { rules: [{ required: true, message: '请选择仓库类型' }] }]"
              >
                <a-select-option value="公开">公开</a-select-option>
                <a-select-option value="私密">私密</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item v-if="showSubmit">
          <a-button htmlType="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-card>

    <!-- fixed footer toolbar -->
    <!-- <footer-tool-bar :style="{ width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}"> -->
    <footer-tool-bar :style="{ width: footerToolBarWidth }">
      <a-button type="primary">提交</a-button>
      <a-button>返回</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import global from '@/mixins/global';
import device from '@/mixins/device';
import FooterToolBar from '@/components/FooterToolbar';

export default {
  name: 'NewOrder',
  mixins: [global, device],
  props: {
    showSubmit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    FooterToolBar
  },
  data() {
    return {
      // collapsed: false,
      form: this.$form.createForm(this)
    };
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val;
    }
  },
  created() {
    this.collapsed = !this.sidebarOpened;
  },
  mounted() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed;
        setTimeout(() => {
          this.collapsed = !this.collapsed;
        }, 16);
      });
    }
  },
  computed: {
    footerToolBarWidth() {
      return this.isSideMenu() && this.isDesktop()
        ? `calc(100% - ${this.sidebarOpened ? 200 : 60}px)`
        : '100%';
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$notification['error']({
            message: 'Received values of form:',
            description: values
          });
        }
      });
    },
    validate(rule, value, callback) {
      const regex = /^user-(.*)$/;
      if (!regex.test(value)) {
        callback(new Error('需要以 user- 开头'));
      }
      callback();
    },
    scrollToField(fieldKey) {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 24px;
}
</style>
