<script setup>

</script>

<template>
<!--
  Welcome to Tailwind Play, the official Tailwind CSS playground!

  Everything here works just like it does when you're running Tailwind locally
  with a real build pipeline. You can customize your config file, use features
  like `@apply`, or even add third-party plugins.

  Feel free to play with this example if you're just learning, or trash it and
  start from scratch if you know enough to be dangerous. Have fun!
-->
<div class="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
  <div class="relative py-3 sm:max-w-xl mx-auto text-center">
    <span class="text-2xl font-light">会員登録</span>
    <div class="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
      <div class="h-2 bg-indigo-400 rounded-t-md"></div>
      <div class="py-6 px-5">
        <label class="block font-semibold">お名前</label>
        <input type="text" placeholder="Name" class=" border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md">
        <label class="block mt-3 font-semibold">メールアドレス</label>
        <input type="password" placeholder="Email" class=" border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md">
        <label class="block mt-3 font-semibold">パスワード</label>
        <input type="password" placeholder="Password" class=" border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md">
        <label class="block mt-3 font-semibold">パスワード（確認用）</label>
        <input type="password" placeholder="Password" class=" border w-full h-5 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md">
        <div class="flex justify-between items-baseline">
          <button class="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg">登録</button>
          <router-link to="/login_googleAccount">
            <a href="#" class="text-sm hover:underline">ログインはこちら</a>
          </router-link> 
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style>
</style>
