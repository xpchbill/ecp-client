<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input v-model="queryParam.id" placeholder />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="付款状态">
              <a-select
                v-model="queryParam.status"
                placeholder="请选择"
                default-value="0"
                @change="onStatusChange"
              >
                <a-select-option value="-1">全部</a-select-option>
                <a-select-option value="0">未支付</a-select-option>
                <a-select-option value="1">定金已付</a-select-option>
                <a-select-option value="2">已付清</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number v-model="queryParam.callNo" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker
                  v-model="queryParam.date"
                  style="width: 100%"
                  placeholder="请输入更新日期"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="付款状态">
                <a-select
                  v-model="queryParam.pay_status"
                  placeholder="请选择"
                  default-value="0"
                  @change="onStatusChange"
                >
                  <a-select-option value="-1">全部</a-select-option>
                  <a-select-option value="0">未支付</a-select-option>
                  <a-select-option value="1">定金已付</a-select-option>
                  <a-select-option value="2">已付清</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="付款状态">
                <a-select
                  v-model="queryParam.status"
                  placeholder="请选择"
                  default-value="0"
                  @change="onStatusChange"
                >
                  <a-select-option value="-1">全部</a-select-option>
                  <a-select-option value="0">未支付</a-select-option>
                  <a-select-option value="1">定金已付</a-select-option>
                  <a-select-option value="2">已付清</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
            >
              <a-button type="primary" @click="onSearch">查询</a-button>
              <a-button style="margin-left: 8px" @click="onResetFilters">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
      <a-dropdown v-action:edit :disabled="selectedRowKeys.length === 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"> <a-icon type="delete" />删除 </a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"> <a-icon type="lock" />锁定 </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
      <a-button type="dashed" @click="tableOption"
        >{{ (optionAlertShow && '未支付') || '开启' }} alert</a-button
      >
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="billsn"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :scroll="{ x: 2550, y: 380 }"
      :rowSelection="options.rowSelection"
      showPagination="auto"
    >
      <span slot="pay_status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">配置</a>
          <a-divider type="vertical" />
          <a @click="handleSub(record)">订阅报警</a>
        </template>
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
    <step-by-step-modal ref="modal" @ok="handleOk" />
  </a-card>
</template>

<script>
import scmAPI from '@/api/scm';
import STable from '@/components/Table';

import CreateForm from './CreateForm';
import StepByStepModal from './StepByStepModal';

const statusMap = {
  0: {
    status: 'error',
    text: '未支付'
  },
  1: {
    status: 'processing',
    text: '定金已付'
  },
  2: {
    status: 'success',
    text: '已付清'
  }
};

export default {
  components: {
    STable,
    CreateForm,
    StepByStepModal
  },
  data() {
    return {
      mdl: {},
      // 高级搜索 展开/未支付
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        // {
        //   title: '#',
        //   fixed: 'left',
        //   width: 100,
        //   scopedSlots: { customRender: 'serial' }
        // },
        {
          title: '产品类别',
          fixed: 'left',
          width: 100,
          dataIndex: 'production_order_type',
          customRender: v => {
            if (v == null || v == '')
              return '-';
            var types=['', '生态门', '钛镁合金门', '烤漆门'];
            return types[v];
          }
        },
        {
          title: '产品',
          width: 200,
          dataIndex: 'product_name'
        },
        {
          title: '订单编号',
          dataIndex: 'billsn',
          sorter: true,
          width: 200
        },
        {
          title: '子订单数',
          dataIndex: 'sub_order_quantity',
          width: 200,
          customRender: text => text + ' 单',
          needTotal: true,
          sorter: true
        },
        {
          title: '经销商',
          dataIndex: 'customer_name',
          width: 200,
          sorter: true
        },
        {
          title: '付款状态',
          dataIndex: 'pay_status',
          sorter: true,
          width: 200,
          scopedSlots: { customRender: 'pay_status' }
        },
        {
          title: '类型',
          dataIndex: 'ordertype',
          sorter: true,
          width: 200,
          customRender: v => {
            var order_type=["采购订单","采购退货单","销售订单","销售退货单","报价","生产订单","生产退货单"]
            return order_type[v];
          }
        },
        {
          title: '订单金额',
          dataIndex: 'order_amt',
          sorter: true,
          width: 200
        },
        {
          title: '定金',
          dataIndex: 'subscription',
          sorter: true,
          width: 200
        },
        {
          title: '未结金额',
          dataIndex: 'unpaid',
          sorter: true,
          width: 200
        },
        {
          title: '审核状态',
          dataIndex: 'audit_status',
          sorter: true,
          width: 200
        },
        {
          title: '审核人',
          dataIndex: 'auditor_name',
          sorter: true,
          width: 200
        },
        {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          width: 200,
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: params => {
        return scmAPI
          .getOrderList({
            keyword: '',
            start_date: '2019-11-13',
            end_date: '2020-02-11',
            status: '',
            ordertype: 5,
            is_deleted: 0,
            qryType: 5,
            pay_status: '',
            product_id: '',
            product_category_id: '',
            submit_status: '',
            order_status: '',
            _search: false,
            nd: 1581406436620,
            ...params,
            ...this.queryParam
          })
          .then(res => {
            return res.data;
          });
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = [];
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    };
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text;
    },
    statusTypeFilter(type) {
      return statusMap[type].status;
    }
  },
  created() {
    this.tableOption();
    // getRoleList({ t: new Date() });
  },
  methods: {
    onStatusChange(value) {
      this.queryParam.pay_status = value;
      if (value === '-1') {
        delete this.queryParam.pay_status;
      }
      this.$refs.table.refresh();
    },
    onResetFilters() {
      this.queryParam = {};
      this.$refs.table.refresh();
    },
    onSearch() {
      this.$refs.table.refresh();
    },
    tableOption() {
      if (!this.optionAlertShow) {
        this.options = {
          alert: {
            show: true,
            clear: () => {
              this.selectedRowKeys = [];
            }
          },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
              props: {
                // disabled: record.no === 'No 2', // Column configuration not to be checked
                name: record.billsn
              }
            })
          }
        };
        this.optionAlertShow = true;
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        };
        this.optionAlertShow = false;
      }
    },

    handleEdit(record) {
      // console.log(record);
      this.$refs.modal.edit(record);
    },
    handleSub(record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`);
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已未支付`);
      }
    },
    handleOk(params) {
      return scmAPI.addOrder(params).then(() => {
        this.$refs.modal.currentStep = 0;
        this.$refs.modal.visible = false;
        this.$refs.table.refresh();
      });
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    resetSearchForm() {
      this.queryParam = {
        date: null
      };
    }
  }
};
</script>
