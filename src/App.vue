<template>
  <div id="app"> 
    <NavComponent />
    <router-view></router-view>
  </div>
</template>

<script setup>
import NavComponent from './components_login/NavComponent.vue'
</script>
<style>
html {
    margin: 0px;
    height: 100%;
    width: 100%;
 }

 body {
    margin: 0px;
    min-height: 100%;
    width: 100%;
    background-color: white;
    color: white;
 }
</style>
