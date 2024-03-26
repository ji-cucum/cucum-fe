import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueRouter from 'vue-router'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.use(VueRouter)

app.mount('#app')
