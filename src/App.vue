<template>
  <div id="app">
    <nav class="bg-white shadow">
      <div class="container mx-auto px-4">
        <router-link to="/" class="text-xl font-bold text-gray-800">HOME</router-link>
        <div class="flex-grow"></div>
        <ul class="flex space-x-4">
          <router-link to="/login" class="text-gray-800 hover:text-blue-600">Login</router-link>
          <router-link to="/register_googleAccount" class="text-gray-800 hover:text-blue-600">Sign up</router-link>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  }
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
