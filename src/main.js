import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import ru from 'element-plus/dist/locale/ru'

import "ol/ol.css";

const app = createApp(App)

app.use(ElementPlus, {
    locale: ru
})

app.use(store)
app.mount('#app')