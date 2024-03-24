<template>
  <form
    @submit.prevent="handleSubmit"
    class="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12"
  >
    <div class="relative py-3 sm:max-w-xl mx-auto text-center">
      <span class="text-2xl font-light">会員登録</span>
      <div class="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
        <div class="h-2 bg-indigo-400 rounded-t-md"></div>
        <div class="py-6 px-5">
          <div v-if="errors && errors.length > 0" class="mb-4 text-center">
            <ul class="text-red-500">
              <li v-for="(error, index) in errors" :key="index">{{ error.message }}</li>
            </ul>
          </div>
          <label class="block font-semibold">お名前</label>
          <input
            type="text"
            placeholder="Name"
            v-model="state.name"
            class="border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
          />
          <label class="block mt-3 font-semibold">メールアドレス</label>
          <input
            type="email"
            placeholder="Email"
            v-model="state.email"
            class="border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
          />
          <label class="block mt-3 font-semibold">パスワード</label>
          <input
            type="password"
            placeholder="Password"
            v-model="state.password"
            class="border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
          />
          <label class="block mt-3 font-semibold">パスワード（確認用）</label>
          <input
            type="password"
            placeholder="Password_Confirm"
            v-model="state.password_confirm"
            class="border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
          />
          <div class="flex justify-between items-baseline">
            <button class="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg">登録</button>
            <router-link to="/login">
              <a href="#" class="text-sm hover:underline">ログインはこちら</a>
            </router-link>
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
const state = ref({
  name: '',
  email: '',
  password: '',
  password_confirm: ''
})

const errors = ref([])

async function handleSubmit() {
  const { name, email, password, password_confirm } = state.value

  // 유효성 검사
  errors.value = []

  if (!name || !email || !password || !password_confirm) {
    errors.value.push({ message: '全項目入力必須です' })
  }

  if (password.length < 6) {
    errors.value.push({ message: 'パスワードは６文字以上が必要です' })
  }

  if (password !== password_confirm) {
    errors.value.push({ message: 'パスワードが一致しません' })
  }

  if (errors.value.length === 0) {
    try {
      const response = await axios.post('api/register-mailAdress', {
        name: state.value.name,
        email: state.value.email,
        password: state.value.password,
        password_confirm: state.value.password_confirm
      })
      
      alert('会員登録が完了しました。ログインをお願いします。');

      console.log(response.data)

      router.push('/login-mailAdress')
      
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // 에러가 발생하면 errors 배열에 해당 에러 메시지를 추가
        errors.value.push({ message: error.response.data.errors[0].message });
        state.value = "";
      } else {
        console.error('Registration failed:', error)
      }
    }
  }
}
</script>

<style></style>
