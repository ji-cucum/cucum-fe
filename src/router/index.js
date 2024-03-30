import{ createRouter, createWebHistory } from "vue-router";

import CucumMain from '../views/CucumMain.vue'
import LoginTop from '../components_session/LoginTop.vue';
import LoginMailAdress from '../components_session/LoginMailAdress.vue';
import RegisterTop from '../components_session/RegisterTop.vue';
import RegisterMailAdress from '../components_session/RegisterMailAdress.vue';
import CucumMusicByPlaylist from '../components/CucumMusicByPlaylist.vue';
import CucumMusicByPlaylistWithoutAddMusic from "@/components/CucumMusicByPlaylistWithoutAddMusic.vue";

const routes = [
  { path: '/', component: CucumMain},
  { path: '/login', component: LoginTop},
  { path: '/login-mailAdress', component: LoginMailAdress},
  { path: '/register', component:RegisterTop},
  { path: '/register-mailAdress', component: RegisterMailAdress},
  { path: '/playlist/:id', component: CucumMusicByPlaylist},
  { path: '/playlist-public/:id', component: CucumMusicByPlaylistWithoutAddMusic},
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;