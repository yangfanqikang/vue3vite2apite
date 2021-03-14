import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import { authDirective } from '/@/utils/authDirective.ts'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '/@/theme/index.scss'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import mitt from "mitt"
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
app.use(router).use(store, key).use(duban).use(ElementPlus, { locale: lang }).mount('#app')
app.config.globalProperties.mittBus = mitt()

authDirective(app)
