// polyfill
import 'babel-polyfill'
// Vue
import Vue from 'vue'
import App from './App'
// store
import store from '@/store/index'
// 多国语
import i18n from './i18n'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// [ 可选插件组件 ]D2-Crud
import D2Crud from '@d2-projects/d2-crud'
// [ 可选插件组件 ] UEditor
import VueUeditorWrap from 'vue-ueditor-wrap'

// 菜单和路由设置
import router from './router'
import menuAside from '@/menu/aside'
import {
  frameInRoutes
} from '@/router/routes'

// 核心插件
Vue.use(d2Admin)
// D2表格插件
Vue.use(D2Crud)
// 富文本编辑器
Vue.component('VueUeditorWrap', VueUeditorWrap)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  async created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    let asidemenu = await menuAside.getList(this,'');
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', asidemenu)
  },
  mounted() {
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')