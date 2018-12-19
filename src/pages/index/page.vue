<template>
  <d2-container>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="adminUpdateDialogForm"
    >
      <el-row
        class="parameterformRow"
        :gutter="20"
      >
        <el-col
          class="parameterformRow-name"
          :span="3"
        >姓名</el-col>
        <el-col :span="10">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              style="width:250px;"
              maxlength="20"
              placeholder="0~20位字母与数字"
            > </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        class="parameterformRow"
        :gutter="20"
      >
        <el-col
          class="parameterformRow-name"
          :span="3"
        >账号</el-col>
        <el-col :span="10">
          <el-form-item prop="loginName">
            <el-input
              v-model="form.loginName"
              style="width:250px;"
              maxlength="20"
              placeholder="0~20位字母与数字"
            > </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        class="parameterformRow"
        :gutter="20"
      >
        <el-col
          class="parameterformRow-name"
          :span="3"
        >密码</el-col>
        <el-col :span="10">
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              style="width:250px;"
              minlength="8"
              maxlength="20"
              placeholder="********"
            > </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        class="parameterformRow"
        :gutter="20"
      >
        <el-col
          class="parameterformRow-name"
          :span="3"
        >确认密码</el-col>
        <el-col :span="10">
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              type="password"
              style="width:250px;"
              minlength="8"
              maxlength="20"
              placeholder="********"
            > </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        class="parameterformRow"
        :gutter="20"
      >
        <el-col
          class="parameterformRow-name"
          :span="3"
        >权限</el-col>
        <el-col :span="18">
          <el-form-item prop="checkList">
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox
                label="用户管理"
                class="ruleCheckbox"
              >用户管理</el-checkbox>
              <el-checkbox
                label="奖励明细"
                class="ruleCheckbox"
              >奖励明细</el-checkbox>
              <el-checkbox
                label="充值记录"
                class="ruleCheckbox"
              >充值记录</el-checkbox>
              <el-checkbox
                label="提现记录"
                class="ruleCheckbox"
              >提现记录</el-checkbox>
              <el-checkbox
                label="参数设置"
                class="ruleCheckbox"
              >参数设置</el-checkbox>
              <el-checkbox
                label="公告管理"
                class="ruleCheckbox"
              >公告管理</el-checkbox>
              <el-checkbox
                label="管理员账户"
                class="ruleCheckbox"
              >管理员账户</el-checkbox>
              <el-checkbox
                label="币价管理"
                class="ruleCheckbox"
              >币价管理</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button @click="test">test</el-button>
    </el-form>
  </d2-container>
</template>

<script>
export default {
  components: {},
  data() {
    var username = (rule, value, callback) => {
      var pa = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else if (!pa.test(value)) {
        callback(new Error("格式错误"));
      } else {
        callback();
      }
    };
    var loginName = (rule, value, callback) => {
      var pa = /^[a-zA-Z0-9]{0,20}$/;
      if (value === "") {
        callback(new Error("请输入账号名"));
      } else if (!pa.test(value)) {
        callback(new Error("格式错误"));
      } else {
        callback();
      }
    };
    var password = (rule, value, callback) => {
      var pa = /^([a-zA-Z0-9!@#$%^~.,&*()_?<>{}]){8,20}/;
      if (!pa.test(value) && value != "") {
        callback(new Error("格式错误"));
      } else {
        callback();
      }
    };
    var confirmPassword = (rule, value, callback) => {
      var pa = /^([a-zA-Z0-9!@#$%^~.,&*()_?<>{}]){8,20}/;
      if (value != this.form.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    var checkList = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error("请至少选择一个权限"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        loginName: "",
        checkList: [],
        confirmPassword: "",
        password: "",
        userId: ""
      },
      rules: {
        username: [{ validator: username, trigger: "blur" }],
        loginName: [{ validator: loginName, trigger: "blur" }],
        password: [{ validator: password, trigger: "blur" }],
        confirmPassword: [{ validator: confirmPassword, trigger: "blur" }],
        checkList: [{ validator: checkList, trigger: "blur" }]
      },
      dialogFormVisible: false,
      columnsTable: [
        {
          title: "账户",
          key: "userName",
          resizable: true
        },
        {
          title: "姓名",
          key: "name",
          resizable: true
        },
        {
          title: "权限",
          key: "permission",
          formatter(row, column, cellValue, index) {
            return (cellValue = cellValue.join(","));
          },
          resizable: true
        }
      ],
      dataTable: [],
      rowHandle: {
        custom: [
          {
            text: "修改",
            type: "primary",
            size: "middle",
            emit: "edit"
          },
          {
            text: "删除",
            type: "danger",
            size: "middle",
            emit: "del"
          }
        ]
      },
      optionsTable: {
        defaultSort: {
          prop: "date",
          order: "descending"
        },
        highlightCurrentRow: true,
        border: true
      },
      pageSize: 100,
      currentPage: 1,
      totalTable: 0,
      userName: "",
      tableLoading: false
    };
  },
  methods:{
    test(){
      console.log(this.form.checkList);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
