<template>
  <div
    class="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12"
  >
    <div class="relative py-3 sm:max-w-xl mx-auto text-center">
      <span class="text-2xl font-light">ログイン</span>
      <div class="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
        <div class="h-2 bg-indigo-400 rounded-t-md"></div>
        <div class="py-6 px-6">
          <div class="flex items-center justify-center">
            <a href="/auth/google" @click="loginWithGoogle">
              <button
                class="flex-grow px-11 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-black hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
              >
                <div class="flex items-center">
                  <img
                    class="w-6 h-6 mr-2"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Googleでログイン</span>
                </div>
              </button>
            </a>
          </div>
          <div class="flex items-center justify-center pt-3">
            <router-link
              to="/login-mailAdress"
              class="flex-grow px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-black dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            >
              <div class="flex items-center">
                <img class="w-6 h-6 mr-2" src="../img/Email.svg" loading="lazy" alt="google logo" />
                <span>メールアドレスでログイン</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const loginWithGoogle = async() => {
  try{
    const response = await axios.get("/auth/google/callback");
    if(response.data.success){
      console.log(response.data)
      router.push("/")
    } else {

      alert(response.data.message);
    }
  } catch (error) {
    console.error("ログインに失敗しました。", error);
    //ログイン失敗の処理
    alert("ログインに失敗しました。")
  }
};


</script>

<style></style>
