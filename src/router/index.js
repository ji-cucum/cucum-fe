import{ createRouter, createWebHistory } from "vue-router";

import LoginTop from '../components_login/LoginTop.vue';
import LoginMailAdress from '../components_login/LoginMailAdress.vue';
import RegisterTop from '../components_login/RegisterTop.vue';
import RegisterMailAdress from '../components_login/RegisterMailAdress.vue';

const routes = [
  { path: '/login_googleAccount', component: LoginTop},
  { path: '/login_mailAdress', component: LoginMailAdress},
  { path: '/register_googleAccount', component:RegisterTop},
  { path: '/register_mailAdress', component: RegisterMailAdress},
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;