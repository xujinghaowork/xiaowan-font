<template>
  <d2-container type="card" v-loading='loading'>
    <template slot="header">公告编写</template>
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
      loading: false,
      id: "",
      fullPath:'',
    };
  },
  methods: {
    onSubmit() {
    
    },
    getDetail() {
      
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fullPath = this.$route.fullPath;
    this.getDetail();
  }
};
</script>
<style>
#anousAddItem .el-form-item__content {
  line-height: 10px;
}
</style>
