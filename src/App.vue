<template>
    <CucumNavi />
  <main class=" dark flex flex-col items-center h-screen" >
    <div class="w-[375px]">
      <RouterView />
    </div>
  </main>
</template>

<script>
import CucumNavi from './components_session/CucumNavi.vue';
export default {
  name: 'App',
  components: {
    CucumNavi,
  },
  mounted(){
    const isLoggedIn = async()=>{
      console.log('check2')
      const res = await fetch("/public-api/is-logged-in", {
        credentials: "include",
      }).then(r=>r.json())
      console.log("is logged in" , res)
      if(!res.success){
        this.$router.push("/login")
      }
    }
    isLoggedIn()
  }
}


</script>