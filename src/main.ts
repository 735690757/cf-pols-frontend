import './style.css'
import 'plyr/dist/plyr.css'
import App from './App.vue'
import {createApp} from 'vue'
import 'github-markdown-css';
import router from './router'
import "./css/tailwindcss.css"
import {createPinia} from 'pinia'
import 'katex/dist/katex.min.css'
import Antd from 'ant-design-vue';
import 'element-plus/dist/index.css'
import 'vue-plyr/dist/vue-plyr.css';
import ElementPlus from 'element-plus'
import 'ant-design-vue/dist/reset.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app
    .use(Antd)
    .use(router)
    .use(ElementPlus)
    .use(createPinia().use(piniaPluginPersistedstate))
    .mount('#app')
// ----------------
