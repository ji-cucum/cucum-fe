import{ createRouter, createWebHistory } from "vue-router";

import Home from '../components_login/Home.vue';
import LoginM from '../components_login/Login_mailAdress.vue';
import LoginG from '../components_login/Login_googleAccount.vue';
import RegisterM from '../components_login/register_mailAdress.vue';
import RegisterG from '../components_login/register_googleAccount.vue';


const routes = [
  { path: '/', component: Home},
  { path: '/login_googleAccount', component: LoginG},
  { path: '/login_mailAdress', component: LoginM},
  { path: '/register_googleAccount', component:RegisterG},
  { path: '/register_mailAdress', component: RegisterM},
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;