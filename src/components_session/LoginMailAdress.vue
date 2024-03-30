<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col justify-center min-h-screen px-4 py-6 antialiased text-gray-800 bg-gray-100 sm:py-12"
  >
    <div class="relative py-3 mx-auto text-center sm:max-w-xl">
      <span class="text-2xl font-light">ログイン</span>
      <div class="relative mt-4 text-left bg-white shadow-md sm:rounded-lg">
        <div class="h-2 bg-indigo-400 rounded-t-md"></div>
        <div class="px-6 py-6">
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
            class="w-full h-5 px-3 py-4 mt-2 border rounded-md hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
          <label class="block mt-3 font-semibold">パスワード</label>
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            class="w-full h-5 px-3 py-4 mt-2 border rounded-md hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
          <div class="flex items-baseline justify-between">
            <button class="px-6 py-2 mt-4 text-white bg-indigo-500 rounded-lg">ログイン</button>
            <a href="#" class="pl-5 text-sm hover:underline">Forgot password?</a>
          </div>
          <div class="flex justify-center">
            <router-link
              to="/register"
              class="px-6 py-2 mt-4 text-indigo-500 bg-white border border-indigo-500 rounded-lg"
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
    
    // console.log(response.data)
    const { userId} = response.data
    if (userId) {
      sessionStorage.setItem('userId', userId)
    }



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
