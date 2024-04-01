import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import QrCodeVue from 'vue-qrcode'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.component('qrcode-vue', QrCodeVue)

app.mount('#app')
