<template>
  <div id="app"> 
    <Nav />
    <router-view></router-view>
  </div>
</template>

<script>
  import Nav from './components_login/Nav.vue'
  import Home from './components_login/Home.vue'

export default {
  name: 'App',
  components: { 
    Nav,
    Home,
  }
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
