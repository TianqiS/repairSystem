// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElSearchTablePagination from 'el-table-pagination'
import App from './App'
import router from './router/index'
import topInfo from './components/topInfo/index'
import 'babel-polyfill'  //兼容低版本浏览器

// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(ElSearchTablePagination)
Vue.use(topInfo)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
