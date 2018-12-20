<template>
  <d2-container type="card">
    <template slot="header">公告管理
    </template>
    <el-row>
      <el-col :span="20">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item>
            <el-input v-model="searchForm.keyWord" placeholder="输入标题或者关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="searchForm.date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
          <el-button
            type="primary"
            @click="add"
          >
            添加
          </el-button>
        </el-form>
      </el-col>
    </el-row>
    <div>
      <d2-crud
        :loading='tableLoading'
        @edit="editAnc"
        @del='delAnc'
        :rowHandle="rowHandle"
        :columns="columnsTable"
        :data="dataTable"
        :options="optionsTable"
        index-row
      />
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[50, 100, 200, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalTable"
      >
      </el-pagination>
    </div>
    <!-- 编辑 -->
    <el-dialog
      @close='editClose'
      width="80%"
      style="min-width:1400px;"
      title="编辑公告"
      :visible.sync="editDialog"
    >
      <el-form
        ref="editForm"
        :model="editForm"
        label-width="80px"
      >
        <el-row
          class="parameterformRow"
          :gutter="20"
        >
          <el-col
            class="parameterformRow-name"
            :span="3"
          >公告标题</el-col>
          <el-col :span="16">
            <el-form-item style="margin-left:8px;">
              <el-input
                style="width:600px;"
                v-model="editForm.title"
                maxlength="20"
                placeholder="限制20字"
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
          >公告标题</el-col>
          <el-col :span="20">
            <el-form-item
              style="margin-left:8px;"
              id="anousEditItem"
            >
              <d2-quill
                @text-change="textChangeHandler"
                style="min-height: 400px;"
                v-model="editForm.content"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      columnsTable: [
        {
          title: "标题",
          key: "title",
          resizable: true
        },
        {
          title: "发布人",
          key: "createBy",
          resizable: true
        },
        {
          title: "发布时间",
          key: "time",
          resizable: true
        }
      ],
      dataTable: [
        {
          title:'test',
          createBy:'王兰花秀丽',
          time:'2018-12-20',
          id:'ascd',
        }
      ],
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
      searchForm: {
        date: "",
        keyWord: ""
      },
      pageSize: 100,
      currentPage: 1,
      totalTable: 1,
      valueStatus: "",
      tableLoading: false,
      //编辑
      editForm: {
        //标题
        title: "",
        //内容
        content: "",
        id: ""
      },
      editDialog: false,
      editDialogloading: false,
      delForm: {
        id: ""
      }
    };
  },
  methods: {
    add() {
      this.$router.push({ path: "/manage/announcement/add" });
    },
    xhrRequset() {},
    editAnc({ index, row }) {
      let vm = this;
      let path = "/manage/announcement/message/" + row.id;
      this.$router.push({ path: path });
    },
    editClose() {},
    textChangeHandler(delta, oldDelta, source) {},
    delAnc({ index, row }) {
      let vm = this;
      this.delForm.id = row.id;
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.xhrRequset();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.xhrRequset();
    },

    editSubmit() {}
  },
  mounted() {
    this.xhrRequset();
  }
};
</script>

<style>
#anousAddItem .el-form-item__content {
  line-height: 10px !important;
}

#anousEditItem .el-form-item__content {
  line-height: 10px !important;
}
</style>