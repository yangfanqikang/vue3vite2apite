import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
// eslint-disable-next-line import/no-absolute-path
import { authDirective } from '/@/utils/authDirective.ts'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// eslint-disable-next-line import/no-absolute-path
import '/@/theme/index.scss'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import mitt from 'mitt'
// eslint-disable-next-line import/no-absolute-path
import duban from '/@/components/duban/index.ts'
const app = createApp(App)
// 分环境处理
if (process.env.NODE_ENV === 'development') {
  if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in window) {
    // 这里__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue赋值一个createApp实例
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
  }
  app.config.devtools = true
}
console.log(import.meta.env.MODE)
app.use(router).use(store, key).use(duban).use(ElementPlus, { locale: lang }).mount('#app')
app.config.globalProperties.mittBus = mitt()
app.config.globalProperties.utils = {
  x: 1
}

authDirective(app)
