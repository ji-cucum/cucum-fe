<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-4 flex justify-between items-center">
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
          <a @click.prevent="logout" class="text-gray-800 hover:text-blue-600">Log out</a>
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
    router.push('/login')
  } else {
    console.error('logout failure', res)
  }
}
</script>
