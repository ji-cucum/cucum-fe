<template>
  <nav class="bg-white shadow">
    <div class="container flex items-center justify-between px-4 mx-auto">
      <router-link to="/" class="text-xl font-bold text-gray-800">Cucum</router-link>
      <ul class="flex space-x-4">
        <li>
          <router-link to="/Login" class="text-gray-800 hover:text-blue-600">Log in</router-link>
        </li>
        <li>
          <router-link to="/register" class="text-gray-800 hover:text-blue-600"
            >Sign up</router-link
          >
        </li>
        <li>
          <button @click.prevent="logout" class="text-gray-800 hover:text-blue-600">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = async () => {
  const res = await fetch('/api/logout', {
    credentials: 'include'
  }).then((r) => r.json())
  if (res.success) {
    sessionStorage.clear()
    router.push('/login')
  } else {
    console.error('logout failure', res)
  }
}
</script>
