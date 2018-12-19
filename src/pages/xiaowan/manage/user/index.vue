<template>
  <d2-container type="card">
    <template slot="header">用户管理</template>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input placeholder="账号" v-model="searchForm.userName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="searchForm.date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.status" style="width:120px;" placeholder="状态">
              <el-option v-for="item in optionsStatus" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchResult">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportExcel">
              <d2-icon name="download" />
              导出 Excel
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div>
      <d2-crud :loading='tableLoading' @recharge="handleCustomEvent" :rowHandle="rowHandle" :columns="columnsTable" :data="dataTable" :options="optionsTable" />
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[50, 100, 200, 400]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalTable">
      </el-pagination>
    </div>
    <el-dialog @close="closeDialog" :title="dialogTitle" :visible.sync="dialogFormVisible" v-loading='formLoading' width="25%">
      <el-form :rules='rules' :model="rechargeForm" ref="rechargeForm">
        <el-form-item label="充值金额" label-width="80px" prop="rechargeAmount">
          <el-input v-model="rechargeForm.rechargeAmount" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="rechargeSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    var rechargeAmount = (rule, value, callback) => {
      var pa = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
      if (value === "") {
        callback(new Error("请输入充值金额"));
      } else if (!pa.test(value)) {
        callback(new Error("充值金额格式错误"));
      } else {
        callback();
      }
    };
    return {
      columnsTable: [
        {
          title: "ID",
          key: "id",
          resizable:true,
        },
        {
          title: "账户",
          key: "userName",
          resizable:true,
        },
        // 格式化时间
        {
          title: "注册时间",
          key: "date",
          sortable: true,
          formatter(cellValue) {
            return cellValue.date;
          },
          resizable:true,
        },
        // 按照大小排序
        {
          title: "资格",
          key: "score",
          sortable: true,
          sortMethod(a, b) {
            return a.score - b.score
          },
          resizable:true,
        },
      ],
      rowHandle: {
        custom: [
          {
            text: "充值",
            type: "primary",
            size: "middle",
            emit: "recharge"
          }
        ]
      },
      dataTable: [
        {
          id: 1,
          date: '2016-05-02',
          userName: '王小虎',
          score: 10000
        },
        {
          id: 2,
          date: '2016-05-04',
          userName: '王小虎',
          score: 20000
        },
      ],
      optionsTable: {
        defaultSort: {
          prop: "registerDate",
          order: "descending"
        },
        border:true,
      },
      optionsStatus: [
        {
          value: "0",
          label: "所有状态"
        },
        {
          value: "1",
          label: "冻结"
        },
        {
          value: "2",
          label: "解冻"
        }
      ],
      pageSize: 100,
      currentPage: 1,
      totalTable: 1,
      searchForm: {
        userName: "",
        date: "",
        status: "0"
      },
      afterSearchForm: {
        userName: "",
        date: "",
        status: "0"
      },
      tableLoading: false,
      dialogFormVisible: false,
      rechargeForm: {
        rechargeAmount: 0
      },
      // 校验
      rules: {
        rechargeAmount: [{ validator: rechargeAmount, trigger: "blur" }]
      },
      formLoading: false,
      //用户充值的id
      userId: "",
      userName: "",
      dialogTitle: "",
      url:'/api/member/exportMember',
    };
  },
  methods: {
    xhrRequset() {
      let vm = this;
    },
    searchResult() {
      this.xhrRequset();
    },
    closeDialog() {
      this.$refs["rechargeForm"].resetFields();
    },
    rechargeSubmit() {
      let vm = this;
      vm.formLoading = true;
    },
    handleCustomEvent({ index, row }) {
      this.dialogFormVisible = true;
      this.userId = row.userId;
      this.userName = row.userName;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.xhrRequset();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.xhrRequset();
    },
    exportExcel() {
    }
  },
  mounted() {
    this.xhrRequset();
  }
};
</script>
