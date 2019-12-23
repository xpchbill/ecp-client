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
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
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
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
            >
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => (queryParam = {})">重置</a-button>
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
      <a-button type="dashed" @click="tableOption"
        >{{ (optionAlertShow && '关闭') || '开启' }} alert</a-button
      >
      <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
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
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="description" slot-scope="text">
        <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
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
import STable from '@/components/Table';
import Ellipsis from '@/components/Ellipsis';

import CreateForm from './CreateForm';
import StepByStepModal from './StepByStepModal';

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
};

export default {
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal
  },
  data() {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '规则编号',
          dataIndex: 'no'
        },
        {
          title: '描述',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '服务调用次数',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          customRender: text => text + ' 次'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: () => {
        // console.log('loadData.parameter', parameter);
        return Promise.resolve({
          pageSize: 10,
          pageNo: 1,
          totalCount: 5701,
          totalPage: 571,
          data: [
            {
              key: 1,
              id: 1,
              no: 'No 1',
              description: '这是一段描述',
              callNo: 974,
              status: 2,
              updatedAt: '1982-09-03 20:29:05',
              editable: false
            },
            {
              key: 2,
              id: 2,
              no: 'No 2',
              description: '这是一段描述',
              callNo: 595,
              status: 2,
              updatedAt: '1991-06-16 05:24:30',
              editable: false
            },
            {
              key: 3,
              id: 3,
              no: 'No 3',
              description: '这是一段描述',
              callNo: 302,
              status: 2,
              updatedAt: '1991-01-21 06:32:06',
              editable: false
            },
            {
              key: 4,
              id: 4,
              no: 'No 4',
              description: '这是一段描述',
              callNo: 856,
              status: 2,
              updatedAt: '1984-06-09 14:16:13',
              editable: false
            },
            {
              key: 5,
              id: 5,
              no: 'No 5',
              description: '这是一段描述',
              callNo: 667,
              status: 0,
              updatedAt: '1978-10-19 03:39:39',
              editable: false
            },
            {
              key: 6,
              id: 6,
              no: 'No 6',
              description: '这是一段描述',
              callNo: 125,
              status: 0,
              updatedAt: '2013-05-12 13:33:10',
              editable: false
            },
            {
              key: 7,
              id: 7,
              no: 'No 7',
              description: '这是一段描述',
              callNo: 853,
              status: 1,
              updatedAt: '1970-11-20 11:30:44',
              editable: false
            },
            {
              key: 8,
              id: 8,
              no: 'No 8',
              description: '这是一段描述',
              callNo: 436,
              status: 3,
              updatedAt: '1991-01-17 16:37:55',
              editable: false
            },
            {
              key: 9,
              id: 9,
              no: 'No 9',
              description: '这是一段描述',
              callNo: 404,
              status: 2,
              updatedAt: '2007-07-09 10:07:04',
              editable: false
            },
            {
              key: 10,
              id: 10,
              no: 'No 10',
              description: '这是一段描述',
              callNo: 358,
              status: 3,
              updatedAt: '1980-05-10 14:23:51',
              editable: false
            }
          ]
        });
        // return getServiceList(Object.assign(parameter, this.queryParam))
        //   .then(res => {
        //     return res.result
        //   })
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
                disabled: record.no === 'No 2', // Column configuration not to be checked
                name: record.no
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
        this.$message.error(`${record.no} 订阅失败，规则已关闭`);
      }
    },
    handleOk() {
      this.$refs.table.refresh();
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
