<template>
  <d2-container type="card" v-loading='loading'>
    <template slot="header">公告添加</template>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row class="parameterformRow" :gutter="20">
        <el-col class="parameterformRow-name" :span="3">公告标题</el-col>
        <el-col :span="16">
          <el-form-item style="margin-left:8px;">
            <el-input style="width:600px;" v-model="form.title" maxlength="20" placeholder="限制20字"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="parameterformRow" :gutter="20">
        <el-col class="parameterformRow-name" :span="3">公告标题</el-col>
        <el-col :span="16">
          <el-form-item style="margin-left:8px;" id="anousAddItem">
            <d2-ueditor v-model="form.content" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      </el-row>
      <el-form-item>
        <el-button style="width:100px;" type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      form: {
        //标题
        title: "",
        //内容
        content: ""
      },
      value: "",
      loading: false
    };
  },
  methods: {
    onSubmit() {
      let vm = this;
      this.loading = true;
      this.$xhr
        .announcementAdd({
          title: vm.form.title,
          content: vm.value
        })
        .then(res => {
          // 返回数据
          if (res.code == 200) {
            vm.$message({
              type: "success",
              message: "添加成功",
              onClose() {
                vm.$store.dispatch("d2admin/page/close", {
                  tagName: 'tkgn-announcementManage-add',
                  vm: vm
                });
              }
            });
          }
          vm.loading = false;
        })
        .catch(err => {
          // 异常情况
          vm.loading = false;
        });
    }
  }
};
</script>
<style>
#anousAddItem .el-form-item__content {
  line-height: 10px !important;
}
</style>
