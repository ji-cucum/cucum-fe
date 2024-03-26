<template>
  <form
    @submit.prevent="handleSubmit"
    class="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12"
  >
    <div class="relative py-3 sm:max-w-xl mx-auto text-center">
      <span class="text-2xl font-light">ログイン</span>
      <div class="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
        <div class="h-2 bg-indigo-400 rounded-t-md"></div>
        <div class="py-6 px-6">
          <div v-if="errors && errors.length > 0" class="mb-4 text-center">
            <ul class="text-red-500">
              <li v-for="(error, index) in errors" :key="index">{{ error.message }}</li>
            </ul>
          </div>
          <label class="block font-semibold">メールアドレス</label>
          <input
            type="text"
            placeholder="Email"
            v-model="email"
            class="border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
          />
          <label class="block mt-3 font-semibold">パスワード</label>
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            class="border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
          />
          <div class="flex justify-between items-baseline">
            <button class="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg">ログイン</button>
            <a href="#" class="text-sm hover:underline pl-5">Forgot password?</a>
          </div>
          <div class="flex justify-center">
            <router-link
              to="/register"
              class="mt-4 text-indigo-500 border border-indigo-500 bg-white py-2 px-6 rounded-lg"
              >新規登録はこちら</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const email = ref('')
const password = ref('')

const errors = ref([])

async function handleSubmit() {
  errors.value = [] // 에러 초기화

  try {
    const response = await axios.post('api/login-mailAdress', {
      email: email.value,
      password: password.value,
    }, {
      withCredentials:true,
    })
    
    console.log(response.data)

    router.push('/')

  } catch (error) {
    console.error(error)
    if (error.response && error.response.status === 401) {
      if (error.response.data && error.response.data.message) {
        errors.value.push({ message: error.response.data.message })
        email.value = "";
        password.value = "";

      } else {
        console.error('Login failed:', error)
      }
    }
  }
}
</script>

<style></style>
